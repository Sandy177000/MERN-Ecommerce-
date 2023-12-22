import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../UserSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
    
    console.log(orders);
  }, [dispatch,orders]);

  return (
    <div>
      {orders.map((order) => (
        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
          <h1 className="text-4xl py-8 my-5 font-bold tracking-tight text-gray-900">
            Order #{order.id}
          </h1>
          <h10 className=" my-5 font-bold tracking-tight text-red-900">
            Order Status: {order.status}
          </h10>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
       
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="password"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty :{item.quantity}
                          </label>
                        </div>

                        <div className="flex"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-2 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{order.totalItems}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          {/* shipping address details */}
          <h10 className="pt-8 my-5 font-bold tracking-tight text-gray-900">
            Shipping Address
          </h10>

          <div className="border-black-900/10 pb-12">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {order.selectedAddress[0].fullname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress[0].street}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Phone: {order.selectedAddress[0].phone}
              </p>
              <p className="text-sm leading-6 text-gray-500">
                {order.selectedAddress[0].postalcode}
              </p>
              <p className="text-sm leading-6 text-gray-900">
                {order.selectedAddress[0].city}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
