/*
The essence of this Next.js component is to render the main content represented by the <Landing /> component and conditionally render a modal based on the isModalOpen state value obtained from the shared context, providing a fundamental structure for the home page of the application.
*/
"use client";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "./StateProvider";
import Landing from "./components/Landing";
import Modal from "./components/Modal";

export default function Home() {
  const { isModalOpen } = useContext(StateContext)!;

  return (
    <>
      <Landing />
      {isModalOpen && <Modal />}
    </>
  );
}
