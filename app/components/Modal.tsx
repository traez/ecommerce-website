/*
the Modal component acts as a crucial element for users to interact with their shopping cart, managing the items, quantities, and providing clear options for further actions such as clearing the cart or proceeding to checkout. Its interaction with the global state allows for consistent updates and synchronization of cart-related data across the application.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from "next/navigation";
import { nigeria } from "../libraries/dataTeamNigeria";
import { manchester } from "../libraries/dataTeamManchester";
import { barcelona } from "../libraries/dataTeamBarcelona";

export default function Modal() {
  const router = useRouter();
  const {
    toggleModal,
    cart,
    clearCart,
    addToCart,
    removeFromCart,
    recalculateTotals,
  } = useContext(StateContext)!;
  const { jerseysBought } = cart;
  const [cartCount, setCartCount] = useState(jerseysBought.length);
  const [modalTotalCost, setModalTotalCost] = useState(cart.totalCost);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    recalculateTotals();
    const countItems = () => {
      const counts: Record<string, number> = {};

      jerseysBought.forEach((item) => {
        if (counts[item]) {
          counts[item] += 1;
        } else {
          counts[item] = 1;
        }
      });

      setItemCounts(counts);
      setCartCount(jerseysBought.length);
      setModalTotalCost(cart.totalCost);
    };

    countItems();
  }, [jerseysBought, cart.totalCost]);

  const handleClearCart = () => {
    clearCart();
    setCartCount(0);
    setModalTotalCost(0);
  };

  const handleCheckout = () => {
    toggleModal();
    router.push("/checkout");
  };

  const decreaseItemCount = (itemId: string | undefined) => {
    if (itemId) {
      removeFromCart(itemId, 1);
      setCartCount(jerseysBought.length);
      setModalTotalCost(cart.totalCost);
    }
  };

  const increaseItemCount = (itemId: string | undefined) => {
    if (itemId) {
      addToCart(itemId, 1);
      setCartCount(jerseysBought.length);
      setModalTotalCost(cart.totalCost);
    }
  };

  const filteredItems = Array.from(new Set(jerseysBought)).filter(
    (item) => itemCounts[item] && itemCounts[item] > 0
  );

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[2] bg-black bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 h-[24rem] w-[18rem] transform -translate-x-1/2 -translate-y-1/2 p-4 z-[3] bg-traeWhiteBlue flex flex-col justify-between items-center text-traeSoccerBlue">
        <nav className="flex flex-row justify-between items-center w-full gap-2">
          <div>
            <div className="font-bold">
              Cart (<span>{cartCount}</span>)
            </div>
          </div>
          <button
            className="bg-traeCoolRed p-1 cursor-pointer text-traeWhiteBlue font-bold w-[50%] rounded hover:text-black"
            onClick={handleClearCart}
          >
            Remove all
          </button>
        </nav>
        <article className="h-1/2 overflow-y-auto w-full">
          {filteredItems.map((item) => {
            const foundItem = [...nigeria, ...manchester, ...barcelona].find(
              (data) => data.id === item
            );
            const itemCount = itemCounts[item];
            return (
              <menu
                className="flex flex-row justify-between items-center w-full"
                key={item}
              >
                <div className="cursor-pointer relative h-[4rem] w-[4rem]">
                  <Image
                    src={`/images/${foundItem?.name}-${foundItem?.year}-${foundItem?.id}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 400px) 100vw"
                  />
                </div>
                <div className="flex flex-col justify-between items-center">
                  <b>{foundItem?.name}</b>
                  <div>${foundItem?.price}</div>
                </div>
                <div className="flex flex-row justify-between items-center gap-1">
                  <button
                    className="bg-traeFifaBlue text-traeWhiteBlue h-[1rem] w-[1rem] flex flex-col justify-center items-center"
                    onClick={() => decreaseItemCount(foundItem?.id)}
                  >
                    -
                  </button>
                  <b>{itemCount}</b>
                  <button
                    className="bg-traeFifaBlue text-traeWhiteBlue h-[1rem] w-[1rem] flex flex-col justify-center items-center"
                    onClick={() => increaseItemCount(foundItem?.id)}
                  >
                    +
                  </button>
                </div>
              </menu>
            );
          })}
        </article>
        <aside className=" w-full">
          <nav className="flex flex-row justify-between items-center w-full gap-2">
            <div className="font-bold">TOTAL</div>
            <div>
              <div className="font-bold">
                $<span>{modalTotalCost.toFixed(2)}</span>
              </div>
            </div>
          </nav>
          <nav className="flex flex-row justify-between items-center w-full gap-2">
            <button
              className="bg-traeCoolGreen p-1 cursor-pointer text-traeWhiteBlue font-bold w-full rounded hover:text-black"
              onClick={toggleModal}
            >
              Continue
            </button>
            <button
              className="bg-traeCoolOrange p-1 cursor-pointer text-traeWhiteBlue font-bold w-full rounded hover:text-black"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </nav>
        </aside>
      </div>
    </div>
  );
}
