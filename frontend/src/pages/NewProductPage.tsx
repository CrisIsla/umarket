import { ProductForm } from "@/components/ProductForm";

export const NewProductPage = () => {
  return (
      <div>
        {/* este debería ser el componente del navbar, placeholder de momento */}
        <nav className="bg-[#031e3c] shadow-md p-4 flex justify-center">
            <h1 className="text-2xl font-bold text-white mb-2 justify-between flex p-2">UMarket</h1>
        </nav>
        <div className="flex flex-col items-center justify-center min-h-screen px-7 py-0.5 bg-gray-400/50">
            <ProductForm />
        </div>
    </div>
  )
}
