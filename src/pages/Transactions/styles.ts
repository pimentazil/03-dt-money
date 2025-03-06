import styled from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background-color: ${(props) => props.theme["gray-700"]};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }

    strong {
        color: ${(props) => props.theme["red-300"]};
        cursor: pointer;
    }
`;

interface PriceHighlightProps {
    variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${(props) =>
        props.variant === "income"
            ? props.theme["green-300"]
            : props.theme["red-300"]};
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;

    input[type="month"] {
        height: 3rem;
        padding: 0 1rem;
        background-color: ${(props) => props.theme["gray-700"]};
        color: ${(props) => props.theme["gray-300"]};
        border: 1px solid ${(props) => props.theme["gray-600"]};
        border-radius: 6px;
        font-size: 1rem;

        &:focus {
            outline: none;
            border-color: ${(props) => props.theme["green-300"]};
        }
    }

    form {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
            height: 3rem;
            padding: 0 1.5rem;
            background-color: ${(props) => props.theme["green-500"]};
            color: ${(props) => props.theme.white};
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color: ${(props) => props.theme["green-300"]};
            }
        }
    }
`;