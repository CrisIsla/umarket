import { AppRoutes } from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="mt-17">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;