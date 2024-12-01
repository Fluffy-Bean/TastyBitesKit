import type { CartRecord, CartItem, Item } from "./types";

function createCartStore() {
    const cart: CartRecord = $state({});

    async function addToCart(uuid: string, amount: number) {
        if (cart[uuid]) {
            cart[uuid].amount += amount;
        } else {
            let request = await fetch(`/api/menuItems/${uuid}`);
            let item: Item = await request.json();

            cart[uuid] = {
                amount: amount,
                data: item,
            };
        }
        if (cart[uuid].amount <= 0) delete cart[uuid];
        if (cart[uuid].amount > 99) cart[uuid].amount = 99;
    }

    function getEntries(): [string, CartItem][] {
        return Object.entries(cart);
    }

    function getUniqueLength(): number {
        return Object.keys(cart).length;
    }

    function getTotalPrice(): number {
        let totalCartPrice = 0;
        Object.values(cart).forEach((item: CartItem) => {
            totalCartPrice += item.amount * item.data.price;
        });
        return totalCartPrice;
    }

    function removeByUUID(uuid: string): void {
        delete cart[uuid];
    }

    return {
        cart,
        addToCart,
        getEntries,
        getUniqueLength,
        getTotalPrice,
        removeByUUID,
    };
}

const CartSvelte = createCartStore();
export default CartSvelte;
