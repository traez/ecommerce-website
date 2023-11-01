/*
he Footer component seems to be the final section of the application, offering information about the website and its creator. It provides a basic but essential footer section, which typically contains links, credits, and other relevant information for the users.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";

export default function Footer() {
  const {} = useContext(StateContext)!;

  return (
    <footer className="flex flex-row justify-center items-center gap-2 text-sm">
      <a
        href="https://github.com/traez/ecommerce-website"
        target="_blank"
        className=" hover:underline hover:text-traeCoolRed font-bold"
      >
        E-Commerce Website
      </a>
      <b>©2023 Trae Zeeofor</b>
    </footer>
  );
}
