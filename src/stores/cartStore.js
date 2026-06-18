import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;

        const exists = cart.find(i => i.product_id === product.id);

        if (exists) {
          set({
            cart: cart.map(i =>
              i.product_id === product.id
                ? {...i, quantity: i.quantity + 1}
                : i
            )
          });
        } else {
          set({
            cart: [
              ...cart,
              {
                product_id: product.id,
                product_name: product.name,
                price: product.price,
                quantity: 1,
                unit: product.unit,
              }
            ]
          });
        }
      },

      getTotalAmount: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      updateQuantity: (id, quantity) => {
        const qty = Number(quantity);
        set({
          cart: get().cart.map(item =>
            item.product_id === id
              ? {
                ...item,
                quantity: qty,
              }
              : item
          )
        })
      },

      increaseQuantity: (id) => {
        set({
          cart: get().cart.map(item =>
            item.product_id === id
              ? {
                ...item,
                quantity: item.quantity + 1
              }
              : item
          ),
        })
      },

      decreaseQuantity: (id) => {
        set({
          cart: get().cart
            .map(item =>
              item.product_id === id
                ? {
                  ...item,
                  quantity: item.quantity - 1
                }
                : item
            )
            .filter(item => item.quantity > 0)
        })
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(i => i.product_id !== id)
        });
      },

      clearCart: () => set({cart: []}),
    }),
    {
      name: "pos-cart"
    }
  )
);