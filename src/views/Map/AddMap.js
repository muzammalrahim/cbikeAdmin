import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import get, { post } from "../../helper/api"
import GoogleMapReact from 'google-map-react';
import CurrentMarker from "components/CurrentMarker";

export default function AddMap() {
  let history = useHistory();
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    })
  }, [])

  const onMapClicked = async (clickEvent) => {
    setLongitude(clickEvent.lng)
    setLatitude(clickEvent.lat)
  }
  // const [map, setMap] = useState({
  //   location: "",
  //   image: "",
  //   num_bike: "",
  //   num_docks: "",
  // });

  // const { location, image, num_bike, num_docks} = map;
  // const onInputChange = e => {
  //   setMap({ ...map, [e.target.name]: e.target.value });
  // };

  const onSubmit = async e => {
    e.preventDefault()
    try {
      // let payload = {
      //   longitude: longitude,
      //   latitude: latitude
      // }
      const res = await axios.post(`${process.env.REACT_APP_API_URL}save-map`, { longitude, latitude })
      console.log("map res", res.data.data);
      setLongitude(res.data);
      setLatitude(res.data)
      history.push("/admin/map");
    } catch (err) {
      console.log(err);
      history.push("/admin/map");
    }
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Map</h2>
        <form onSubmit={e => onSubmit(e)}>
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
          <button type='submit' className="btn btn-primary btn-block">Add Map</button>
        </form>
      </div>
    </div>
  );
}