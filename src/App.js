import "./App.css";
import Cart from "./features/cart/Cart";
import { useEffect } from "react";
import ProductDetails from "./features/productList/components/ProductDetails";
import ProductList from "./features/productList/components/ProductList";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import  PageNotFound from "./pages/404"
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./pages/UsersProfilePage";
import Logout from "./features/auth/components/Logout";
import ForwardPasswordPage from "./pages/ForwardPasswordPage";
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetails from './features/admin/components/AdminProductDetails';
import AdminProductDetailsPage from "./pages/AdminProductDetailPage";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from './pages/AdminProductForm';
import AdminOrdersPage from "./pages/AdminOrdersPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>

  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>

  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },

  {
    path: "cart",
    element: <Protected><Cart/></Protected>
  },

  {
    path: "checkout",
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path: "product-details/:id",
    element: <Protected><ProductDetails></ProductDetails></Protected>
  },
  
  {
    path: "/admin/product-details/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path:"order-success/:id",
    element:<OrderSuccessPage/>
  }
  ,
  
  {
    path:"orders",
    element:<UserOrderPage/>
  }
  ,
  {
    path:"/admin/orders",
    element:<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>
  }
  ,
  {
    path:"profile",
    element:<UserProfilePage/>
  }
  ,
  
  {
    path:"forgot-password",
    element:<ForwardPasswordPage/>
  }
  ,
  {
    path:"logout",
    element:<Logout/>
  }

  ,
  {
    path:"*",
    element:<PageNotFound/>
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user)
      dispatch(fetchItemsByUserIdAsync(user.id));
    
  },[dispatch])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
