import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { post } from "../../helper/api"
import { v4 as uuidv4 } from 'uuid';
import { setAuthorizationToken } from "helper/setAuthorizationToken";

export default function AddCategory() {
  let history = useHistory();
  const [name, setName] = useState("")

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await post("save-category", { name })
      setName(res.data)
      history.push("/admin/categories")
    } catch (err) {
      history.push("/admin/categories")
      console.log(err);
    }
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Category</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your category"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className="btn btn-primary btn-block">Add Category</button>
        </form>
      </div>
    </div>
  );
}

