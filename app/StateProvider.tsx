/*
the StateProvider component encapsulates the application's shared state and functions, ensuring that various components can access and modify these states consistently across the app. This centralization of state and functions is a common pattern in React applications, especially for complex state management and sharing data between components.
*/
"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { nigeria } from "./libraries/dataTeamNigeria";
import { manchester } from "./libraries/dataTeamManchester";
import { barcelona } from "./libraries/dataTeamBarcelona";

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

interface StateContextType {
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  getRandoms: () => any[];
  jerseyDetails: Record<string, number>;
  cart: {
    jerseysBought: string[];
    totalCost: number;
    shippingCost: number;
    VATCost: number;
    grandTotalCost: number;
  };
  addToCart: (jersey: string, quantity: number) => void;
  removeFromCart: (jersey: string, quantity: number) => void;
  recalculateTotals: () => void;
  isModalOpen: boolean;
  isModalDoneOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalDoneOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
  toggleModalDone: () => void;
  clearCart: () => void;
}

interface StateProviderProps {
  children: ReactNode;
}

export default function StateProvider({ children }: StateProviderProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const teamsData = [...nigeria, ...manchester, ...barcelona];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDoneOpen, setIsModalDoneOpen] = useState(false);
  const [cart, setCart] = useState<{
    jerseysBought: string[];
    totalCost: number;
    shippingCost: number;
    VATCost: number;
    grandTotalCost: number;
  }>({
    jerseysBought: [],
    totalCost: 0,
    shippingCost: 50,
    VATCost: 0,
    grandTotalCost: 0,
  });
  const [jerseyDetails, setJerseyDetails] = useState<Record<string, number>>({
    "101n": 40,
    "102n": 40,
    "103n": 45,
    "104n": 45,
    "105n": 50,
    "106n": 50,
    "107n": 60,
    "108n": 60,
    "109n": 60,
    "110n": 60,
    "101m": 90,
    "102m": 80,
    "103m": 95,
    "104m": 90,
    "105m": 100,
    "106m": 95,
    "107m": 105,
    "108m": 100,
    "109m": 110,
    "110m": 105,
    "101b": 89,
    "102b": 85,
    "103b": 95,
    "104b": 90,
    "105b": 100,
    "106b": 95,
    "107b": 105,
    "108b": 100,
    "109b": 110,
    "110b": 105,
  });

  useEffect(() => {
    const storedJerseys = localStorage.getItem("cartJerseys");
    if (storedJerseys) {
      const parsedJerseys = JSON.parse(storedJerseys);
      setCart((prevCart) => ({ ...prevCart, jerseysBought: parsedJerseys }));
    }
  }, []);

  const addToCart = (jersey: string, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      cart.jerseysBought.push(jersey);
      cart.totalCost += jerseyDetails[jersey];
    }
    recalculateTotals();
    console.log(cart);
    localStorage.setItem("cartJerseys", JSON.stringify(cart.jerseysBought));
  };

  const removeFromCart = (jersey: string, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      const index = cart.jerseysBought.lastIndexOf(jersey);
      if (index > -1) {
        cart.jerseysBought.splice(index, 1);
        cart.totalCost -= jerseyDetails[jersey];
      }
    }
    recalculateTotals();
    console.log(cart);
    localStorage.setItem("cartJerseys", JSON.stringify(cart.jerseysBought));
  };

  const recalculateTotals = () => {
    cart.totalCost = cart.jerseysBought.reduce((total, jersey) => total + jerseyDetails[jersey], 0);
    cart.VATCost = 0.2 * cart.totalCost;
    cart.grandTotalCost = cart.totalCost + cart.shippingCost + cart.VATCost;
  };

  const clearCart = () => {
    cart.jerseysBought = [];
    recalculateTotals();
    console.log(cart);
    localStorage.setItem("cartJerseys", JSON.stringify(cart.jerseysBought));
  };

  const getRandoms = () => {
    const randomIndex = Math.floor(Math.random() * 30);
    const randomTeamItem = teamsData[randomIndex];
    const randomNigeriaItem =
      nigeria[Math.floor(Math.random() * nigeria.length)];
    const randomManchesterItem =
      manchester[Math.floor(Math.random() * manchester.length)];
    const randomBarcelonaItem =
      barcelona[Math.floor(Math.random() * barcelona.length)];

    return [
      randomTeamItem,
      randomNigeriaItem,
      randomManchesterItem,
      randomBarcelonaItem,
    ];
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleModalDone = () => {
    setIsModalDoneOpen((prev) => !prev);
  };

  return (
    <StateContext.Provider
      value={{
        mounted,
        setMounted,
        getRandoms,
        jerseyDetails,
        cart,
        addToCart,
        removeFromCart,
        recalculateTotals,
        clearCart,
        isModalOpen,
        isModalDoneOpen,
        setIsModalOpen,
        setIsModalDoneOpen,
        toggleModal,
        toggleModalDone,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
