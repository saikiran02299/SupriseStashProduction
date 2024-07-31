/*!

=========================================================
*Surprise Stash React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Auth from "layouts/Auth";
// import ForgotPasswords from "views/examples/ForgotPassword";
// import ForgotPassword from "views/examples/ForgotPassword";


var Authroutes = [
  {
    path: "/Login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login/>,
    layout: "/auth",
  },
  {
    path: "/LandPage",
    name: "LandPage",
    icon: "ni ni-circle-08 text-pink",
    layout: "/auth",
  },
  // {
  //   path: "/ForgotPassword",
  //   name: "ForgotPassword",
  //   icon: "fa-solid fa-money-bill-transfer",
  //   component: <ForgotPassword/>,
  //   layout: "/auth",
  // },
  
  
];
export default Authroutes;
