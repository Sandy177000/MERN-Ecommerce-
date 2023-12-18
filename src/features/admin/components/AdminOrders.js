import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrder,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDownIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../../common/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
    console.log(orders);
  }, [dispatch, page, sort]);

  const handleShow = (order) => {};

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const chooseColor = (st) => {
    switch (st) {
      case "cancelled":
        return "bg-red-200 text-red-600 ";
      case "dispatched":
        return "bg-blue-200 text-blue-600 ";
      case "delivered":
        return "bg-green-200 text-green-600 ";
      default:
        return "bg-yellow-200 text-yellow-600 ";
    }
  };

  //handle pagination of products
  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  return (
    <div>
      {
        <>
          {/* component */}
          <div className="overflow-x-auto">
            Total Orders : {totalOrders}
            <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
              <div className="">
                <div className="bg-white shadow-md rounded my-6">
                  <table className="table">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th
                          className="py-3 px-6 text-left cursor-pointer"
                          onClick={(e) =>
                            handleSort({
                              sort: "id",
                              order: sort._order === "asc" ? "desc" : "asc",
                            })
                          }
                        >
                          Order #<span>
                            {sort._order === "desc" ? (
                              <ArrowDownIcon className="w-4 h-4 " />
                            ) : (
                              <ArrowUpIcon className="w-4 h-4 " />
                            )}
                          </span>
                          
                        </th>
                        <th className="py-3 px-6 text-left  w-1/8 h-10">Items</th>
                        <th
                          className="py-3 px-6 text-center  cursor-pointer"
                          onClick={(e) =>
                            handleSort({
                              sort: "totalAmount",
                              order: sort._order === "asc" ? "desc" : "asc",
                            })
                          }
                        >
                          Total Amount
                          {
                           sort._order==='desc' ? <ArrowDownIcon className="w-4  h-4"/>: <ArrowUpIcon className=" w-4 h-4"/>
                          }
                        </th>
                        <th className="py-3 px-6 text-center">
                          Shipping Address
                        </th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {orders.map((order) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          {/* order no.*/}
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2"></div>
                              <span className="font-medium">{order.id}</span>
                            </div>
                          </td>

                          {/* items */}
                          <td className="py-3 px-6 text-left w-2/6">
                            {order.items.map((item) => (
                              <div className="flex items-center pt-2">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.thumbnail}
                                  ></img>
                                </div>
                                <span>
                                  {item.title}--{item.quantity} x ${item.price}
                                </span>
                              </div>
                            ))}
                          </td>
                          {/* total amount */}
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalAmount}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex flex-col items-left">
                              <text className="font-bold">
                                {order.selectedAddress.fullname}
                              </text>
                              <div>
                                {order.selectedAddress.street},
                                {order.selectedAddress.city},
                              </div>
                              <div>{order.selectedAddress.postalcode}</div>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-center">
                            {order.id !== editableOrderId ? (
                              <span
                                className={`${chooseColor(
                                  order.status
                                )}py-1 px-3 rounded-full text-md`}
                              >
                                {order.status}
                              </span>
                            ) : (
                              <select onChange={(e) => handleUpdate(e, order)}>
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <EyeIcon
                                  className="w-4 h-4"
                                  onClick={(e) => handleShow(order)}
                                />
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <PencilIcon
                                  className="w-4 h-4"
                                  onClick={(e) => handleEdit(order)}
                                />
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalOrders}
            ></Pagination>
          </div>
        </>
      }
    </div>
  );
};

export default AdminOrders;
