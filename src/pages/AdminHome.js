import AdminProductList from "../features/admin/components/AdminProductList.js";
import Navbar from "../features/navbar/navbar.js";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList/>
      </Navbar>
    </div>
  );
}
export default AdminHome;
