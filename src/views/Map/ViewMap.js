import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import get from "../../helper/api"

const ViewMap = () => {
  const [map, setMaps] = useState({
    longitude: "",
    latitude: "",
    // num_bike: "",
    // num_docks: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadMap();
  }, []);
  const loadMap = async () => {
 
    axios.get(`${process.env.REACT_APP_API_URL}getMap/${id}`)
    .then((res) => {
      setMaps(res.data.data);
    })
    .catch(() => {});

  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/map">
        back to Home
      </Link>
      <h1 className="display-4">Map Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Location: {map.longitude}, { map.latitude}</li>
        {/* <li className="list-group-item">Bike Number: {map.num_bike}</li>
        <li className="list-group-item">Docks Number: {map.num_docks}</li> */}
      </ul>
    </div>
  );
};

export default ViewMap;
