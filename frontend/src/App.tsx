import { AppRoutes } from "./routes/AppRoutes";
import Header from "./components/Header";
import { Cart } from "./components/Cart";

function App() {
  return (
    <>
      <Header />
      <div className="mt-17">
        <Cart />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;