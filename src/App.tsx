import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
      </Route>
    </Routes>
  );
};

export default App;
