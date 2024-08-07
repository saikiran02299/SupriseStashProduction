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
  FormFeedback,
} from "reactstrap";
import Toggle from 'react-toggle';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { invalid } from 'moment';
// import Select from 'react-select/dist/declarations/src/Select';
import Select from 'react-select'
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function UserManagement() {
  const [users, setUsers] = useState([]);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const [firstError, setFirstError] = useState('');
  const [lastError, setLastError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [option,setOptions] = useState("");


  const [validated, setValidated] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setFirstError('');
    setLastError('');
    setEmailError('');
    setMobileError('');
    setShow(false);
  }
  const handleShow = () => setShow(true);



  const [editshow, setEditShow] = useState(false);

  const EdithandleClose = () => {

    setFirstError('');
    setLastError('');
    setEmailError('');
    setMobileError('');

    setEditShow(false);

  }
  const EdithandleShow = () => setEditShow(true);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;

    setFirstName(value);


    if (/^[A-Za-z@_-]*$/.test(value)) {
      if (value.length > 3 && value.length <= 15) {
        setFirstError('');
      } else {
        setFirstError('First name must be greater than 3 characters and less than or equal to 15 characters.');
      }
    } else {
      setFirstError('First name must contain only letters, @, _, or -.');
    }
  };



  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value)
    if (/^[A-Za-z@_-]*$/.test(value)) {
      if (value.length > 3 && value.length <= 15) {
        setLastError('');
      } else {
        setLastError('last name must be greater than 3 characters and less than or equal to 15 characters.');
      }
    } else {
      setLastError('last name must contain only letters, @, _, or -.');
    }
  };



  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(value)) {
      setEmail(value);
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
      if (value.length!==10) {
        setMobileError('Mobile number must be exactly 10 digits.');

      } else {
        setMobileError('');
      }
    }
  };



  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false);

  const userdata = JSON.parse(localStorage.getItem('token' || ''))
  console.log(userdata, 'cfdttrdrg');
  const getUsers = (vishal) => {
    setLoading(true)
    // e.preventDefault();
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/list?page=${pageNumber}&limit=10&search=&active=${vishal}`, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        setUsers(res?.data?.data);
        const Tpages = Math.ceil(res?.data?.count / 10);
        setTotalPages(Tpages || 0)
        setLoading(false)
      })
      .catch((error) => {
        console.log("There is an error", error);
        setLoading(false)
      });
  };
  useEffect(() => {
    getUsers(option);

  }, [pageNumber])

  const handleEdit = (user) => {
    console.log(user, 'ucosd')
    setEditUser(user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setMobile(user.mobile);
    setEditShow(true);
  }

  const HandleAdd = () => {
    setEditUser(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
    setShow(true);
  }


  const UsersOption=[
    {label:"Active Users",value:true},
    {label:"Inactive Users",value:false}
  ]

  const HandleUserOption=(event)=>{
    console.log(event,"2fef3d");
    
    setOptions(event?.value);
    getUsers(event?.value);
   

  }

  const ModalForm = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      e.stopPropagation();

      let isValid = true;

      if (!firstName) {
        setFirstError('please enter the firstName')
        isValid = false;
      }
      else {
        setFirstError('');
      }
      if (!lastName) {
        setLastError('please enter the lastName')
        isValid = false;

      }
      else {
        setLastError('');
      }

      if (!email) {
        setEmailError('please enter the email');
        isValid = false;
      }
      else {
        setEmailError('');
      }

      if (!mobile) {
        setMobileError('please enter the mobile Number')
        isValid = false;
      }
      else {
        setMobileError('');
      }

      if(mobile.length===10)
        {
      const payload = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "mobile": mobile
      }
      setLoading(true);

      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/register`, payload, {
        headers: {
          "x-auth-token": userdata
        }
      })
        .then((res) => {
          console.log(res, "gfadchfgsx")
          setTimeout(() => {
            setLoading(false);
            setShow(false);
            handleClose();
            getUsers(option);
            toast.success('successfully Added');
          }, 1000)
        
        })
        .catch((error) => {
          console.log("it Might be an error");
          setLoading(false);
        })
      }
    }
    setValidated(true);
  }

  const ModalEdit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      e.stopPropagation();
     
      const putPayload = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "mobile": mobile
      }
      setLoading(true)
      axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update/${editUser.uuid}`, putPayload, {
        headers: {
          "x-auth-token": userdata
        }
      })
        .then((res) => {
          console.log(res, "gfadchfgsx")
          toast?.success(res?.data?.message, {
            position: "top-right"
          })
          setTimeout(() => {
            setEditShow(false);
            getUsers(option);
            setLoading(false);
          }, 1000)
        })
        .catch((error) => {
          console.log("there might be a error", error);
          setLoading(false)
          toast?.error(error?.response?.data?.message, {
            position: "top-right"
          })
        });
    }
    setValidated(true);
  }

  const handleCheck = (type) => {
    console.log(type, "hsgsahgdxhsa");
    // ?.is_active
    const togglePayload = {
      status: type?.is_active === true ? false : true
    }

    axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update/status/${type?.uuid}`, togglePayload, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        // console.log(res.data.is_active, 'checkbox')
        // setIsActive(res.data.is_active)
        toast.success('Status Updated !', {
          position: "top-right",
          duration: 1000
        })
        setTimeout(() => {
          getUsers(option);
        }, 1000)
      })
      .catch((error) => {
        console.error('Error toggling user status:', error);
      });

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
                  <span className="mb-0">User Management</span>
                  <div className='row'>
                  <div className='col-12 col-lg-3'>
                  <Select
                  className=''
                  options={UsersOption}
                  onChange={HandleUserOption}
                  />
                  </div>
                  </div>
               

                  {/* <button type='button' >ADD</button> */}
                  <Button variant="primary" style={{ float: "right" }} onClick={HandleAdd}>
                    ADD
                  </Button>
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

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <Spinner animation="border" />
                        </td>
                      </tr>
                    ) : (
                      users && users.length>0?(
                      users.map((user, index) => {
                        console.log(user, 'vgftrfyg');
                        return (
                          <tr key={user._id}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <a
                                  className="avatar rounded-circle mr-3"
                                  style={{ backgroundColor: 'black', height: '30px', width: '30px' }}
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {user.full_name.charAt(0).toUpperCase()}
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
                              <input
                                type="checkbox"
                                checked={user?.is_active}
                                onChange={() => handleCheck(user)}
                              />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <Button color="primary" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })

                    ):(
                       <tr>
                      <td colSpan="8" className="text-center">Data not found</td>
                      </tr>
                    )
                    )}
                  </tbody>

                </Table>

                {/* <span className="text-center">
                  {loading && <Spinner animation="border" />}
                </span> */}
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className={pageNumber === 0 ? "disabled" : ''}>
                        <PaginationLink
                          // href="#pablo"

                          onClick={(e) => setPageNumber(pageNumber - 1)}
                        // tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                        // href="#pablo"
                        // onClick={(e) => e.preventDefault()}
                        >
                          {pageNumber + 1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className={pageNumber + 1 === totalPages ? "disabled" : ''}>
                        <PaginationLink
                          // href="#pablo"
                          onClick={(e) => setPageNumber(pageNumber + 1)}

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
        {/* <Modal.Haeder closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary  shadow border-0">
       
            <CardBody className="px-lg-5 py-lg-1">

              <Form role="form" noValidate validated={validated} onSubmit={ModalForm} >
                <FormGroup className="mb-3">
                  <label>FirstName</label>
                  <InputGroup className="input-group-alternative">
                    {/* <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    /> */}
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      minLength={3}
                      maxLength={15}
                      onChange={handleFirstNameChange}
                    />
                    <FormFeedback>{firstError || 'Please provide a valid first name.'}</FormFeedback>
                  </InputGroup>
                  {firstError && <div style={{ color: 'red' }}>{firstError}</div>}
                </FormGroup>
                {/*  */}

                <FormGroup className="mb-3">
                  <label>LastName</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="LastName"
                      type="text"
                      autoComplete="LastName"
                      value={lastName}
                      minLength={3}
                      maxLength={15}
                      onChange={handleLastNameChange}


                    />

                  </InputGroup>
                  {lastError && <div style={{ color: "red" }}>{lastError}</div>}
                </FormGroup>



                <FormGroup className="mb-3">
                  <label>Email</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="Email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}

                    />
                  </InputGroup>
                  {emailError && <div style={{ color: "red" }}>{emailError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>Mobile Number</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i className="ni ni-lock-circle-open " />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="Mobile Number"
                      type="text"
                      value={mobile}
                      onChange={handleMobileChange}

                    />
                  </InputGroup>
                  {mobileError && <div style={{ color: "red" }}>{mobileError}</div>}
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
                  <Button className="my-4" color="primary" type="submit"  disabled={loading}>
                  {loading ? <Spinner style={{ width: "1rem", height: "1rem" }} className="spinner-border-custom" /> : 'save'}
                  </Button>
                  <Button variant="danger" onClick={handleClose}> 
                    Close
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
      </Modal>

      <Modal show={editshow} onHide={EdithandleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary  shadow border-0">
            <CardBody className="px-lg-5 py-lg-1">

              <Form role="form" noValidate validated={validated} onSubmit={ModalEdit} >
                <FormGroup className="mb-3">
                  <label>FirstName</label>
                  <InputGroup className="input-group-alternative">
                    {/* <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    /> */}
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    // invalid
                    />
                    <FormFeedback>{firstError || 'Please provide a valid first name.'}</FormFeedback>
                  </InputGroup>
                  {firstError && <div style={{ color: 'red' }}>{firstError}</div>}
                </FormGroup>
                {/*  */}

                <FormGroup className="mb-3">
                  <label>LastName</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="LastName"
                      type="text"
                      autoComplete="LastName"
                      value={lastName}
                      onChange={handleLastNameChange}


                    />

                  </InputGroup>
                  {lastError && <div style={{ color: "red" }}>{lastError}</div>}
                </FormGroup>



                <FormGroup className="mb-3">
                  <label>Email</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="Email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}

                    />
                  </InputGroup>
                  {emailError && <div style={{ color: "red" }}>{emailError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>Mobile Number</label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i className="ni ni-lock-circle-open " />
                      </InputGroupText> */}
                    </InputGroupAddon>
                    <Input
                      // placeholder="Mobile Number"
                      type="text"
                      value={mobile}
                      onChange={handleMobileChange}

                    />
                  </InputGroup>
                  {mobileError && <div style={{ color: "red" }}>{mobileError}</div>}
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
                  <Button className="my-4" color="primary" type="submit" >
                  {loading ? <Spinner style={{ width: "1rem", height: "1rem" }} className="spinner-border-custom" /> : 'save'}
                  </Button>
                  <Button variant="danger" onClick={EdithandleClose} >
                    Close
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
      </Modal>







    </>
  );
}
