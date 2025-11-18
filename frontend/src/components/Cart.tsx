import { useCart } from "@/hooks/useCart";
import { Button } from "./Button";
import { ShoppingCart } from "lucide-react";
import type { ProductCart } from "@/interfaces/product";
import { useCheckout } from "@/hooks/useCheckout";
import Checkout from "./Checkout";
import { useEffect } from "react";

type ProductItemCart = ProductCart & { addToCart: () => void, decrementFromCart: () => void }
function CartItem({ photos, price, title, quantity, condition, addToCart, decrementFromCart }: ProductItemCart) {
	return (
		<li className="flex w-full gap-1 pb-2">
			<img
				src={photos[0]}
				alt={title}
				className="w-1/4 h-25 object-contain"
			/>
			<div className="flex flex-col w-3/4">
				<p className="text-sm">
					<strong>{title}</strong>
				</p>
				<div className="text-sm bg-gray-200 w-fit px-2 rounded-xl">{condition === 'new' ? 'Nuevo' : 'Usado'}</div>
				<footer className="flex justify-between w-full">
					<p className="text-xl">${new Intl.NumberFormat('es-CL').format(price)}</p>
					<div className="flex gap-1 items-center">
						<Button onClick={decrementFromCart} className="px-2 py-0 items-center">-</Button>
						<small className="bg-gray-200 px-2 py-1 rounded">
							{quantity}
						</small>
						<Button onClick={addToCart} className="px-1.5 items-center">+</Button>
					</div>
				</footer>

			</div>
		</li>
	)
}

export function Cart() {
	const { cart, clearCart, addToCart, showCart, decrementFromCart, changeDisplayCart } = useCart()
	const total = cart.map((item) => (item.price * item.quantity)).reduce((acc, val) => acc + val, 0);
	const { addToProducts, openModal, isPaid } = useCheckout();
	const proceedToCheckout = () => {
		if (cart.length > 0) {
			addToProducts([...cart]);
			changeDisplayCart();
			openModal();
		}
	}
	useEffect(() => {
		if (!isPaid) return
		clearCart();
	}, [isPaid]);
	return (
		<>
			{showCart && <aside className="p-8 pr-1 fixed right-0 top-0 bg-gray-50/90 w-1/4 z-998 flex-col h-full border-l">
				{
					cart.length === 0
						? (<div className="w-full flex flex-col items-center gap-2 mt-9">
							<p className="text-2xl">Tu carrito está vacío</p>
							<ShoppingCart className="h-10 w-10" />
						</div>)
						:
						(<div className="mt-9 flex flex-col flex-wrap pt-2 h-full w-full">
							<ul className="flex flex-col gap-4 border-b pb-4 divide-y divide-gray-300 flex-1 overflow-y-auto max-h-17/20">
								{cart.map(product => (
									<CartItem
										key={product.id}
										addToCart={() => addToCart(product)}
										decrementFromCart={() => decrementFromCart(product)}
										{...product}
									/>
								))}
							</ul>
							<div className="w-full">
								<div className="w-full flex justify-between text-2xl">
									<p>Total: </p>
									<p>${new Intl.NumberFormat('es-CL').format(total)}</p>
								</div>
							</div>
							<footer className="w-full flex justify-center gap-2 mt-2">
								<Button onClick={clearCart} className="p-2">
									Limpiar Carrito
								</Button>
								<Button className="p-2" onClick={proceedToCheckout}>
									Finalizar Compra
								</Button>
							</footer>
						</div>)
				}
			</aside>}
			<Checkout />
		</>
	);
};