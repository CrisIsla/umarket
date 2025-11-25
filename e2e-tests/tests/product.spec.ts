import { test, expect } from "@playwright/test";

test.describe("product", () => {
  test.describe("Flujo de creacion de un producto en la aplicación", () => {
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

  test.describe("Vista del detalle de un producto", () => {
    // usuario
    const Nombre = "User";
    const Correo = "User@ug.uchile.cl";
    const Contraseña = "Contraseña";

    const products = [
      {
        title: "example product",
        price: 999,
        description: "an example product",
        condition: "new",
        category: "electronics",
      },
      {
        title: "another example product",
        price: 999,
        description: "an example product",
        condition: "used",
        category: "electronics",
      },
      {
        title: "one last example product",
        price: 999,
        description: "an example product",
        condition: "new",
        category: "electronics",
      },
    ];

    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3001/api/testing/reset");
      await request.post("http://localhost:3001/api/auth/register", {
        data: {
          username: Nombre,
          contact: { email: Correo },
          password: Contraseña,
        },
      });

      for (const product of products) {
        let req = await request.post(
          "http://localhost:3001/api/testing/new/product",
          {
            data: product,
          },
        );
      }

      await page.goto("http://localhost:5173");
    });

    test("Los productos aparecen en la pagina principal", async ({ page }) => {
      const buttons = page.getByRole("button", {
        name: /Agregar al carrito/i,
      });
      await expect(buttons).toHaveCount(products.length);
    });

    test("Se puede entrar al detalle de cada producto", async ({ page }) => {
      for (const product of products) {
        const title = product["title"];
        const price = product["price"];
        const description = product["description"];
        const condition = product["condition"] === "new" ? "Nuevo" : "Usado";

        await page.getByText(title, { exact: true }).click();

        await expect(page.getByText(title).first()).toBeVisible();
        await expect(page.getByText(price.toString()).first()).toBeVisible();
        await expect(page.getByText(description).first()).toBeVisible();
        await expect(page.getByText(condition).first()).toBeVisible();
        await page.goBack();
        await expect(page.getByText(title, { exact: true })).toBeVisible();
      }
    });

    test("Boton de compra", async ({ page }) => {
      const product = products[0];
      await page.getByText(product["title"], { exact: true }).click();

      await page.getByRole("button", { name: "Comprar" }).click();

      await expect(
        page
          .getByText(`Se realizará un cobro por $${product["price"]}`)
          .first(),
      ).toBeVisible();

      await page
        .getByRole("button", { name: "Continuar" })
        .first()
        .click({ force: true });

      await expect(page.getByText("Procesando el pago...")).toBeVisible();

      await expect(
        page.getByText("Compra finalizada con éxito.").first(),
      ).toBeVisible({
        timeout: 10000,
      });

      await page
        .getByRole("button", { name: "Continuar" })
        .first()
        .click({ force: true });
    });
  });
});
