import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import get, { post } from "../../helper/api"
import { v4 as uuidv4 } from 'uuid';
import { setAuthorizationToken } from "helper/setAuthorizationToken";
import { uploadFile } from 'react-s3';

const S3_BUCKET = 'file-upload-noman';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIA4VSOGAGAFW2ARO6X';
const SECRET_ACCESS_KEY = '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';

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}

export default function AddBlogs() {
  let history = useHistory();
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: ""
  })
  const [imageUrl, setImageUrl] = useState("");

  const { title, description, image } = blog;

  useEffect(() => {
    categories();
    // setTimeout(() => isLoading(false), 2000)
  }, []);

  const InputChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file, e) => {
    e.preventDefault()
    uploadFile(file, config)
      .then(data => {
        setImageUrl(data.location)
      })
      .catch(err => console.error("error", err))
  }

  const categories = async () => {
    get("getCategoryDropdown")
      .then((res) => {
        var data = res.data.data
        console.log("Another Data", data)
        setCategory(data)
      })
      .catch(() => { });
  };

  const onSubmit = async e => {
    e.preventDefault()
    try {
      let payload = {
        categoryId: selectCategory,
        title: blog.title,
        description: blog.description,
        image: imageUrl
      }
      const apiRes = await post("save-blog", payload)
      console.log(apiRes);
      setBlog(apiRes.data);
      history.push("/admin/blogs");
    } catch (err) {
      console.log(err);
      history.push("/admin/blogs");
    }
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Blog</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <select
              name="category"
              className="browser-default custom-select custom-select-lg"
              onChange={e => setSelectCategory(e.target.value)}>
              <option value="">Select category</option>
              {category.map(category => (
                <option value={category?._id}>{category?.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your title"
              name="title"
              value={title}
              onChange={e => InputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={e => InputChange(e)}
            />
          </div>
          <input type="file" onChange={handleFileInput} />
          <button onClick={(e) => handleUpload(selectedFile, e)}> Upload to S3</button>
          <br /><br />
          <img
            className="ref"
            src={imageUrl || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            height="300"
            width="400"
          />
          <br /><br />
          <button type='submit' className="btn btn-primary btn-block">Add Blog</button>
        </form>
      </div>
    </div>
  );
}

