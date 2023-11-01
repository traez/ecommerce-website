/*
the ModalDone component ensures a clear and visually pleasant representation of the user's purchase, detailing the items bought, their quantities, and the total cost of the order. It offers a simple pathway for users to return to the home page after confirming their purchase. This component plays a significant role in the post-purchase experience, ensuring users have a clear summary of their transaction.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from "next/navigation";
import { nigeria } from "../libraries/dataTeamNigeria";
import { manchester } from "../libraries/dataTeamManchester";
import { barcelona } from "../libraries/dataTeamBarcelona";

export default function ModalDone() {
  const router = useRouter();
  const { cart, toggleModalDone } = useContext(StateContext)!;
  const { jerseysBought } = cart;
  const filteredItems = Array.from(new Set(jerseysBought));

  const handleCloseModalDone = () => {
    toggleModalDone();
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[2] bg-black bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 h-[24rem] w-[18rem] transform -translate-x-1/2 -translate-y-1/2 p-4 z-[3] bg-traeWhiteBlue flex flex-col justify-between items-center text-traeSoccerBlue">
        <div className="cursor-pointer relative h-[4rem] w-[4rem]">
          <Image
            src={`/images/icon-orderconfirmation.png`}
            alt=""
            fill
            sizes="(min-width: 400px) 100vw"
          />
        </div>
        <h1 className="font-bold">Thank you for your order</h1>
        <div className="font-bold text-[0.9rem] text-center ">
          You will receive an email confirmation shortly
        </div>
        <article className="h-1/2 overflow-y-auto w-full">
          {filteredItems.map((item) => {
            const foundItem = [...nigeria, ...manchester, ...barcelona].find(
              (data) => data.id === item
            );
            const itemCount = jerseysBought.filter((x) => x === item).length;

            return (
              <nav
                key={item}
                className="p-1 w-full flex flex-row justify-between items-center"
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="cursor-pointer relative h-[2rem] w-[2rem]">
                    <Image
                      src={`/images/${foundItem?.name}-${foundItem?.year}-${foundItem?.id}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 400px) 100vw"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-start gap-2">
                    <b>{foundItem?.name}</b>
                    <div>${foundItem?.price}</div>
                  </div>
                </div>
                <div>
                  X<span>{itemCount}</span>
                </div>
              </nav>
            );
          })}
        </article>
        <div className="w-full flex flex-row justify-between items-center">
          <div className=" font-bold">GRAND TOTAL</div>
          <div>
            <b>$</b>
            <strong>{cart.grandTotalCost}</strong>
          </div>
        </div>
        <button
          className="bg-traeCoolOrange p-2 cursor-pointer text-traeWhiteBlue font-bold w-full rounded hover:text-black"
          onClick={handleCloseModalDone}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
