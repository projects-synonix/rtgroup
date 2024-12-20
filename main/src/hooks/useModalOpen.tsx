import { createContext, useContext } from "react";

const ModalContext = createContext<boolean | null>(null);

export const useModalOpenContext = () =>{
    const context = useContext(ModalContext);
    if(context === null){
        throw new Error("useModalOpenContext must be used");
    }
    return context;
}