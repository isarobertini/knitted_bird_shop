import { CartProvider } from "./context/CartContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import './App.css'

function App() {
  return (

    <CartProvider>
      <div className="h-screen">
        <AppRoutes />
      </div>
    </CartProvider>

  );
}

export default App;