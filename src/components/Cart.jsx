import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { decreaseQuantity, increaseQuantity, removeProduct } from "../store";

import { IoMdClose } from "react-icons/io";
import Billing from "./Billing";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.data);

  const notify = () => {
    toast.success("Product Deleted", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDeleteProduct = (id) => {
    dispatch(removeProduct({ id }));
    notify();
  };

  return (
    <div className="my-20 sm:px-2 px-14 flex gap-8 sm:flex-col md:flex-col">
      <div className="flex-1 flex flex-col gap-[20px]">
        {products.length ? (
          products.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow mt-5 flex sm:flex-col sm:gap-4 gap-8"
            >
              <img
                src={item.imgUrl}
                alt={item.desc}
                className="rounded-lg sm:w-full w-52 object-fit"
              />
              <div className="flex-1 flex sm:flex-row sm:justify-between flex-col gap-3 p-3">
                {/* Product Details */}
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.category}
                  </h2>
                  <p className="mt-1 text-sm text-gray-700">
                    Price: ${item.price}
                  </p>
                </div>
                {/* Increase & Decrease Quantity */}
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <button
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-[#5d52cf] hover:text-blue-50 select-none"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      className="h-8 w-8 border bg-white text-xs text-center outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <button
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-[#5d52cf] hover:text-blue-50 select-none"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-md font-medium">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      className="w-[32px] h-[32px] rounded-full hover:bg-[#5d52cf] duration-300 flex items-center justify-center hover:text-white"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Products Found</div>
        )}
      </div>
      <div className="basis-[30%] item-start">
        <Billing />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
