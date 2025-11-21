import type { ProductCart } from "@/interfaces/product";
import { create } from "zustand";

interface StateData {
    showModal: boolean,
    products: ProductCart[],
    isPaid: boolean,
}
interface StateActions {
    openModal: () => void;
    closeModal: () => void;
    addToProducts: (newProducts: ProductCart[]) => void;
    toggleIsPaid: () => void;
}

export const useCheckoutStore = create<StateData & StateActions>((set) => {
    return {
        isPaid: false,
        showModal: false,
        products: [],
        openModal: () => {
            set(state => ({ ...state, showModal: true }));
        },
        closeModal: () => {
            set(state => ({ ...state, showModal: false, products: [] }));
        },
        addToProducts: (newProducts: ProductCart[]) => {
            set(state => ({ ...state, products: newProducts }));
        },
        toggleIsPaid: () => {
            set(state => ({ ...state, isPaid: !state.isPaid }));
        }
    }
})