import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get, { put } from "../../helper/api"
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

const EditBlogs = () => {
  let history = useHistory();
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image:""
  });
  const [loading,isLoading]=useState(false)
  
  const onInputChange = e => {
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

  useEffect(() => {
    loadBlog();
  }, []);
 
  const onSubmit = async e => {
    e.preventDefault();
    let payload = {
      title: blog.title,
      description: blog.description,
      image: imageUrl
    }
    put(`update-blog/${id}`, payload).then(res => {
      history.push("/admin/blogs")
    });
    loadBlog()
    history.push("/admin/blogs");
  };

  const loadBlog = () => {
  isLoading(true)
    get(`getBlog/${id}`)
    .then((res) => {
      isLoading(false)
      setBlog(res.data.data);
      setImageUrl(res.data.data.image)
    })
    .catch(() => {});
  };
  const { title, description} = blog;
  return loading ? (
    "loading..."
  ) : (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Blog</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
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
          <button type="submit" className="btn btn-warning btn-block">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogs;
