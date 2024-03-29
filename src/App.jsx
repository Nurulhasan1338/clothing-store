import "./App.css";
import HomePage from "./components/HomePage";
import Categories from "./components/categoriesPage";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes, useNavigate } from "react-router/dist";
import Cart from "./components/cart";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SelectDeliveryAddress from "./components/cart/selectDeliveryAddress";
import FavoriteProducts from "./components/favorite";
import Header from "./components/header";
import SearchResults from "./components/header/searchResults";
import AllProducts from "./components/allProducts";
import Footer from "./components/Footer"

function App() {
  const [user, setUser] = useState();
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  );

  const [favProducts, setFavProducts] = useState(
    localStorage.getItem("favProducts")
      ? JSON.parse(localStorage.getItem("favProducts"))
      : [],
  );

  const [searching, setSearching] = useState(false);
  const [resultArr, setResultArr] = useState([]);
  const [query, setQuery] = useState("");

  function searchProduct(searchText) {
    setQuery(searchText);
    setSearching(true);
    setResultArr(search(products));
  }

  const search_parameters = Object.keys(Object.assign({}, ...products));

  function search(products) {
    console.log(searching);
    return products.filter((product) =>
      search_parameters.some((parameter) =>
        product[parameter].toString().toLowerCase().includes(query),
      ),
    );
  }

  function showResult(resultArr) {
    console.log(resultArr);
  }

  useEffect(() => {
    localStorage.setItem("favProducts", JSON.stringify(favProducts));
  }, [favProducts]);

  function onClickFav(Itemid) {
    const clickedProduct = products.find((product) => product.id == Itemid);
    const duplicateFavProducts = [...favProducts];
    if (duplicateFavProducts.length == 0) {
      duplicateFavProducts.push({ ...clickedProduct, isFavorite: true });
      setFavProducts(duplicateFavProducts);
      return;
    }

    const isItemPresent = duplicateFavProducts.find((product) => {
      return product.id == Itemid;
    });

    if (isItemPresent) {
      const selectedItemIndex = duplicateFavProducts.indexOf(isItemPresent);
      duplicateFavProducts.splice(selectedItemIndex, 1);
      setFavProducts(duplicateFavProducts);
    } else {
      duplicateFavProducts.push({ ...clickedProduct, isFavorite: true });
      setFavProducts(duplicateFavProducts);
    }
  }

  function isItemFav(Itemid) {
    const selectedProduct = favProducts.find((product) => product.id == Itemid);
    if (selectedProduct) {
      return true;
    } else {
      return false;
    }
  }

  let cartItemsNumber = null;

  let cartItemsQuantityArr = cartItems.map((cartItem) => {
    return cartItem.quantity;
  });

  if (cartItemsQuantityArr != 0) {
    if (cartItemsQuantityArr != []) {
      cartItemsNumber = cartItemsQuantityArr.reduce(
        (acc, current) => +acc + +current,
      );
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(productId) {
    let clickedProduct = products.find((product) => product.id == productId);

    if (cartItems.length == 0) {
      setCartItems([{ ...clickedProduct, quantity: 1 }]);
      return;
    }

    const isItemPresent = cartItems.find((cartItem) => {
      return cartItem.id == productId;
    });

    if (isItemPresent) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id == productId) {
          return { ...item, quantity: ++item.quantity };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...clickedProduct, quantity: 1 }]);
    }
  }

  function navigateToCart() {
    navigate("/cart");
  }

  function toggleDropdown() {
    setisOpen(!isOpen);
  }

  const responseMessage = (response) => {
    const decodedToken = jwtDecode(response.credential);

    setUser({
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    });
    setisOpen(false);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  function increaseProductQuantity(itemId) {
    const duplicateArray = [...cartItems];
    const selectedCartItem = duplicateArray.find((cartItem) => {
      return itemId == cartItem.id;
    });

    ++selectedCartItem.quantity;
    setCartItems(duplicateArray);
  }

  function decreaseProductQuantity(itemId) {
    const duplicateArray = [...cartItems];
    const selectedCartItem = duplicateArray.find((cartItem) => {
      return itemId == cartItem.id;
    });

    if (selectedCartItem && selectedCartItem.quantity > 1) {
      --selectedCartItem.quantity;
      setCartItems(duplicateArray);
    } else if (selectedCartItem && selectedCartItem.quantity == 1) {
      removeProduct(itemId);
    }
  }

  function changeProductQuantity(e, itemId) {
    const duplicateArray = [...cartItems];
    const selectedCartItem = duplicateArray.find((cartItem) => {
      return itemId == cartItem.id;
    });

    selectedCartItem.quantity = e.target.value;
    setCartItems(duplicateArray);
  }

  function removeProduct(itemId) {
    const duplicateArray = [...cartItems];

    const selectedCartItem = duplicateArray.find((cartItem) => {
      return itemId == cartItem.id;
    });

    const selectedProductIndex = duplicateArray.indexOf(selectedCartItem);

    if (selectedProductIndex > -1) {
      duplicateArray.splice(selectedProductIndex, 1);
    }
    setCartItems(duplicateArray);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className="pb-3">

      <Header
        user={user}
        navigateToCart={navigateToCart}
        responseMessage={responseMessage}
        errorMessage={errorMessage}
        handleLogout={handleLogout}
        toggleDropdown={toggleDropdown}
        isOpen={isOpen}
        cartItemsNumber={cartItemsNumber}
        showResult={showResult}
        searching={searching}
        resultArr={resultArr}
        setSearching={setSearching}
        searchProduct={searchProduct}
        />
      </div>
      <div className="mt-5 pt-3">
        <Routes>
          <Route
            path="/"
            element={<HomePage onClickFav={onClickFav} isItemFav={isItemFav} />}
          />
          <Route
            path="/ProductDetail/:id"
            element={
              <ProductDetail
                loading={loading}
                addToCart={addToCart}
                products={products}
                onClickFav={onClickFav}
                isItemFav={isItemFav}
              />
            }
          />
          <Route
            path="/:category"
            element={
              <Categories onClickFav={onClickFav} isItemFav={isItemFav} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                increaseProductQuantity={increaseProductQuantity}
                decreaseProductQuantity={decreaseProductQuantity}
                changeProductQuantity={changeProductQuantity}
                removeProduct={removeProduct}
                onClickFav={onClickFav}
                isItemFav={isItemFav}
              />
            }
          />

          <Route
            path="/choose-delivery-add"
            element={<SelectDeliveryAddress />}
          />

          <Route
            path="/favorite-products"
            element={
              <FavoriteProducts
                onClickFav={onClickFav}
                isItemFav={isItemFav}
                user={user}
              />
            }
          />

          <Route
            path="/searh-result"
            element={
              <SearchResults
                resultArr={resultArr}
                loading={loading}
                onClickFav={onClickFav}
                isItemFav={isItemFav}
              />
            }
          />

          <Route
            path="/all-products"
            element={
              <AllProducts
                products={products}
                onClickFav={onClickFav}
                loading={loading}
                isItemFav={isItemFav}
              />
            }
          />
        </Routes>
      <Footer/>
      </div>
    </>
  );
}

export default App;
