import axios from "axios"
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get, { put } from "../../helper/api"
import GoogleMapReact from 'google-map-react';
import CurrentMarker from "components/CurrentMarker";

const EditMap = () => {
  let history = useHistory();
  const { id } = useParams();
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")


  const [loading, isLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    })
  }, [])

  useEffect(() => {
    loadMap()
  }, [])

  const loadMap = () => {
    isLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}getMap/${id}`)
      .then((res) => {
        // console.log("res loc", res.data.data.longitude);
        isLoading(false)
        setLongitude(res.data.data.longitude);
        setLatitude(res.data.data.latitude);
      })
      .catch(() => { });
  };

  const onMapClicked = async (clickEvent) => {
    setLongitude(clickEvent.lng)
    setLatitude(clickEvent.lat)
  }

  const onSubmit = async e => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}update-map/${id}`, { longitude, latitude }).then(res => {
      history.push("/admin/map")
    });
    loadMap();
    history.push("/admin/map");
  };


  console.log("lng and lat", longitude, latitude);
  return loading ? (
    "loading..."
  ) : (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Map</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='map'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyD6Huc36x8W0XJt1cUhyqCXMdQ1xiwx_Rs" }}
              center={{
                lat: latitude,
                lng: longitude
              }}
              zoom={11}
              onClick={onMapClicked}
            >
              <CurrentMarker
                lat={latitude}
                lng={longitude}
                text="my marker"
              />
            </GoogleMapReact>
          </div>
          <br /><br />
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your location"
              name="location"
              value={location}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your bike number"
              name="num_bike"
              value={num_bike}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your docks number"
              name="num_docks"
              value={num_docks}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <button className="btn btn-warning btn-block" type="submit">
            Update Map
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMap;
