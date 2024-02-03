import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { products } from "../data/dummy";
import { addProductToCard } from "../store";

const Home = () => {
  const dispatch = useDispatch();

  const notify = () => {
    toast.success("Product Added", {
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
  const handleAddProduct = (product) => {
    dispatch(addProductToCard(product));
    notify();
  };

  const renderedProducts = products.map((product) => (
    <div
      key={product.id}
      title={product.title}
      className="card  bg-base-100 shadow-xl duration-300 hover:translate-y-[-5px]"
    >
      <figure>
        <img src={product.imgUrl} alt={product.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.category}</h2>
        <p>{product.desc}</p>
        <div className="card-actions justify-between items-center">
          <p className="font-medium">${product.price}</p>
          <button
            onClick={() => {
              handleAddProduct(product);
            }}
            className="btn btn-primary bg-[#7063f3] border-none text-white hover:bg-[#5d52cf] duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="grid grid-cols-auto-fill-350 gap-5 my-20 sm:px-2 px-14 mx-auto">
        {renderedProducts}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
