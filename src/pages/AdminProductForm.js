import ProductForm from "../features/admin/components/ProductForm.js";
import Navbar from "../features/navbar/navbar.js";

function AdminProductFormPage() {
  return (
    <div>
      <Navbar>
        <ProductForm/>
      </Navbar>
    </div>
  );
}
export default AdminProductFormPage;
