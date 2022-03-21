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
  const [startLongitude, setStartLongitude] = useState("")
  const [startLatitude, setStartLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")
  const [map, setMap] = useState({
    station_name: "",
    num_bike: "",
    num_docks: "",
    description: "",
  })

  const { station_name, num_bike, num_docks, description } = map
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      setStartLongitude(position.coords.longitude)
      setStartLatitude(position.coords.latitude)
    })
  }, [])

  useEffect(() => {
    loadMap()
  }, [])

  const loadMap = () => {
    isLoading(true)
    get(`getMap/${id}`)
      .then((res) => {
        // console.log("res loc", res.data.data.longitude);
        isLoading(false)
        setMap(res.data.data)
        console.log("resp data", res.data.data);
        setLongitude(res.data.data.longitude);
        setLatitude(res.data.data.latitude);
      })
      .catch(() => { });
  };

  const onMapClicked = async (clickEvent) => {
    setLongitude(clickEvent.lng)
    setLatitude(clickEvent.lat)
  }

  const onInputChange = e => {
    setMap({ ...map, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    let payload = {
      station_name: map.station_name,
      num_bike: map.num_bike,
      num_docks: map.num_docks,
      description: map.description,
      longitude,
      latitude
    }
    put(`update-map/${id}`, payload).then(res => {
      history.push("/admin/map")
    });
    loadMap();
    history.push("map");
  };


  // console.log("lng and lat", longitude, latitude);
  return loading ? (
    "loading..."
  ) : (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Map</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your station name"
              name="station_name"
              value={station_name}
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
              placeholder="Enter Your dock number"
              name="num_docks"
              value={num_docks}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className='map'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyD6Huc36x8W0XJt1cUhyqCXMdQ1xiwx_Rs" }}
              center={{
                lat: startLatitude,
                lng: startLongitude
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
