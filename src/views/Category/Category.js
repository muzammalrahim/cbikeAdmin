import React, { useState, useEffect, useCallback, Component } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar"
import get,{del} from "../../helper/api"
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { toast } from "react-toastify";

const useStyles = makeStyles(styles);

const Category = () => {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategory =(id) => {
    del(`remove-category?categoryId=${id}`).then((res) => {
      toast.error(res.data.response)
      loadCategories();
    }).catch(error => {
    });
  };

  const loadCategories = async () => {
    try {
      const res = await get(`getCategory`)
      console.log("res", res.data.data);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <h1>Category Page</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                categories?.map((category, index) => {
                console.log("id" , category._id)
                return (
               
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.name}</td>
                  
                  <td>
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/admin/view-category/${category._id}`}>
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
                      <Link to={`/admin/edit-category/${category._id}`}>
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
                      <Link to="categories" onClick={(e) => deleteCategory(category._id)}>
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
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category

// class Clients extends Component {
//   state = {
//     clients: [],
//     client_names:""
//   }

//   componentDidMount() {
//     this.loadClient()
//   }

//   filterData = (e) => {
//     this.setState({[e.target.name]: e.target.value},()=>this.searchClient())
//   }


//   deleteClient =(id) => {
//     del(`client/deleteClient?id=${id}`).then((res) => {
//       loadClient();
//       console.log("id2",id)
//     }).catch(error => {
//     });
//   };

//   searchClient = () => {
//     console.log("search value", this.state.client_names);
//     get(`client/searchClients?client_names=${this.state.client_names}`)
//     .then((res) => {
//       var data = res.data.Items
//       this.setState({clients:data})
//       console.log("specific",data)
//     })
//     .catch(() => {});
//   }


//   loadClient =() => {
//      get("client/getClients")
//     .then((res) => {
//       var data = res.data?.data.Items
//       this.setState({clients:data});
//      console.log("clients",data)
//     })
//        .catch((error) => {
//     });
//   };
//   render() {
//     return (
//           <div>
//       <Navbar />
//       <div className="container">
//         <div className="py-4">
//           <h1>Client Page</h1>
//             <input
//               type="search"
//               name="client_names"
//               value={this.state.client_names}
//               placeholder="Search"
//               onChange={this.filterData}
//               autoComplete="off"
//             />
//           <br /><br />
//           <table className="table border shadow">
//             <thead className="thead-dark">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Client Names</th>
//                 <th scope="col">Rate</th>
                
//                 <th scope="col">Tax Name</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.clients?.map((client, index) =>{
//                 console.log("id" , client.id)
//                 return (
               
//                 <tr key={index}>
//                   <th scope="row">{index + 1}</th>
//                   <td>{client.client_names}</td>
//                   <td>{client.rate}</td>
                  
//                   <td>{client.tax_name}</td>
//                   <td>
//                     <Tooltip
//                       id="tooltip-top"
//                       title="View"
//                       placement="top"
//                       useStyles={{ tooltip: useStyles.tooltip }}
//                     >
//                       <Link to={`/admin/view-client/${client.id}`}>
//                         <IconButton
//                           aria-label="View"
//                           className={useStyles.tableActionButton}
//                         >
//                           <View
//                             className={
//                               useStyles.tableActionButtonIcon + " " + useStyles.view
//                             }
//                           />
//                         </IconButton>
//                       </Link>
//                     </Tooltip>
//                     <Tooltip
//                       id="tooltip-top"
//                       title="Edit"
//                       placement="top"
//                       useStyles={{ tooltip: useStyles.tooltip }}
//                     >
//                       <Link to={`/admin/edit-client/${client.id}`}>
//                         <IconButton
//                           aria-label="Edit"
//                           className={useStyles.tableActionButton}
//                         >
//                           <Edit
//                             className={
//                               useStyles.tableActionButtonIcon + " " + useStyles.edit
//                             }
//                           />
//                         </IconButton>
//                       </Link>
//                     </Tooltip>
//                     <Tooltip
//                       id="tooltip-top-start"
//                       title="Remove"
//                       placement="top"
//                       useStyles={{ tooltip: useStyles.tooltip }}
//                     >
//                       <Link to="clients" onClick={(e) => deleteClient(client.id)}>
//                         <IconButton
//                           aria-label="Close"
//                           className={useStyles.tableActionButton}
//                         >
//                           <Close
//                             className={
//                               useStyles.tableActionButtonIcon +
//                               " " +
//                               useStyles.close
//                             }
//                           />
//                         </IconButton>
//                       </Link>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               )})}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     )
//   }
// }
// export default Clients;
