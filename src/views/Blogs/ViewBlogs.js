import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import get from "../../helper/api"

const ViewBlogs = () => {
  const [blog, setBlogs] = useState({
    title: "",
    description: "",
    image:""
 
  });
  const { id } = useParams();
  useEffect(() => {
    loadBlog();
  }, []);
  const loadBlog = async () => {
 
    get(`getBlog/${id}`)
    .then((res) => {
      console.log("specific",res)
      setBlogs(res.data.data);
    })
    .catch(() => {});

  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/blogs">
        back to Home
      </Link>
      <h1 className="display-4">Blog Id: {blog._id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item"><b>Title:</b> {blog.title}</li>
        <li className="list-group-item"><b>Description:</b> {blog.description}</li>
        <li className="list-group-item"><img width="300" height= "300" src={ blog.image}/></li>
      </ul>
    </div>
  );
};

export default ViewBlogs;
