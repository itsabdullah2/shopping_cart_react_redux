import React from "react";
import { useSelector } from "react-redux";

const Billing = () => {
  const carts = useSelector((state) => state.cart.data);
  const subtotal = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalBillings = (subtotal) => {
    if (subtotal > 0) {
      return (subtotal + 4.99).toFixed(2);
    }
  };

  return (
    <div className="shadow-md rounded-lg border p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${subtotal}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">{subtotal > 0 ? "4.99" : 0}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div>
          <p className="mb-1 text-lg font-bold">
            ${subtotal > 0 ? totalBillings(subtotal) : 0} USD
          </p>
          <p className="text-sm text-gray-700">Including VAT</p>
        </div>
      </div>
      <button className="mt-4 w-full rounded-md bg-[#7063f3] py-2.5 font-medium text-blue-50 hover:bg-[#5d52cf] duration-300">
        Check out
      </button>
    </div>
  );
};

export default Billing;
