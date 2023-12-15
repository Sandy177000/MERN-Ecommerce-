import Navbar from "../features/navbar/navbar.js";
import ProductDetails from "../features/productList/components/ProductDetails.js";

function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails/>
      </Navbar>
    </div>
  );
}
export default ProductDetailsPage;
