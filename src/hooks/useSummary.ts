import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {


const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce(
        (acc, transaction) => {
            if(transaction.Tipo == 'income') {
                acc.income += transaction.Preco;
                acc.total += transaction.Preco
            }
            else {
                acc.outcome += transaction.Preco;
                acc.total -= transaction.Preco;
            }

            return acc;
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )

    return summary;
}