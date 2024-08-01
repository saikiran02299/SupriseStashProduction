import Login from "components/Footers/AuthFooter";
import Auth from "layouts/Auth";
import React from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Toast from "reactstrap";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNavbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isactive');
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('role');
    setTimeout(() =>{
      navigate('/auth/Login');
    }, 1000)
  };

  const Name = localStorage.getItem('Name');
  const userdata1= Name ? JSON.parse(Name) : null;
  const UserName = JSON.parse(localStorage.getItem('Name'));
  const user = JSON.parse(localStorage.getItem('user'));
  const userid=JSON.parse(localStorage.getItem('userid'));

  console.log(user,"efner23r2");

  const userdata = JSON.parse(localStorage.getItem('token' || ''))


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[oldPassword,setOldpassword]=useState('');
  const[newPassword,setNewPassword]=useState('');
  const[conformPassword,setConformPassword]=useState('');
  const[oldError,setOldError]=useState('');
  const[newError,setNewError]=useState('');
  const[conformError,setConformError]=useState('');

 const handleConform=(e)=>{
  console.log(e.target.value,"xhfghfghfg5657")
  const value=e.target.value;
      setConformPassword(value);
 }
  const HandleChangeClose=()=>{
    setOldError('');
    setNewError('');
    setConformError('');
    setShow(false);
  }




  const ChangeFunction=(e)=>{
   e.preventDefault();

   let isValid=true;
   if(!oldPassword)
   {
      setOldError( "please enter the Old Password");
      isValid=false;
   }
   else
   {
    setOldError('');
   }

   if(!newPassword)
   {
    setNewError("please enter the new Password");
    isValid=false;
   }
   else
   {
    setNewError('');
   }
   if(!conformPassword)
   {
    setConformError("enter the conform password");
    isValid=false;
   }
   else
   {
    setConformError('');
   }

   
   

   if(user.data.role==='user')
   {
    if(newPassword===conformPassword)
    {
   const changePayload={
    
    "oldPassword" : oldPassword,
    "newPassword" : newPassword

 }
     
   axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/change/password/${userid}`,changePayload,{

    headers: {
      "x-auth-token": userdata
    }

  })

   .then((res)=>{
     console.log(res,"vfvj");
     setTimeout(()=>{
      setShow(false);
      toast?.success('Password Successfully Changed',{
        position:"top-right"
      })
      handleLogout();
      HandleChangeClose();

     },1000)
     
   })
   .catch((error)=>{
    console.log("there might be an error");
    setTimeout(()=>{
     toast.error("Unsuccessfull Changes!!!")
    },1000)
    
   })
  }
  else{
    toast.warning('password and conformpassword are not same');
  }
  }
  else
  {
    
    if(newPassword===conformPassword)
    {
    const changePayload={
    
      "oldPassword" : oldPassword,
      "newPassword" : newPassword
  
   }
  
     axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/change/password/${userid}`,changePayload,{
  
      headers: {
        "x-auth-token": userdata
      }
  
    })
  
     .then((res)=>{
       console.log(res,"vfvj");
       setTimeout(()=>{
        toast?.success('Password Successfully Changed',{
          position:"top-right"
        })
        handleLogout();
  
       },1000)
       
     })
     .catch((error)=>{
      console.log("there might be an error");
      setTimeout(()=>{
       toast.error("Unsuccessfull Changes!!!")
      },1000)
      
     })
    }
    else
    {
      toast.warning("password and conform password are not same")
    }
    }

  }
  
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length>4 && value.length<=10) {
      setNewPassword(value);
      setNewError('');
    } else {
      setNewError('The password must be 5 characters');
    }
  };

  const handleConformPasswordChange = (e) => {
    const value = e.target.value;
    setConformPassword(value);
    if (value.length>4 && value.length<=10) {
      setConformPassword(value);
      setConformError('');
    } else {
      setConformError('The password must be 5 characters');
    }
  };


  



  


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link> */}
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              {/* <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup> */}
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}

                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {UserName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
             
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to={user?.data?.role==='management'? '/admin/user-profile':'/user/ProfileUser'} tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {user?.data?.role==='user'?(
                <DropdownItem  onClick={handleShow}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Change Password</span>
                </DropdownItem> 
                ):""}
               
                <DropdownItem divider />
                <DropdownItem  onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>

     

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <Modal.Haeder closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary  shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h3>Change password</h3>
              </div>
              <div className="btn-wrapper text-center">
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-1">

              <Form role="form" onSubmit={ChangeFunction} >
                <FormGroup className="mb-3">
                  <label>Old Password</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="password"
                      id="password"
                      name="Old Password"
                      value={oldPassword}
                      // minLength={3}
                      // maxLength={15}
                      onChange={(e)=>setOldpassword(e.target.value)}
                    />
                    
                  </InputGroup>
                  {oldError && <div style={{ color: 'red' }}>{oldError}</div>}
                </FormGroup>
                {/*  */}

                <FormGroup className="mb-3">
                  <label>New Password</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="LastName"
                      type="Password"
                      autoComplete="New Password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      minLength={4}
                      maxLength={10}

                      

                    />

                  </InputGroup>
                  {newError && <div style={{ color: "red" ,fontSize:"12px" }}>{newError}</div>}
                </FormGroup>



                <FormGroup className="mb-3">
                  <label>Conform Password</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input
                      type="Password"
                      // value={conformPassword}
                      onChange={handleConformPasswordChange}
                      minLength={4}
                      maxLength={10}
                    />
                  </InputGroup>
                  {conformError && <div style={{ color: "red",fontSize:"12px" }}>{conformError}</div>}
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="danger" onClick={HandleChangeClose}>
                    Close
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
      
        </Modal.Body>
        <Modal.Footer>



        </Modal.Footer>
      </Modal>

    </>
  );
};

export default AdminNavbar;
