import { useCartStore } from "@/store/cart";

export function useCart() {
    const cart = useCartStore(state => state.cart);
    const showCart = useCartStore(state => state.showCart);
    const changeDisplayCart = useCartStore(state => state.changeDisplayCart);
    const clearCart = useCartStore(state => state.clearCart);
    const addToCart = useCartStore(state => state.addToCart);
    const decrementFromCart = useCartStore(state => state.decrementFromCart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    return {
        cart,
        showCart,
        changeDisplayCart,
        clearCart,
        addToCart,
        decrementFromCart,
        removeFromCart
    }
}