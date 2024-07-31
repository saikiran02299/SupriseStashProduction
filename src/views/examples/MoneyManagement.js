import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewHeader from 'components/Headers/NewHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import Toggle from 'react-toggle';
import { toast } from 'react-toastify';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';


export default function MoneyManagement() {
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [value,setValue]=useState("");
  const [options,setOptions]=useState('');

  const HandleMobile=(event)=>{
    setMobile(event.target.value);
  const  isValidLength= event.target.value.length === 10;
  if(!isValidLength)
    {
      toast.error("please enter 10 digits number");
    }
  };

  const userdata = JSON.parse(localStorage.getItem('token' || ''))
  console.log(userdata, 'cfdttrdrg');
  const getUsers = () => {
    // e.preventDefault();
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/list?page=&limit=&search=`)
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((error) => {
        console.log("There is an error", error);
      });
  };
  useEffect(() => {
    getUsers();
    Dropdown();
  }, [])

  const handleEdit = ( user) => {
console.log(user,'ucosd')
    if (user) {
      setEditUser(user);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
    else {
      setEditUser(null);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMobile('');

    }
    setShow(true);

  }

  const Dropdown=()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/dropdown/list`)
    .then((res)=>{
    console.log(res.data,"ndsnv");
    setValue(res.data.data);
    })
    .catch((error)=>{
      console.log("there is an error",error)
    })
  
  }




  const ModalForm = (e) => {
    e.preventDefault();
    const putPayload =
    {
      "first_name":firstName,
      "last_name":lastName,
      "email":email,
      "mobile":mobile

    }
    if (editUser)

       {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update/${editUser.uuid}`, putPayload, {
        headers: {
          "x-auth-token": userdata
        }
      })
        .then((res) => {
          console.log(res?.data?.data)
          setTimeout(() => {
            getUsers();
            setShow(false);
          }, 1000)


        })
        .catch((error)=>{
          console.log("there might be a error",error);
        });

    }
    else {
      const payload =
      {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "mobile": mobile
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/register`, payload, {
        headers: {
          "x-auth-token": userdata
        }
      })
        .then((res) => {
          console.log(res?.data?.data)
          setTimeout(() => {
            getUsers();
            setShow(false)
          }, 1000)

        })
        .catch((error) => {
          console.log("it Might be an error")
        })
    }







  }
  return (
    <>

      <NewHeader />

      {/* <h1>User Management</h1> */}

      <div  >


        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <span className="mb-0">Card tables</span>

                  {/* <button type='button' >ADD</button> */}
                  <Button variant="primary" style={{ float: "right" }} onClick={handleShow}>
                    ADD
                  </Button>

                  {/*  */}
                  <>
                   <select onChange={(e)=>setOptions(e.target.value)}style={{marginLeft:"30px"}}>
                    {Array.isArray(value) && value.map((item)=>
                    <option key={item.uuid}>{item.first_name}</option> 
                    )}
                   </select>
                   <select onChange={(e)=>setOptions(e.target.value)} style={{marginLeft:"30px"}}>
                    <option>Accepted</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                   </select>
                   </>
                 
           
         

                  
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">FullName</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  {users?.map((user, index) => {
                    console.log(user, 'vgftrfyg');
                    return (
                      <tbody>
                        <tr key={user._id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={require("../../assets/img/theme/bootstrap.jpg")}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {user.full_name}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{user.email}</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">

                              {user.mobile}
                            </Badge>
                          </td>
                          <td>
                            <Toggle
                              defaultChecked={user.is_active
                              }
                              icons={false}
                              onChange={(e) => {
                                const updatedUser = {
                                  ...user, is_active
                                    : e.target.checked
                                };
                                console.log(updatedUser);
                                // Handle the toggle change, e.g., update state or make an API call
                              }}
                            />

                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button color="primary" size="sm" onClick={()=>handleEdit(user)}>Edit</Button>{' '}

                              
                            </div>
                          </td>

                        </tr>
                        <tr>

                        </tr>
                      </tbody>
                    )
                  })
                  }
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>

        </Container>

        {/*  */}

      </div>



      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <large>ADD USER </large>
              </div>
              <div className="btn-wrapper text-center">
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">

              <Form role="form" onSubmit={ModalForm} >
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="FirstName"
                      type="text"
                      autoComplete="FirstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}

                    />
                  </InputGroup>
                </FormGroup>  
                {/*  */}

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="LastName"
                      type="text"
                      autoComplete="LastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}

                    />
                  </InputGroup>
                </FormGroup>



                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open " />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      pattern="[0-9]{10}" // Basic pattern for 10 digits (adjust if needed)
                      name="phone number"
                      autoComplete="tel" // Improved autocompletion for mobile numbers
                      value={mobile}
                      onChange={HandleMobile}
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
          {/* </Col> */}
        </Modal.Body>
        <Modal.Footer>
          
{/*           
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>  */}
        </Modal.Footer>
      </Modal>

    </>
  );
}
