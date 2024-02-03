import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  removeProduct,
  addProductToCard,
  increaseQuantity,
  decreaseQuantity,
} from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export {
  store,
  increaseQuantity,
  decreaseQuantity,
  addProductToCard,
  removeProduct,
};
