import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

// import logoImg from '../../assets/Logo.svg'
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

import logoTest from '../../assets/satoru.gif';

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoTest} width="20%"/>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal/>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}