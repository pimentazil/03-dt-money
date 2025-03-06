import { useContext, useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

interface Summary {
    income: number;
    outcome: number;
    total: number;
}

export function useSummary(selectedMonth?: string): Summary {
    const { transactions } = useContext(TransactionsContext);

    const filteredTransactions = useMemo(() => {
        if (!selectedMonth) return transactions; 

        const [year, month] = selectedMonth.split("-").map(Number);

        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.Data); 
            return (
                transactionDate.getFullYear() === year &&
                transactionDate.getMonth() + 1 === month
            );
        });
    }, [transactions, selectedMonth]);

    const summary = useMemo(() => {
        return filteredTransactions.reduce(
            (acc, transaction) => {
                if (transaction.Tipo === "income") {
                    acc.income += transaction.Preco;
                    acc.total += transaction.Preco;
                } else {
                    acc.outcome += transaction.Preco;
                    acc.total -= transaction.Preco;
                }
                return acc;
            },
            { income: 0, outcome: 0, total: 0 }
        );
    }, [filteredTransactions]);

    return summary;
}
