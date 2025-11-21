import { useCheckoutStore } from "@/store/checkout";
import { useState } from "react";

export function useCheckout() {
    const { showModal, products, closeModal, addToProducts, openModal, isPaid, toggleIsPaid } = useCheckoutStore();
    const [isPaying, setIsPaying] = useState<boolean>(false);
    const handleCheckout = async () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            toggleIsPaid();
        }, 4000);
    }
    const handleSucceed = () => {
        toggleIsPaid();
        closeModal();
    }
    const total = products.map((item) => (item.price * item.quantity)).reduce((acc, val) => acc + val, 0);
    return {
        showModal,
        products,
        isPaying,
        isPaid,
        total,
        closeModal,
        handleCheckout,
        handleSucceed,
        openModal,
        addToProducts,
        toggleIsPaid,
    }
}