import Navbar from "../features/navbar/navbar.js";
import ProductList from "../features/productList/components/ProductList.js";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
}
export default Home;
