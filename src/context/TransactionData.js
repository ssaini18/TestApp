import { createContext, useState } from "react";

export const TransactionContext = createContext({});

export const TransactionsProvider = ({children}) => {
    const [transactions, setTransactions] = useState([]);

    return <TransactionContext.Provider value={{transactions, setTransactions}}>
        {children}
    </TransactionContext.Provider>
}