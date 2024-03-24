/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { CartIcon, HeartFilledIcon, ProfileIcon } from "../DynamicIcons";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Logo from "/Logo.png";
import { createPortal } from "react-dom";
import SideMenu from "./sizeMenu"
import "./index.css";

export default function Header({
  navigateToCart,
  user,
  responseMessage,
  errorMessage,
  handleLogout,
  toggleDropdown,
  isOpen,
  cartItemsNumber,
  showResult,
  searching,
  resultArr,
  searchProduct,
  setSearching,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-row justify-content-between fixed z-10 header">
        <div className="d-flex flex-row">

        <div className="flex">
          <Link to={"/"}>
            <img src={Logo} className="imgLogo" alt="Bazigar logo"  />
          </Link>
          <div className="items-center pt-2 logo-name">
          <p>BAZIGAR</p> 
          <p>COLLECTION</p>
          </div>
        </div>

        <div className="d-flex flex-row align-items-around hideformobile items-center ms-5" >
        <div  className="mx-3 nav-link "><Link to="/">Top wear</Link></div>
        <div  className="mx-3 nav-link"><Link to="/">Bttom wear</Link></div>
        <div  className="mx-3 nav-link"><Link to="/">Footwear </Link></div>
        <div  className="mx-3 nav-link me-5"><Link to="/">About us</Link></div>
        </div>

        </div>

        <div className="d-flex flex-row align-items-center">
        
        <div className="w-50 me-5 hideformobile">
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              showResult();
            }}
          >
            <input
              type="search"
              className="px-4 py-2 rounded-md w-full outline-none text-black text-lg z-10 relative"
              placeholder="Search Your Product"
              onChange={(e) => searchProduct(e.target.value)}
            />
          </form>

          {searching ? (
            <>
              <div className="absolute top-full bg-white border border-gray-300 rounded-md w-full text-black z-10 divide-gray-300  divide-y max-h-[300px] overflow-auto">
                {resultArr.map((item) => {
                  return (
                    <Link
                      to={{
                        pathname: "/searh-result",
                        state: { exampleProp: "resultArr" },
                      }}
                      className="px-3 py-2 cursor-pointer block"
                      key={item.id}
                      onClick={() => {
                        setSearching(false);
                        showResult(resultArr);
                      }}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {createPortal(
                <div
                  className="absolute inset-0"
                  onClick={() => setSearching(false)}
                ></div>,
                document.body,
              )}
            </>
          ) : (
            ""
            )}
        
        
      

        </div>
        
       
        <div className="d-flex flex-row justify-content-end">      
        <button
          className="px-2 relative"
          onClick={navigateToCart}
        >
          <CartIcon />
          {cartItemsNumber && (
            <span className="w-4 h-4 bg-red-800 text-white text-xs leading-4 text-center rounded-full absolute -top-1 right-0">
              {cartItemsNumber}
            </span>
          )}
         
      
        </button>

        <button
          className="px-2"
          onClick={() => navigate("/favorite-products")}
        >
          <HeartFilledIcon />
        </button>

        <button
          className="px-2 relative"
          onClick={toggleDropdown}
        >
          {user && user.picture ? (
            <div className="w-6 h-6">
              <img
                src={user.picture}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <ProfileIcon />
          )}

          {isOpen ? (
            <div className="absolute top-full end-0 z-10">
              {!user && (
                <div>
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    useOneTap
                  />
                </div>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-sm bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </button>
        </div>

        <div className="d-md-none" >
        <SideMenu/>
        </div>

      

        </div>

      </div>
    </>
  );
}
