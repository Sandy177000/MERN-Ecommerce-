import React, { useEffect } from "react";
import { Link, Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    //reset cart
    dispatch(resetCartAsync(user.id));
    //reset order
    dispatch(resetOrder());

  },[dispatch,user])

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div class="h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">Order Successfully placed!</h1>
        <p class="text-2xl text-gray-600 mb-8">
            Order Number #{params.id}
        </p>
        <p class="text-2xl text-gray-600 mb-8">
            Check your orders My account {'>'} My orders
        </p>
        <Link to="/" className="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Continue Shopping
        </Link>
        </div>
      </div>
    </>
  );
  
};

export default OrderSuccessPage;
