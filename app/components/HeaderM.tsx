/*
 the HeaderM component focuses on providing a mobile-optimized navigation method for users. It offers an easy-to-use, dropdown-based navigation system that allows users to select different sections of the application from a mobile device.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from "next/navigation";

export default function HeaderM() {
  const {} = useContext(StateContext)!;
  const router = useRouter();

  const handleNavigation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    router.push(selectedOption);
  };

  return (
    <>
      <select
        className="h-[3rem] text-traeFifaBlue bg-traeWhiteBlue font-bold rounded cursor-pointer"
        onChange={handleNavigation}
        value=""
      >
        <option className="font-bold" value="">
          Select
        </option>
        <option className="font-bold" value="/">
          Home
        </option>
        <option className="font-bold" value="/nigeria">
          Nigeria
        </option>
        <option className="font-bold" value="/manchester">
          Manchester
        </option>
        <option className="font-bold" value="/barcelona">
          Barcelona
        </option>
      </select>
    </>
  );
}


