import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {

    //Logica

    const validCar = true;
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");

        try {
            const parsed = localStorageCart ? JSON.parse(localStorageCart) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Error al leer el carrito de localStorage:", error);
            localStorage.removeItem("cart");
            return [];
        }
    };


    const [data] = useState(db);
    const [cart, setCart] = useState(() => initialCart());

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;


    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return;

            const updatedCart = [...cart];
            updatedCart[itemExist] = {
                ...updatedCart[itemExist],
                quantity: updatedCart[itemExist].quantity + 1,
            };

            setCart(updatedCart);
            return;
        }

        setCart([...cart, { ...item, quantity: 1 }]);
    }

    function decreaseQuantity(id) {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id && item.quantity > MIN_ITEMS
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

    function increaseQuantity(id) {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id && item.quantity < MAX_ITEMS
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    function clearCart() {
        setCart([]);
    }



    return {

        cart,
        data,
        isEmpty,
        cartTotal,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,


    }


}

