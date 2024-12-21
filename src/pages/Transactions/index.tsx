import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, princeFormatter } from "../../utils/formatter";
import { Trash } from "phosphor-react";


export function Transactions() {
    const { transactions, deleteTransaction } = useContext(TransactionsContext)

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.Id}>
                                    <td width="50%">{transaction.Descricao}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.Tipo}>
                                            {transaction.Tipo == 'outcome' && '- '}
                                            {princeFormatter.format(transaction.Preco)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.Categoria}</td>
                                    <td>{dateFormatter.format(new Date(transaction.Data))}</td>
                                    <td>
                                        <strong>
                                            <Trash size={20} onClick={() => deleteTransaction(transaction.Id)} />
                                        </strong>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}