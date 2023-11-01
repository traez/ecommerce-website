/*
 this component provides users with a detailed view of a specific product within a category, offering the ability to explore similar items and facilitating the addition of products to the shopping cart. The conditional rendering technique ensures the view is presented only after the necessary data has been fetched, addressing hydration warnings and providing a seamless user experience.

to prevent hydration warning wrapped whole return in !loading with useeffect. Return statement only runs after useeffect
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../../StateProvider";
import { footballQuote } from "../../libraries/dataFootballQuote";
import { nigeria } from "../../libraries/dataTeamNigeria";
import { manchester } from "../../libraries/dataTeamManchester";
import { barcelona } from "../../libraries/dataTeamBarcelona";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal";

export default function Product() {
  const params = useParams();
  const category = params.category as string;
  const product = params.product as string;
  const router = useRouter();
  const { getRandoms, isModalOpen, toggleModal, addToCart } = useContext(StateContext)!;
  const [randomItems, setRandomItems] = useState<RandomItems[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [randomFootballQuote, setRandomFootballQuote] = useState<string>("");

  function isValidCategory(category: string) {
    return ["nigeria", "manchester", "barcelona"].includes(category);
  }

  type RandomItems = {
    name: string;
    id: string;
    year: number | string;
    color: string;
    price: number;
    competition?: string;
    league?: string;
    europe?: string;
    sponsor: string;
  };

  useEffect(() => {
    if (!isValidCategory(category)) {
      router.push("/");
    } else {
      const fetchData = async () => {
        setRandomFootballQuote(
          footballQuote[Math.floor(Math.random() * footballQuote.length)].quote
        );
        const items = await getRandoms();
        setRandomItems(items);
        setLoading(false);
      };

      fetchData();
    }
  }, []);

  const categoryData =
    category === "nigeria"
      ? nigeria
      : category === "manchester"
      ? manchester
      : barcelona;

  const shuffledCategoryData = categoryData.sort(() => 0.5 - Math.random());

  const randomlyChosenItems = shuffledCategoryData.slice(0, 3);

  const selectedProduct: RandomItems | undefined = categoryData.find(
    (item) => item.id === product
  );

  const handleAddToCart = () => {
    if (selectedProduct?.id) {
      addToCart(selectedProduct?.id, 1);
      toggleModal();
    }
  };

  return (
    <>
      {!loading && (
        <div className="border-4 border-solid border-traeSoccerBlue rounded-[0.5rem] p-4 bg-traeWhiteBlue text-traeFifaBlue grid grid-rows-[auto,auto,auto] grid-cols-[auto] gap-2">
          <menu className="grid grid-cols-2 grid-rows-[auto] gap-1 w-full">
            <div className="flex justify-center items-center row-start-1 row-end-2 col-start-1 col-end-2 text-[1.2rem] font-bold">
              {randomFootballQuote}
            </div>
            {!loading && randomItems && (
              <div className="flex flex-col justify-center items-center row-start-1 row-end-2 col-start-2 col-end-3 border-2 border-solid border-traeSoccerBlue rounded p-1 hover:bg-traeLiteBlue">
                <div
                  className="relative h-[12rem] w-[9rem] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/${selectedProduct?.name}/${selectedProduct?.id}`
                    )
                  }
                >
                  <Image
                    src={`/images/${selectedProduct?.name}-${selectedProduct?.year}-${selectedProduct?.id}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 400px) 100vw"
                    className="rounded-lg"
                  />
                </div>
                <ul className="w-full font-bold text-[0.7rem]">
                  <li className="flex justify-between">
                    <span>
                      <b>Year: </b> <i>{selectedProduct?.year}</i>
                    </span>
                    <span>
                      <b>Price: </b> <strong>$</strong>
                      <i>{selectedProduct?.price}</i>
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      <b>Color: </b> <i>{selectedProduct?.color}</i>
                    </span>
                    <span className="hover:text-traeCoolRed cursor-pointer rounded-[0.3rem] p-1 bg-traeCoolOrange text-traeWhiteBlue" onClick={handleAddToCart}>
                      Add To Cart
                    </span>
                  </li>
                  <li>
                    <b>Sponsor: </b> <i>{selectedProduct?.sponsor}</i>
                  </li>
                  {selectedProduct?.competition && (
                    <li>
                      <b>Competition: </b> <i>{selectedProduct?.competition}</i>
                    </li>
                  )}
                  {selectedProduct?.league && (
                    <li>
                      <b>League: </b> <i>{selectedProduct?.league}</i>
                    </li>
                  )}
                  {selectedProduct?.europe && (
                    <li>
                      <b>Europe: </b> <i>{selectedProduct?.europe}</i>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </menu>

          <article className="text-[1.2rem] font-bold w-full flex flex-col justify-center items-center">
            <div>
              Click on <span className=" text-traeCoolOrange">Add to Cart</span>{" "}
              to make a purchase.
            </div>
            <div>Check out other similar products below.</div>
          </article>

          <section className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
            {randomlyChosenItems.map((item: RandomItems, index) => (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center border-2 border-solid border-traeSoccerBlue rounded p-1 hover:bg-traeLiteBlue"
              >
                <div
                  className="relative h-[12rem] w-[9rem] cursor-pointer"
                  onClick={() => router.push(`/${item.name}/${item.id}`)}
                >
                  <Image
                    src={`/images/${item.name}-${item.year}-${item.id}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 400px) 100vw"
                    className="rounded-lg"
                  />
                </div>
                <ul className="w-full font-bold text-[0.7rem]">
                  <li className="flex justify-between">
                    <span>
                      <b>Year: </b> <i>{item.year}</i>
                    </span>
                    <span>
                      <b>Price: </b> <strong>$</strong>
                      <i>{item.price}</i>
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      <b>Color: </b> <i>{item.color}</i>
                    </span>
                    <span className="hover:text-traeCoolRed cursor-pointer rounded-[0.3rem] p-1 bg-traeCoolOrange text-traeWhiteBlue" onClick={() => router.push(`/${item.name}/${item.id}`)}>
                    See Product
                    </span>
                  </li>
                  <li>
                    <b>Sponsor: </b> <i>{item.sponsor}</i>
                  </li>
                  {item.competition && (
                    <li>
                      <b>Competition: </b> <i>{item.competition}</i>
                    </li>
                  )}
                  {item.league && (
                    <li>
                      <b>League: </b> <i>{item.league}</i>
                    </li>
                  )}
                  {item.europe && (
                    <li>
                      <b>Europe: </b> <i>{item.europe}</i>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </section>
        </div>
      )}
      {isModalOpen && <Modal />}
    </>
  );
}
