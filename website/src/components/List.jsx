// src/components/List.jsx
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as NavLink } from "react-router-dom";

const mapStateToProps = state => {
  return { articles: state.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        <NavLink to={`/home/${el.id}`} className="nav-link">{el.title}</NavLink>
        
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;