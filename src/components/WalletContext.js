import React, { createContext, useReducer } from 'react';

const WalletContext = createContext();

const initialState = {
    walletBalance: 0
};

const walletReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WALLET':
            return { ...state, walletBalance: state.walletBalance + action.amount };
        case 'DEDUCT_FROM_WALLET':
            return { ...state, walletBalance: state.walletBalance - action.amount };
        case 'UPDATE_BALANCE':
            return {
                ...state,
                walletBalance: action.payload,
            };  

        default:
            return state;
    }
};

const WalletProvider = ({ children }) => {
    const [state, dispatch] = useReducer(walletReducer, initialState);

    return (
        <WalletContext.Provider value={{ state, dispatch }}>
            {children}
        </WalletContext.Provider>
    );
};

export { WalletContext, WalletProvider };
