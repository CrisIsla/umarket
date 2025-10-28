import type { Product } from "@/interfaces/product"
import { create } from "zustand"
import { persist } from "zustand/middleware";

export interface ProductCart extends Product {
    quantity: number;
}

interface State {
    cart: ProductCart[],
    showCart: boolean,
    changeDisplayCart: () => void;
    addToCart: (product: Product) => void;
    decrementFromCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
}
export const useCartStore = create<State>()(persist((set, get) => {
    return {
        cart: [],
        showCart: false,
        changeDisplayCart: () => {
            set(state => ({ showCart: !state.showCart }));
        },
        addToCart: (product: Product) => {
            const { cart } = get();
            const productInCartIndex = cart.findIndex(item => item.id === product.id);
            if (productInCartIndex >= 0) {
                const newCart = [
                    ...cart.slice(0, productInCartIndex),
                    { ...cart[productInCartIndex], quantity: cart[productInCartIndex].quantity + 1 },
                    ...cart.slice(productInCartIndex + 1)
                ]
                set({ cart: newCart });
            } else {
                set({ cart: [...cart, { ...product, quantity: 1 }] })
            }

        },
        decrementFromCart: (product: Product) => {
            const { cart, removeFromCart } = get();
            const productInCartIndex = cart.findIndex(item => item.id === product.id);
            if (productInCartIndex >= 0) {
                if (cart[productInCartIndex].quantity > 1) {
                    const newCart = [
                        ...cart.slice(0, productInCartIndex),
                        { ...cart[productInCartIndex], quantity: cart[productInCartIndex].quantity - 1 },
                        ...cart.slice(productInCartIndex + 1)
                    ]
                    set({ cart: newCart });
                } else {
                    removeFromCart(product)
                }
            }
        },
        removeFromCart: (product: Product) => {
            set(state => ({ ...state, cart: state.cart.filter(item => item.id !== product.id) }))
        },
        clearCart: () => {
            set({ cart: [] })
        },
    }
}, {
    name: 'cart'
}))