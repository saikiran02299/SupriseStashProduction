// /*!

// =========================================================
// *Surprise Stash React - v1.2.4
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2024 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// // reactstrap components
// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Button,
//   Card,
//   CardTitle,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Label,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
// } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { error } from "ajv/dist/vocabularies/applicator/dependencies";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('')
//   const userdata = JSON.parse(localStorage.getItem('token' || ''))

//   const handleForgot=(e)=>{
   
//     const payload={
//       "email" :email
//     }
//     axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/forgot/password`,payload,{
//       headers: {
//         "x-auth-token": userdata
//       }
//     })
//     .then((res)=>{
//       console.log(res);

//     })
//     .catch((error)=>{
//       console.log("error!!!!");
//     })
    
//   }


//   return (
//     <Card style={{ width: '25rem', margin: '20px auto', padding: '20px' }}>
//       <CardBody>
//         <CardTitle tag="h5" className="text-center">Forgot Password</CardTitle>
//         <Form onSubmit={handleForgot}>
//           <FormGroup>
//             <Label for="email">Email</Label>
//             <Input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </FormGroup>
//           <Button color="primary" type="submit">Submit</Button>
//         </Form>
//       </CardBody>
//     </Card>
//   );
// };

// export default ForgotPassword;
