/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
// core components/views for Admin layout
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Blogs from 'views/Blogs/Blogs'
import Category from 'views/Category/Category'
import Map from 'views/Map/Map'

const dashboardRoutes = [
  {
    path: "/categories",
    name: "Category",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Category,
    layout: "/admin",
  },
  {
    path: "/blogs",
    name: "Blogs",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Blogs,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Map,
    layout: "/admin",
  }
];

export default dashboardRoutes;
