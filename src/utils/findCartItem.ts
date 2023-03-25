import { CartItem } from "../redux/slices/cartSlice";

export const findCartItem = (items: CartItem[], id: string) => {
	return items.find(obj => obj.id === id);
};