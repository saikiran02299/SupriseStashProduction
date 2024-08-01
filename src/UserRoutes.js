import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import DebitedTransactions from "views/examples/DebitedTransaction";
import CreditedTransactions from "views/examples/CreditedTransactions";
import UserManagement from "views/examples/UserManagement";
import MoneyManagement from "views/examples/MoneyManagement";
import AllTransactions from "views/examples/AllTransactions"
import ProfileUser from "ProfileUser";
import DebitedUser from "views/examples/DebitedUser";
import CreditedUser from "views/examples/CreditedUser";

var UserRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/user",
  },
  {
    path: "/CreditedUser",
    name: "Credited History",
    icon: "fa-solid fa-money-bill-transfer",
    component: <CreditedUser />,
    layout: "/user",
  },
  {
    path: "/DebitedUser",
    name: "Debited History",
    icon: "fa-solid fa-money-bill-transfer",
    component: <DebitedUser />,
    layout: "/user",
  },
  {
    path: "/ProfileUser",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <ProfileUser />,
    layout: "/user",
  },
  

];

export default UserRoutes;
