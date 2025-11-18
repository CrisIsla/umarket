import { useCheckout } from "@/hooks/useCheckout";
import { Button } from "./Button";
import { CheckIcon, InfoIcon, Loading } from "./Icons";


export default function Checkout() {
    const {
        showModal,
        products,
        isPaying,
        isPaid,
        total,
        handleSucceed,
        handleCheckout,
        closeModal
    } = useCheckout();

    if (!showModal || products.length === 0) return
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="w-1/4 fixed border p-6 rounded flex flex-col gap-8 justify-self-center dark:bg-[#242424] bg-white items-center justify-center">
                {
                    isPaying
                        ? <Loading msg={'Procesando el pago...'} />
                        : (
                            isPaid
                                ? <>
                                    <CheckIcon />
                                    <p className="text-xl">Compra finalizada con éxito.</p>
                                    <Button className="p-2" onClick={handleSucceed}>Continuar</Button>
                                </>
                                : <>
                                    <InfoIcon />
                                    <p className="text-xl">Se realizará un cobro por ${new Intl.NumberFormat('es-CL').format(total)}</p>
                                    <section className="flex gap-4">
                                        <Button className="p-2" onClick={async () => await handleCheckout()}>Continuar</Button>
                                        <Button className="p-2" onClick={closeModal}>Cancelar</Button>
                                    </section>
                                </>
                        )
                }
            </div>
        </div>
    );
};