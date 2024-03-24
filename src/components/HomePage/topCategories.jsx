import { useEffect, useState } from "react";
import TopCategoriesPlaceholder from "./Placeholders/topCategoriesPlaceholder";
import { useNavigate } from "react-router/dist";
import { Link } from "react-router-dom";
import Festivewear from "../../assets/festive_wear.jpg";
import Bottom from "../../assets/bottomwearslim.jpg";
import Cauals from "../../assets/cauals.jpg";
import Footwear from "../../assets/footwear.jpg";
import "./index.css"
export default function TopCategories() {
  const Catagories = [
    {
      catagory:"Festive",
      img: Festivewear
    },
    {
      catagory:"Bottom",
      img: Bottom
    },
    {
      catagory:"Cauals",
      img: Cauals
    },
    {
      catagory:"Footwear",
      img: Footwear
    }
  ];
  const [loading, setLoading] = useState(false);

  

  return (
    <div className="p-4">
      <h2 className="md:text-4xl text-2xl text-center font-semibold mt-4 mb-3">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <>
            {Catagories.map((item, index) => {
              return (
                <CategoryCard Card={item} key={index} />
              );
            })}
        </>
   
      </div>
    </div>
  );
}


// eslint-disable-next-line react/prop-types
function CategoryCard({ Card }) {
  return (
    <Link
      to = {`/${Card.catagory}`}
      className="border border-gray-300 text-sm md:text-base rounded-lg my-4 hover:border-transparent hover:-translate-y-1 hover:shadow-md transition-all list-none Card"
      onClick={() => {
        window.scroll({ top: 0, behavior: "smooth" });
      }}
      style={{ backgroundImage: `url(${Card.img})`}}
    >
    {/* <img src={Card.img} alt={Card.catagory} className="tileImage"/> */}
  <div class="overlay">
    <div class="overlay-text">{Card.catagory}</div>
  </div>
    
    </Link>
  );
}
