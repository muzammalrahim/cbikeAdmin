import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import get, { del } from "../../helper/api"
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

const TimeEntries = () => {
  const [map, setMap] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    loadMap();
  }, []);

  // const deletePortfolio =(id) => {
  //   del(`partner/remove-partner/${id}`);
  //   setPortfolios([])
  //     loadPortfolio([]);
  // };

  const deleteMap = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}remove-map/${id}`)
      .then((res) => {
        loadMap();
      })
      .catch((error) => { });
  };


  const loadMap = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/getMaps`)
      .then((res) => {
        setMap(res.data.data);
      })
      .catch(() => { });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <h1>Map Page</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Station Name</th>
                <th scope="col">Location</th>
                <th scope="col">Bike Number</th>
                <th scope="col">Docks Number</th>
                <th scope="col">Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {map?.map((map, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{map.station_name}</td>
                  <td>{map.longitude}, {map.latitude}</td>
                  <td>{map.num_bike}</td>
                  <td>{map.num_docks}</td>
                  <td>{map.description}</td>
                  <td>
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/admin/view-map/${map._id}`}>
                        <IconButton
                          aria-label="View"
                          className={classes.tableActionButton}
                        >
                          <View
                            className={
                              classes.tableActionButtonIcon + " " + classes.view
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/admin/edit-map/${map._id}`}>
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Remove"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to="map" onClick={() => deleteMap(map._id)}>
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon +
                              " " +
                              classes.close
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeEntries;
