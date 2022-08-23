import classes from "./Products.module.css";
import { Roll } from "react-reveal";
import { Fragment } from "react";

const Products = (props) => {
  const products = props.products.map((item) => (
    <div className={classes.item} key={item.id}>
      <img src={item.formats["image/jpeg"]} alt=""></img>
      <h5>{item.title.substring(0, 40)}</h5>
      <h5 style={{ color: "#8d8d8d" }}>{item.authors[0].name}</h5>
      <div className={classes.lower}>
        <button
          onClick={() => {
            props.onAddToCart(item);
            props.onIncr();
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <h3 style={{ "margin-left": "10px" }}>Popular Now</h3>
      <div>
        <ul className={classes.container}>
          {props.isLoading ? (
            <p>Loading...</p>
          ) : props.error ? (
            <p>{`${props.error} books data.`}</p>
          ) : products.length > 0 ? (
            <Roll left cascade>
              {products}
            </Roll>
          ) : (
            "No books available."
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Products;
