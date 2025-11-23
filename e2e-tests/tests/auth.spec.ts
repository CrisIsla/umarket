import { test, expect } from "@playwright/test";

test.describe("auth", () => {
  test.describe("Flujo de inicio de sesión en la aplicación", () => {
    const Nombre = "User";
    const Correo = "User@ug.uchile.cl";
    const Contraseña = "Contraseña";
    test.beforeEach(async ({ request }) => {
      await request.post("http://localhost:3001/api/testing/reset");
      await request.post("http://localhost:3001/api/auth/register", {
        data: {
          username: Nombre,
          contact: { email: Correo },
          password: Contraseña,
        },
      });
    });
    test("Flujo login", async ({ page }) => {
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
      const headerNav = page.locator("header nav");
      //   se ve el cierre de sesion y el nombre del usuario
      await expect(
        headerNav.getByRole("button", { name: "Cerrar Sesión" }).first(),
      ).toBeVisible();
      await expect(headerNav.getByText(Nombre).first()).toBeVisible();
    });
    test("Flujo incorrecto login", async ({ page }) => {
      //   usuario no registrado
      const Nombre = `user-${Date.now()}`;
      const Correo = `${Nombre}@ug.uchile.cl`;
      const Contraseña = "Contraseña";

      await page.goto("http://localhost:5173/login");
      await page.getByPlaceholder("Correo").fill(Correo);
      await page
        .getByPlaceholder("Contraseña", { exact: true })
        .fill(Contraseña);
      await page.getByRole("button", { name: "Iniciar sesión" }).click();

      const headerNav = page.locator("header nav");
      await expect(
        headerNav.getByRole("button", { name: "Cerrar Sesión" }).first(),
      ).toHaveCount(0);
      await expect(headerNav.getByText(Nombre)).toHaveCount(0);
    });
    test("Flujo registro", async ({ page }) => {
      const Nombre = `user-${Date.now()}`;
      const Correo = `${Nombre}@ug.uchile.cl`;
      const Contraseña = "Contraseña";

      await page.goto("http://localhost:5173/register");
      await page.getByPlaceholder("Correo").fill(Correo);
      await page.getByPlaceholder("Nombre").fill(Nombre);
      await page.getByPlaceholder("Contraseña", { exact: true }).fill(Contraseña);
      await page.getByPlaceholder("Repetir contraseña").fill(Contraseña);
      await page.getByRole("button", { name: "Crear cuenta" }).click();

      await page.waitForURL("**/login");

      // Login con los datos recien creados
      await page.getByPlaceholder("Correo").fill(Correo);
      await page.getByPlaceholder("Contraseña", { exact: true }).fill(Contraseña);
      await page.getByRole("button", { name: "Iniciar sesión" }).click();

      await page.waitForURL("**/");
      // Usuario aparece como logeado
      const headerNav = page.locator("header nav");
      await expect(
        headerNav.getByRole("button", { name: "Cerrar Sesión" }).first(),
      ).toBeVisible();
      await expect(headerNav.getByText(Nombre).first()).toBeVisible();
    });
    test("Flujo logout", async ({ page }) => {
      const Nombre = "User";
      const Correo = "User@ug.uchile.cl";
      const Contraseña = "Contraseña";

      await page.goto("http://localhost:5173/login");
      await page.getByPlaceholder("Correo").fill(Correo);
      await page.getByPlaceholder("Contraseña", { exact: true }).fill(Contraseña);
      await page.getByRole("button", { name: "Iniciar sesión" }).click();

      await page.waitForURL("**/");
      // Usuario debe estar logeado
      const headerNav = page.locator("header nav");
      await expect(
        headerNav.getByRole("button", { name: "Cerrar Sesión" }).first(),
      ).toBeVisible();
      await expect(headerNav.getByText(Nombre).first()).toBeVisible();
      // Hacer logout
      await headerNav.getByRole("button", { name: "Cerrar Sesión" }).click();
      await page.waitForURL("**/login");
      // Usuario debe estar deslogeado
      await expect(
        headerNav.getByRole("button", { name: "Cerrar Sesión" }).first(),
      ).toHaveCount(0);
      await expect(headerNav.getByText(Nombre)).toHaveCount(0);
      // Verificar que aparece "Iniciar sesión"
      await expect(
        headerNav.getByRole("button", { name: "Iniciar sesión" }).first(),
      ).toBeVisible();
    });
  });
});
