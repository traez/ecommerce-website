/*
the Header component is a crucial part of the application's user interface. It ensures a consistent and user-friendly navigation experience by providing access to the home page and the shopping cart, adapting its display to suit various device screen sizes. The dynamic rendering of different headers based on screen size enhances the user experience and maintains the application's responsiveness.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";
import HeaderM from "./HeaderM";
import HeaderD from "./HeaderD";
import useMediaQuery from "../libraries/useMediaQuery";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cart, toggleModal } = useContext(StateContext)!;
  const isMobile = useMediaQuery("(max-width: 599px)");
  const HeaderX = isMobile ? HeaderM : HeaderD;
  const router = useRouter();
  const { jerseysBought } = cart;

  return (
    <header className=" px-5 pb-12 w-full flex flex-row justify-between items-end">
      <div
        className="cursor-pointer relative h-[3rem] w-[12rem] border-2 border-solid border-traeWhiteBlue rounded hover:border-traeCoolOrange"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/icon-jerseymart.png"
          alt=""
          fill
          sizes="(min-width: 400px) 100vw"
        />
      </div>

      <HeaderX />

      <div className="flex flex-col justify-center items-end">
        <b className="translate-y-2/4 translate-x-2/4 bg-traeCoolOrange rounded-[50%] h-[1.4rem] w-[1.4rem] z-[1] flex flex-col justify-center items-center cursor-pointer hover:text-traeCoolRed">
          {jerseysBought.length}
        </b>
        <div className="cursor-pointer relative h-[2rem] w-[2rem]" onClick={toggleModal}>
          <Image
            src="/images/icon-shoppingcart.png"
            alt=""
            fill
            sizes="(min-width: 400px) 100vw"
          />
        </div>
      </div>
    </header>
  );
}


