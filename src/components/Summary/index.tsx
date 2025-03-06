import { ArrowCircleDown, ArrowCircleUp, Wallet } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { princeFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

interface SummaryProps {
    selectedMonth: string; 
}

export function Summary({ selectedMonth }: SummaryProps) {
    const summary = useSummary(selectedMonth);

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>
                <strong>{princeFormatter.format(summary.income)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>
                <strong>{princeFormatter.format(summary.outcome)}</strong>
            </SummaryCard>

            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <Wallet size={32} color="#fff" />
                </header>
                <strong>{princeFormatter.format(summary.total)}</strong>
            </SummaryCard>
        </SummaryContainer>
    );
}
