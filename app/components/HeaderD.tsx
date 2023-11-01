/*
The HeaderD component essentially provides the desktop-specific navigation menu, offering clear links to different sections of the application. Its primary purpose is to enhance user navigation and interaction within the application, maintaining a consistent and user-friendly interface for users accessing the app from desktop devices.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { StateContext } from "../StateProvider";

export default function HeaderD() {
  const {} = useContext(StateContext)!;
  const navigationItems = [
    { label: "Home", link: "/" },
    { label: "Nigeria", link: "/nigeria" },
    { label: "Manchester", link: "/manchester" },
    { label: "Barcelona", link: "/barcelona" },
  ];

  return (
    <ul className="flex flex-row justify-center items-center gap-4 h-[3rem] w-[55%] text-traeWhiteBlue">
      {navigationItems.map((item, index) => (
        <li key={index} className="flex flex-row justify-center items-center font-bold text-[1.2rem] hover:text-traeCoolOrange">
          <Link href={item.link}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}


