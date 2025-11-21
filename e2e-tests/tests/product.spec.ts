import { test, expect } from "@playwright/test";

test.describe("product", () => {
  test.describe("Flujo de creacion de un product en la aplicación", () => {
    // usuario
    const Nombre = "User";
    const Correo = "User@ug.uchile.cl";
    const Contraseña = "Contraseña";

    //producto
    const Producto = `Nuevo producto`;
    const Precio = "999";
    const Descripcion = "Mi producto";

    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3001/api/testing/reset");
      await request.post("http://localhost:3001/api/auth/register", {
        data: {
          username: Nombre,
          contact: { email: Correo },
          password: Contraseña,
        },
      });
      await page.goto("http://localhost:5173");
    });
    test("Sesión no iniciada redirecciona a inicio de sesión", async ({
      page,
    }) => {
      await page.goto("http://localhost:5173/new/product");
      await expect(page).toHaveURL("http://localhost:5173/login");
    });

    test("Creación de producto con sesión iniciada", async ({ page }) => {
      await page.goto("http://localhost:5173/login");

      await page.getByPlaceholder("Correo").fill(Correo);
      await page
        .getByPlaceholder("Contraseña", { exact: true })
        .fill(Contraseña);
      await page.getByRole("button", { name: "Iniciar sesión" }).click();

      await page.waitForURL("**/");
      // usuario registrado puede ir a new product
      await page.goto("http://localhost:5173/new/product");
      await expect(page).toHaveURL("http://localhost:5173/new/product");
      await page.getByLabel("Título").fill(Producto);
      await page.getByPlaceholder("Describe tu producto...").fill(Descripcion);
      await page.getByLabel("Precio").fill(Precio);
      await page.getByLabel("Categoría").selectOption("Electrónica");
      await page.getByLabel("Estado").selectOption("Nuevo");

      await page.getByRole("button", { name: "Publicar" }).click();

      await page.waitForURL("**/");
      await expect(page.getByText(Producto)).toBeVisible();
    });

    test("No se agrega un campo obligatorio", async ({ page }) => {
      await page.goto("http://localhost:5173/login");

      await page.getByPlaceholder("Correo").fill(Correo);
      await page
        .getByPlaceholder("Contraseña", { exact: true })
        .fill(Contraseña);
      await page.getByRole("button", { name: "Iniciar sesión" }).click();

      await page.waitForURL("**/");
      // usuario registrado puede ir a new product
      await page.goto("http://localhost:5173/new/product");
      await expect(page).toHaveURL("http://localhost:5173/new/product");
      await page.getByLabel("Título").fill(Producto);
      await page.getByLabel("Precio").fill(Precio);
      await page.getByLabel("Categoría").selectOption("Electrónica");
      await page.getByLabel("Estado").selectOption("Nuevo");

      await page.getByRole("button", { name: "Publicar" }).click();

      const descriptionInput = page.getByPlaceholder("Describe tu producto...");
      const isInvalid = await descriptionInput.evaluate((input) => {
        return (input as HTMLInputElement).validity.valueMissing;
      });
      expect(isInvalid).toBe(true);
    });
  });
});
