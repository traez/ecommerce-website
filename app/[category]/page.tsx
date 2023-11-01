/*
the Category component dynamically generates content based on the category specified in the URL, providing an interactive interface for users to explore and interact with different items within a specific category.
*/
"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider";
import { componentMission } from "../libraries/dataComponentMission";
import { nigeria } from "../libraries/dataTeamNigeria";
import { manchester } from "../libraries/dataTeamManchester";
import { barcelona } from "../libraries/dataTeamBarcelona";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "../components/Modal";

export default function Category() {
  const params = useParams();
  const category = params.category as string;
  const router = useRouter();
  const { getRandoms, isModalOpen, toggleModal, addToCart } =
    useContext(StateContext)!;
  const [randomItems, setRandomItems] = useState<RandomItems[] | null>(null);
  const [loading, setLoading] = useState(true);

  function isValidCategory(category: string) {
    return ["nigeria", "manchester", "barcelona"].includes(category);
  }

  function getMissionForCategory(category: string) {
    let feedback = null;

    for (const item of componentMission) {
      if (item[category]) {
        feedback = item[category].mission;
        break;
      }
    }
    return feedback;
  }

  const categoryMission = getMissionForCategory(category);

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
        const items = await getRandoms();
        setRandomItems(items);
        setLoading(false);
      };

      fetchData();
    }
  }, []);

  let selectedItem: RandomItems | undefined = randomItems?.[0];

  if (category === "nigeria" && randomItems) {
    selectedItem = randomItems[1];
  } else if (category === "manchester" && randomItems) {
    selectedItem = randomItems[2];
  } else if (category === "barcelona" && randomItems) {
    selectedItem = randomItems[3];
  }

  const categoryData =
    category === "nigeria"
      ? nigeria
      : category === "manchester"
      ? manchester
      : barcelona;

  const handleAddToCart = () => {
    if (selectedItem?.id) {
      addToCart(selectedItem?.id, 1);
      toggleModal();
    }
  };

  return (
    <>
      <div className="border-4 border-solid border-traeSoccerBlue rounded-[0.5rem] p-4 bg-traeWhiteBlue text-traeFifaBlue grid grid-rows-[auto,auto] grid-cols-[auto] gap-2">
        <menu className="grid grid-cols-2 grid-rows-[auto] gap-1 w-full">
          <div className="flex justify-center items-center row-start-1 row-end-2 col-start-1 col-end-2 text-[1.2rem] font-bold">
            {categoryMission}
          </div>
          {!loading && randomItems && (
            <div className="flex flex-col justify-center items-center row-start-1 row-end-2 col-start-2 col-end-3 border-2 border-solid border-traeSoccerBlue rounded p-1 hover:bg-traeLiteBlue">
              <div
                className="relative h-[12rem] w-[9rem] cursor-pointer"
                onClick={() =>
                  router.push(`/${selectedItem?.name}/${selectedItem?.id}`)
                }
              >
                <Image
                  src={`/images/${selectedItem?.name}-${selectedItem?.year}-${selectedItem?.id}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 400px) 100vw"
                  className="rounded-lg"
                />
              </div>
              <ul className="w-full font-bold text-[0.7rem]">
                <li className="flex justify-between">
                  <span>
                    <b>Year: </b> <i>{selectedItem?.year}</i>
                  </span>
                  <span>
                    <b>Price: </b> <strong>$</strong>
                    <i>{selectedItem?.price}</i>
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>
                    <b>Color: </b> <i>{selectedItem?.color}</i>
                  </span>
                  <span
                    className="hover:text-traeCoolRed cursor-pointer rounded-[0.3rem] p-1 bg-traeCoolOrange text-traeWhiteBlue"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </span>
                </li>
                <li>
                  <b>Sponsor: </b> <i>{selectedItem?.sponsor}</i>
                </li>
                {selectedItem?.competition && (
                  <li>
                    <b>Competition: </b> <i>{selectedItem?.competition}</i>
                  </li>
                )}
                {selectedItem?.league && (
                  <li>
                    <b>League: </b> <i>{selectedItem?.league}</i>
                  </li>
                )}
                {selectedItem?.europe && (
                  <li>
                    <b>Europe: </b> <i>{selectedItem?.europe}</i>
                  </li>
                )}
              </ul>
            </div>
          )}
        </menu>

        <section className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
          {categoryData.map((item: RandomItems, index) => (
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
                  <span
                    className="hover:text-traeCoolRed cursor-pointer rounded-[0.3rem] p-1 bg-traeCoolOrange text-traeWhiteBlue"
                    onClick={() => router.push(`/${item.name}/${item.id}`)}
                  >
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
      {isModalOpen && <Modal />}
    </>
  );
}
