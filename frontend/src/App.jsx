import { CartProvider } from "./context/CartContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import './App.css'

function App() {
  return (

    <CartProvider>
      <AppRoutes />
    </CartProvider>

  );
}

export default App;