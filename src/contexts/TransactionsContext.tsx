import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    Id: number;
    Descricao: string;
    Tipo: 'income' | 'outcome';
    Preco: number;
    Categoria: string;
    Data: string;
}

interface CreateTransactionInput {
    Descricao: string;
    Preco: number;
    Categoria: string;
    Tipo: 'income' | 'outcome';
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
    deleteTransaction: (Id: number) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {  
        const response = await api.get('Transacao', {  
            params: {  
                _sort: 'createdAt',  
                _order: 'desc',  
                De: query,  
            }  
        });  
    
        const transactions = response.data.transactions.map((transaction: any) => ({  
            Id: transaction.id,  
            Descricao: transaction.descricao,  
            Tipo: transaction.tipo == 'outcome' || 'income', 
            Preco: transaction.preco,  
            Categoria: transaction.categoria,  
            Data: transaction.data,  
        }));  
    
        setTransactions(transactions); 
    }

    async function createTransaction(data: CreateTransactionInput) {
        const { Descricao, Preco, Categoria, Tipo } = data;
    
        const response = await api.post('Transacao', {
            Descricao,
            Preco,
            Categoria,
            Tipo,
            Data: new Date().toISOString(), 
        });
    
        const formattedTransaction: Transaction = {
            Id: response.data.id,
            Descricao: response.data.Descricao,
            Preco: response.data.Preco,
            Tipo: response.data.Tipo,
            Categoria: response.data.Categoria,
            Data: new Date(response.data.Data).toISOString(), 
        };
    
        setTransactions((state) => [formattedTransaction, ...state]);
    }    

    useEffect(() => {
        fetchTransactions();
    }, [])

    async function deleteTransaction(Id: number) {
        await api.delete(`Transacao/${Id}`);
    
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.Id !== Id)
        );
    }
    
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction,
            deleteTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}