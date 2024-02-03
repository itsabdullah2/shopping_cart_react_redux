import { createSlice } from "@reduxjs/toolkit";

const findItemInCart = (state, action) => {
  return state.find((item) => item.id === action.payload.id);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addProductToCard(state, action) {
      const existingProduct = findItemInCart(state.data, action);

      if (existingProduct) {
        const updated = state.data.map((item) =>
          item.id === existingProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return { ...state, data: updated }; // Update the state
      } else {
        return {
          ...state,
          data: [...state.data, { ...action.payload, quantity: 1 }],
        };
      }
    },
    increaseQuantity(state, action) {
      return {
        ...state,
        data:
          state.data.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            } else {
              return item;
            }
          }) || [],
      };
    },
    decreaseQuantity(state, action) {
      const productId = action.payload.id;
      const isProductFound = state.data.find((item) => item.id === productId);
      if (isProductFound) {
        const updated = state.data.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: Math.max(item.quantity - 1, 0),
            };
          } else {
            return item;
          }
        });
        // remove the item if the quantity <= 0
        const filteredProducts = updated.filter((item) => item.quantity > 0);
        return {
          ...state,
          data: filteredProducts,
        };
      }
      return state;
    },
    removeProduct(state, action) {
      const updated = state.data.filter((product) => {
        return product.id !== action.payload.id;
      });
      state.data = updated;
    },
  },
});

export const {
  removeProduct,
  addProductToCard,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
