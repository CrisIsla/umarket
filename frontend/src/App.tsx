import Header from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header onSearch={() => {}} />
      <div className="mt-17">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
