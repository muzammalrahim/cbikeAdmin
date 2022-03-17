import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get,{put} from "../../helper/api"

const EditCategory = () => {
  let history = useHistory();
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
  });
const [loading,isLoading]=useState(false)
  
  const onInputChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCategory();
  }, []);
 
  const onSubmit = async e => {
    e.preventDefault();
    let payload = {
      name: category.name,
    }
    put(`update-category/${id}`, payload).then(res => {
      history.push("/admin/categories")
    });
    loadCategory()
    history.push("/admin/categories");
  };

  const loadCategory = () => {
  isLoading(true)
    get(`getCategory/${id}`)
    .then((res) => {
      isLoading(false)
      setCategory(res.data.data);
    })
    .catch(() => {});
  };
  const { name} = category;
  return loading ? (
    "loading..."
  ) : (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Category</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-warning btn-block">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
