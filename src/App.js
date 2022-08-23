import Header from "./components/Header";
import Products from "./components/Products";
import "./App.css";
import { Fragment, useState, useEffect } from "react";
import Cart from "./components/Cart";
import Pagination from "./components/Pagination";
import Landing from "./Landing";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  function toggleHandler() {
    setCartIsShown(!cartIsShown);
  }

  const localStorageItems = window.localStorage.getItem("cartItems");
  const initialItemsState = localStorageItems
    ? JSON.parse(localStorageItems)
    : [];

  const [cartItems, setCartItems] = useState(initialItemsState);

  function onAddToCart(addedItem) {
    const exist = cartItems.find((product) => product.id === addedItem.id);

    if (!exist) {
      setCartItems([...cartItems, { ...addedItem, count: 1 }]);
    }

    if (exist) {
      setCartItems(
        cartItems.map((product) =>
          product.id === addedItem.id
            ? {
                ...product,
                count: product.count + 1,
              }
            : product
        )
      );
    }
  }

  function onRemoveFromCart(removedItem) {
    if (removedItem.count === 1) {
      setCartItems(cartItems.filter((item) => item.id !== removedItem.id));
    }
    if (removedItem.count > 1) {
      setCartItems(
        cartItems.map((product) =>
          product.id === removedItem.id
            ? {
                ...product,
                count: product.count - 1,
              }
            : product
        )
      );
    }
  }

  const localStorageBadgeCounter = window.localStorage.getItem("badgeCounter");
  const initialBadgeCounterState = localStorageBadgeCounter
    ? JSON.parse(localStorageBadgeCounter)
    : 0;

  const [badgeCounter, setBadgeCounter] = useState(initialBadgeCounterState);

  function badgeCounterIncr() {
    setBadgeCounter(badgeCounter + 1);
  }
  function badgeCounterDecr() {
    setBadgeCounter(badgeCounter - 1);
  }

  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  console.log(error);

  async function fetchData() {
    try {
      const response = await fetch("https://gutendex.com/books/");
      const data = await response.json();
      setIsLoading(false);
      console.log(data.results);
      setFilteredData(data.results);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onProceed() {
    setCartItems([]);
    setBadgeCounter(0);
  }

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("badgeCounter", badgeCounter);

  return (
    <Fragment>
      {cartIsShown && (
        <Cart
          onClick={toggleHandler}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          onIncr={badgeCounterIncr}
          onDecr={badgeCounterDecr}
          onProceed={onProceed}
        ></Cart>
      )}
      <div className="container">
        <Header onClick={toggleHandler} badgeCounter={badgeCounter}></Header>
        <Landing />
        <Products
          products={currentPosts}
          onAddToCart={onAddToCart}
          onIncr={badgeCounterIncr}
          isLoading={isLoading}
          error={error}
        ></Products>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredData.length}
          paginate={paginate}
          posts={filteredData}
        />
      </div>
    </Fragment>
  );
}

export default App;
