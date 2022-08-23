import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, posts }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    posts.length > 0 && (
      <nav className={classes.pagination}>
        <ul className={classes.list}>
          <p>Page</p>
          {pageNumbers.map((number) => (
            <li key={number} className={classes.pages}>
              <button
                onClick={() => {
                  paginate(number);
                  window.scrollTo(0, 0);
                }}
                className={classes["page-link"]}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
