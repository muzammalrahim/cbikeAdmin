import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import get from "../../helper/api"

const ViewCategory = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = async () => {
 
    get(`getCategory/${id}`)
    .then((res) => {
      console.log("specific",res)
      setCategory(res.data.data);
    })
    .catch(() => {});

  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/categories">
        back to Home
      </Link>
      <h1 className="display-4">Category Id: {category._id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Category: {category.name}</li>
      </ul>
    </div>
  );
};

export default ViewCategory;
