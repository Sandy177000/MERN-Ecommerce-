import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import {
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrder,
} from "../features/order/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user.id));
    //console.log(items)
  }, [dispatch,user,items]);

  // let totalAmount = 0;
  // let totalItems = 0;

  // if (items[items.length - 1]) {
  // }

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);


  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    console.log(id);
    dispatch(deleteItemFromCartAsync(id));
  };

  //handle form data
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddress = (e) => {
    console.log(user.addresses[e.target.value]);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user:user.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // only admin can change the status
      };
      //console.log(order)
      dispatch(createOrderAsync(order));
    } else {
      alert("enter address and payment method");
    }
  };

  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="px-5 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
              })}
            >
              <div className="space-y-12 bg-white p-4">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          {...register("fullname", {
                            required: "name is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          {...register("email", {
                            required: "email is required",

                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "Invalid email",
                            },
                          })}
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("country")}
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street"
                          id="street"
                          {...register("street", {
                            required: "street-address is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          {...register("city", {
                            required: "city is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          {...register("region", {
                            required: "region is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postalcode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="postalcode"
                          id="postalcode"
                          {...register("postalcode", {
                            required: "postalcode is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                   
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing address
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            name="address"
                            type="radio"
                            value={index}
                            onChange={handleAddress}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.fullname}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.postalcode}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose one
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            value="cash"
                            onChange={handlePayment}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            value="card"
                            onChange={handlePayment}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
              <h1 className="text-4xl p-5 my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
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
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={(e) => handleRemove(e, item.id)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalItems}</p>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes included
                </p>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <button
                    type="submit"
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Check out
                  </button>
                </div>

                <div className=" flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or <br></br>
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
