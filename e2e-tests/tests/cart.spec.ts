import { test, expect, Page, Request, APIRequestContext } from "@playwright/test";

interface Props {
    page: Page,
    request: APIRequestContext
}
async function setInitialProduct({ page, request }: Props) {
    // usuario
    const Nombre = "User";
    const Correo = "User@ug.uchile.cl";
    const Contraseña = "Contraseña";

    //producto
    const Producto = `Nuevo producto`;
    const Precio = "999";
    const Descripcion = "Mi producto";
    await request.post("http://localhost:3001/api/auth/register", {
        data: {
            username: Nombre,
            contact: { email: Correo },
            password: Contraseña,
        },
    });
    await page.goto("http://localhost:5173/login");

    await page.getByPlaceholder("Correo").fill(Correo);
    await page
        .getByPlaceholder("Contraseña", { exact: true })
        .fill(Contraseña);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.waitForURL("**/");
    await page.goto("http://localhost:5173/new/product");
    await expect(page).toHaveURL("http://localhost:5173/new/product");
    await page.getByLabel("Título").fill(Producto);
    await page.getByPlaceholder("Describe tu producto...").fill(Descripcion);
    await page.getByLabel("Precio").fill(Precio);
    await page.getByLabel("Categoría").selectOption("Electrónica");
    await page.getByLabel("Estado").selectOption("Nuevo");

    await page.getByRole("button", { name: "Publicar" }).click();
    await page.goto("http://localhost:5173/");
}
test.describe("cart", () => {
    test.describe("Flujo de manipulación del carro de compras", () => {
        test.beforeEach(async ({ page, request }) => {
            await request.post("http://localhost:3001/api/testing/reset");
            await setInitialProduct({ page, request });
            await page.goto('http://localhost:5173/');
        });

        test("Botón para mostrar el carrito es visible", async ({ page }) => {
            await expect(page.getByRole('button', { name: 'Carrito' }).nth(1)).toBeVisible();
        });

        test("Inicialmente carrito vacío", async ({ page }) => {
            await page.getByRole('button', { name: /Carrito/ }).nth(1).click();
            await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
        });

        test("Agrega producto a carrito", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().click();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByRole('listitem').getByText('Nuevo producto')).toBeVisible();
            await expect(page.getByText('Nuevo productoNuevo$999-1+')).toBeVisible();

            await expect(page.getByText(`Total: $999`)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Limpiar Carrito' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Finalizar Compra' })).toBeVisible();
            await page.goto('http://localhost:5173/');
        });

        test("Doble click en agregar producto al carrito", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByRole('listitem').getByText('Nuevo producto')).toBeVisible();
            await expect(page.getByText('Nuevo productoNuevo$999-2+')).toBeVisible();
        });

        test("Aumenta cantidad de productos en el carrito", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().click();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Nuevo productoNuevo$999-1+')).toBeVisible();
            await page.getByRole('button', { name: '+' }).click();
            await expect(page.getByText('Nuevo productoNuevo$999-2+')).toBeVisible();
        });

        test("Disminuye cantidad de productos en el carrito", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Nuevo productoNuevo$999-2+')).toBeVisible();
            await page.getByRole('button', { name: '-' }).click();
            await expect(page.getByText('Nuevo productoNuevo$999-1+')).toBeVisible();
        });

        test("Si hay solo un producto en el carro y se disminuye la cantidad, se borra", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().click();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Nuevo productoNuevo$999-1+')).toBeVisible();
            await page.getByRole('button', { name: '-' }).click();
            await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
        });

        test("Limpiando carrito", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Nuevo productoNuevo$999-2+')).toBeVisible();
            await page.getByRole('button', { name: 'Limpiar Carrito' }).click();
            await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
        });

        test("Finalizando compra", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText(`Total: $1.998`)).toBeVisible();
            await page.getByRole('button', { name: 'Finalizar Compra' }).click();
            await expect(page.getByText('Se realizará un cobro por $1.998')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Continuar' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
        });

        test("Se cancela la finalización de compra y el carrito mantiene sus productos", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText(`Total: $1.998`)).toBeVisible();
            await page.getByRole('button', { name: 'Finalizar Compra' }).click();
            await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
            await expect(page.getByText('Se realizará un cobro por $1998')).not.toBeVisible();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Nuevo productoNuevo$999-2+')).toBeVisible();
            await expect(page.getByText(`Total: $1.998`)).toBeVisible();
        });

        test("Se continúa finalización de compra y el carrito se vacía", async ({ page }) => {
            await page.getByRole('button', { name: 'Agregar al carrito' }).first().dblclick();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText(`Total: $1.998`)).toBeVisible();
            await page.getByRole('button', { name: 'Finalizar Compra' }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
            await expect(page.getByText('Procesando el pago...')).toBeVisible();
            await expect(page.getByText('Compra finalizada con éxito.')).toBeVisible({ timeout: 6000 });
            await page.getByRole('button', { name: 'Continuar' }).click();
            await page.getByRole('button', { name: 'Carrito' }).nth(1).click();
            await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
        });
    });
});
