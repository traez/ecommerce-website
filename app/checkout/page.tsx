/*
this component forms the core of the checkout process, ensuring that users input correct and complete information before proceeding with the payment for their selected items. It manages the interaction between user input, error handling, and summarizing the transaction details, thus finalizing the shopping experience.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import ModalDone from "../components/ModalDone";
import { StateContext } from "../StateProvider";
import { nigeria } from "../libraries/dataTeamNigeria";
import { manchester } from "../libraries/dataTeamManchester";
import { barcelona } from "../libraries/dataTeamBarcelona";

export default function Checkout() {
  const {
    cart,
    isModalOpen,
    isModalDoneOpen,
    toggleModalDone,
    recalculateTotals,
  } = useContext(StateContext)!;
  const { jerseysBought } = cart;
  const filteredItems = Array.from(new Set(jerseysBought));
  const [paymentMethod, setPaymentMethod] = useState("emoney");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [emoneyNumber, setEmoneyNumber] = useState("");
  const [emoneyPIN, setEmoneyPIN] = useState("");
  const [error, setError] = useState<string[]>([]);

  recalculateTotals();

  const validateForm = () => {
    setError([]);
    const errors: string[] = [];

    if (!name) {
      errors.push("Name must not be empty");
    }

    if (!/^.+@.+\..+$/.test(email)) {
      errors.push("Email must be valid");
    }

    if (!phoneNumber) {
      errors.push("Phone Number must not be empty");
    }

    if (!homeAddress) {
      errors.push("Home Address must not be empty");
    }

    if (zipCode.toString().length < 6) {
      errors.push("6 digit ZIP Code needed");
    }

    if (!city) {
      errors.push("City must not be empty");
    }

    if (!country) {
      errors.push("Country must not be empty");
    }

    if (paymentMethod === "emoney") {
      if (emoneyNumber.length < 9 || emoneyPIN.length < 4) {
        errors.push("Incomplete digits in e-Money inputs");
      }
    }

    if (cart.totalCost <= 0) {
      errors.push("TOTAL must be above 0");
    }

    setError(errors);
    return errors.length === 0;
  };

  const handleValidation = () => {
    const isValid = validateForm();
    if (isValid) {
      toggleModalDone();
    }
  };

  return (
    <>
      <section className="border-4 border-solid border-traeSoccerBlue rounded-[0.5rem] p-4 bg-traeWhiteBlue text-traeFifaBlue flex flex-col justify-center items-center gap-4 lg:flex-row lg:items-start">
        <div className="w-full min-h-[300px] border-2 border-solid border-traeSoccerBlue rounded p-2 flex flex-col justify-between items-start gap-6">
          <h2 className="text-2xl text-black font-bold">CHECKOUT</h2>

          {error.length > 0 && (
            <div
              id="error"
              className="text-traeCoolRed border-[0.1rem] border-solid border-traeCoolRed rounded p-2 w-full"
            >
              {error.map((errorMessage, index) => (
                <div key={index}>{errorMessage}</div>
              ))}
            </div>
          )}

          <article className="flex flex-col gap-2 w-full">
            <h3 className="text-traeCoolOrange font-bold">BILLING DETAILS</h3>
            <div className="flex flex-col ">
              <label className="font-bold text-black" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Peter Obi"
                className="rounded-[0.5rem] p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="peterobi@gmail.com"
                className="rounded-[0.5rem] p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-bold text-black">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+2348012345678"
                className="rounded-[0.5rem] p-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </article>
          <article className="flex flex-col gap-2 w-full">
            <h3 className="text-traeCoolOrange font-bold">SHIPPING INFO</h3>
            <div className="flex flex-col">
              <label htmlFor="address" className="font-bold text-black">
                Home Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="21 Upper Iweka"
                className="rounded-[0.5rem] p-2"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="zip" className="font-bold text-black">
                ZIP Code
              </label>
              <input
                type="number"
                id="zip"
                placeholder="900001"
                className="rounded-[0.5rem] p-2"
                min="0"
                max="999999"
                value={zipCode}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const input = e.target as HTMLInputElement;
                  const trimmedValue = input.value.slice(0, 6);
                  setZipCode(trimmedValue);
                  input.value = trimmedValue;
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="font-bold text-black">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Abuja"
                className="rounded-[0.5rem] p-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="font-bold text-black">
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Nigeria"
                className="rounded-[0.5rem] p-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </article>
          <article className="flex flex-col gap-4 w-full">
            <h3 className="text-traeCoolOrange font-bold">PAYMENT DETAILS</h3>
            <div className="grid grid-rows-[auto] grid-cols-[1fr,1fr]">
              <label htmlFor="enumber" className="font-bold text-black">
                Payment Method
              </label>
              <div className="flex flex-col justify-between items-start gap-1">
                <label
                  htmlFor="myInput"
                  className="font-bold text-black border-[1px] border-solid border-black rounded-[0.5rem] p-4 w-full h-[50%] cursor-pointer "
                >
                  <input
                    type="radio"
                    id="emoney"
                    name="myInputField"
                    className="mr-[2px] cursor-pointer"
                    checked={paymentMethod === "emoney"}
                    onChange={() => setPaymentMethod("emoney")}
                  />
                  e-Money
                </label>
                <label
                  htmlFor="myInput"
                  className="font-bold text-black border-[1px] border-solid border-black rounded-[0.5rem] p-4 w-full h-[50%] cursor-pointer "
                >
                  <input
                    type="radio"
                    id="cashondel"
                    name="myInputField"
                    className="mr-[2px] cursor-pointer"
                    checked={paymentMethod === "cashondel"}
                    onChange={() => setPaymentMethod("cashondel")}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
            {paymentMethod === "cashondel" && (
              <menu className="flex flex-col justify-between items-center gap-1">
                <div className="cursor-pointer relative h-[3rem] w-[3rem]">
                  <Image
                    src="/images/icon-cashondelivery.png"
                    alt=""
                    fill
                    sizes="(min-width: 400px) 100vw"
                  />
                </div>
                <div className="text-black ">
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </div>
              </menu>
            )}
            {paymentMethod === "emoney" && (
              <aside>
                <div className="flex flex-col">
                  <label htmlFor="enumber" className="font-bold text-black">
                    e-Money Number
                  </label>
                  <input
                    type="number"
                    id="enumber"
                    placeholder="238541697"
                    className="rounded-[0.5rem] p-2"
                    min="0"
                    max="999999999"
                    value={emoneyNumber}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const input = e.target as HTMLInputElement;
                      const trimmedValue = input.value.slice(0, 9);
                      setEmoneyNumber(trimmedValue);
                      input.value = trimmedValue;
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="epin" className="font-bold text-black">
                    e-Money PIN
                  </label>
                  <input
                    type="number"
                    id="epin"
                    placeholder="6891"
                    className="rounded-[0.5rem] p-2"
                    min="0"
                    max="9999"
                    value={emoneyPIN}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const input = e.target as HTMLInputElement;
                      const trimmedValue = input.value.slice(0, 4);
                      setEmoneyPIN(trimmedValue);
                      input.value = trimmedValue;
                    }}
                  />
                </div>
              </aside>
            )}
          </article>
        </div>
        <div className="w-full min-h-[300px] border-2 border-solid border-traeSoccerBlue rounded p-2 flex flex-col justify-between items-start gap-6">
          <h2 className="text-2xl text-black font-bold">SUMMARY</h2>

          {filteredItems.map((item) => {
            const foundItem = [...nigeria, ...manchester, ...barcelona].find(
              (data) => data.id === item
            );
            const itemCount = jerseysBought.filter((x) => x === item).length;

            return (
              <nav
                key={item}
                className="border-[1px] border-solid border-black rounded-[0.5rem] p-4 w-full flex flex-row justify-between items-center"
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="cursor-pointer relative h-[3rem] w-[3rem]">
                    <Image
                      src={`/images/${foundItem?.name}-${foundItem?.year}-${foundItem?.id}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 400px) 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start gap-2">
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

          <div className="w-full flex flex-row justify-between items-center">
            <div>TOTAL</div>
            <div>
              <b>$</b>
              <strong>{cart.totalCost}</strong>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>SHIPPING</div>
            <div>
              <b>$</b>
              <strong>{cart.shippingCost}</strong>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>VAT (INCLUDED)</div>
            <div>
              <b>$</b>
              <strong>{cart.VATCost}</strong>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>GRAND TOTAL</div>
            <div>
              <b>$</b>
              <strong>{cart.grandTotalCost}</strong>
            </div>
          </div>
          <button
            className="bg-traeCoolOrange p-2 cursor-pointer text-traeWhiteBlue font-bold w-full rounded hover:text-black"
            onClick={handleValidation}
          >
            CONTINUE & PAY
          </button>
          {error.length > 0 && (
            <div
              id="error"
              className="text-traeCoolRed border-[0.1rem] border-solid border-traeCoolRed rounded p-2 w-full"
            >
              Kindly review and fix Checkout errors
            </div>
          )}
        </div>
      </section>
      {isModalOpen && <Modal />}
      {isModalDoneOpen && <ModalDone />}
    </>
  );
}
