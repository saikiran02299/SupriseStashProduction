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





var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index/>,
    layout: "/admin",
  },
  // {
  //   path: "/transactions",
  //   name: "Transactions",
  //   icon: "ni ni-planet text-blue",
  //   component: <All />,
  //   layout: "/admin",
  //   children: [
  //     {
  //       path: "/transactions/debited",
  //       name: "Debited",
  //       icon: "ni ni-fat-remove text-blue",
  //       component: <Debited />,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/transactions/credited",
  //       name: "Credited",
  //       icon: "ni ni-fat-add text-blue",
  //       component: <Credited />,
  //       layout: "/admin"
  //     },
  //   ],
  // },

  // {
  //   path: "/AllTransactions",
  //   name: "All Transactions",
  //   icon: "fa-solid fa-money-bill-transfer",
  //   component: <AllTransactions/>,
  //   layout: "/admin",
  // },
  {
    path: "/CreditedTransactions",
    name: "Credited",
    icon: "fa-solid fa-money-bill-transfer",
    component: <CreditedTransactions/>,
    layout: "/admin",
  },
  {
    path: "/DebitedTransactions",
    name: "Debited",
    icon: "fa-solid fa-money-bill-transfer",
    component: <DebitedTransactions/>,
    layout: "/admin",
  },
 
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  

  {
    path: "/user-management",
    name: "User Management",
    icon: "ni ni-bullet-list-67 text-red",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  // {
  //   path: "/LoginPage",
  //   name: "LoginPage",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <LandPage/>,
  //   layout: "/admin",
  // },


 
  
];

export default routes;
