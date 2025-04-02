import { createContext, useContext, useReducer } from "react";

const CartDataContext = createContext();
const CartActionContext = createContext();

export const useCartDataContext = () => {
    return useContext(CartDataContext);
}

export const useCartActionContext = () => {
    return useContext(CartActionContext);
}

export const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, intiState);

    const addItem = (item) => {
        let updatedItems = [...state.items, item];
        dispatch({type: ACTIONS.ADD_ITEM, payload: updatedItems});
        updateTotal(updatedItems);
    }

    const deleteItem = (id) => {
        let updatedItems = state.items.filter(item => item.id != id);

        dispatch({type: ACTIONS.DELETE, payload: updatedItems});
        updateTotal(updatedItems);
    }

    const updateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        dispatch({type: ACTIONS.UPDATE_TOTAL, payload: total})
    }

    return <CartDataContext.Provider value={{items: state.items, total: state.total}}>
        <CartActionContext.Provider value={{addItem, deleteItem}}>
            {children}
        </CartActionContext.Provider>
    </CartDataContext.Provider>
}

const intiState = {
    total: 0,
    items: []
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ITEM:
            return {
                ...state,
                items: action.payload
            }
        case ACTIONS.DELETE:
            return {
                ...state,
                items: action.payload,
            }
        case ACTIONS.UPDATE_TOTAL:
            return {
                ...state,
                total: action.payload
            }
        default:
            return state;
    }
}

const ACTIONS = {
    ADD_ITEM: 'add',
    DELETE: 'delete',
    UPDATE_TOTAL: 'update-total',
}