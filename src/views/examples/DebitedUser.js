import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Debited_User from 'components/Headers/Debited_User';
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
import Spinner from 'react-bootstrap/Spinner';


export default function DebitedUser() {
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState('');
  const [otherType, setOtherType] = useState('');
  const [image, setImage] = useState('');


  const userdata = JSON.parse(localStorage.getItem('token' || ''))
  console.log(userdata, 'cfdttrdrg');

  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true)
    // e.preventDefault();
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/debit/list?page=${pageNumber}&limit=10&search=`, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        setUsers(res?.data?.data);
        console.log(res?.data.data, "zooo")
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
    getUsers();
  }, [pageNumber])


  const [Editshow, setEditShow] = useState(false);

  const EdithandleClose = () => setEditShow(false);
  const EdithandleShow = () => setEditShow(true);



  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleEdit = (user) => {
    console.log(user, 'feefd')
    setEditUser(user);
    setPurpose(user.purpose);
    setType(user.type);
    setImage(user.image);
    setAmount(user.amount);
    setShow(true);
  }


  const HandleDebited = () => {

    setEditUser(null);
    setPurpose('');
    setType('');
    setImage('');
    setAmount('');
    setShow(true);
  }



  const ModalForm = (e) => {
    e.preventDefault();

    const Postpayload =
    {
      "purpose": purpose,
      "amount": amount,
      "bill": image,
      "type": type === 'others' ? otherType : type

    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/debit`, Postpayload, {
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

  const EditModal = (e) => {
    const putPayload = {
      "purpose": purpose,
      "amount": amount,
      "bill": image,
      "type": type

    }

    e.preventDefault();
    axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/debit/update/${editUser.uuid}`, putPayload, {
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
      .catch((error) => {
        console.log("there might be a error", error);
      });



  }



  const handleType = (e) => {
    const selectType = e.target.value;
    setType(selectType);
    if (selectType !== 'others') {
      setOtherType('');
    }

  }
  const HandleOther = (e) => {
    const custom = e.target.value;
    setOtherType(custom);
  }
  const ImageUpload = (event) => {
    const data1 = event.target.files[0]
    const formData = new FormData();
    formData.append('file', data1);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/upload/image`, formData, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        console.log(res.data, "qwoeowi")
       setTimeout(()=>{
        const filename = res.data.image.filename;
        setImage(filename);
       },1000)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }





  return (
    <>

      <Debited_User />

      {/* <h1>User Management</h1> */}

      <div  >


        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <span className="mb-0">Debited Money</span>

                  {/* <button type='button' >ADD</button> */}
                  {/* <Button variant="primary" style={{ float: "right" }} onClick={HandleDebited}>
                    ADD
                  </Button> */}
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">purpose</th>
                      <th scope='col'>PaidBy</th>

                      <th scope="col">Amount</th>

                      <th scope='col'>Type</th>

                      <th scope="col">Payment Document</th>
                      {/* <th scope='col'>Action</th> */}
                      {/* <th scope="col">Status</th>
                      <th scope="col">Action</th> */}

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
                            <td>{user.purpose}</td>
                            <td>Admin</td>
                            <td>{user.amount}</td>
                            <td>{user.type}</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <img
                                  src={user.bill}
                                  alt=""
                                  crossOrigin="anonymous"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </Badge>
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
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ maxHeight: '500px' }}>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary shadow border-0" style={{ maxHeight: '500px' }}>
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <large>Debited Details </large>
              </div>
              <div className="btn-wrapper text-center">
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5" >

              <Form role="form" onSubmit={ModalForm} style={{ marginTop: "-110px" }} >
                <FormGroup className="mb-3">
                  <label> Amount:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon>
                     */}
                    <Input
                      // placeholder="Amount"
                      type="text"
                      autoComplete="Amount"
                      value={amount}
                      onChange={handleAmountChange}
                      required

                    />
                  </InputGroup>
                </FormGroup>
                {/*  */}

                <FormGroup className="mb-3">
                  <label>Purpose:</label>
                  <InputGroup className="input-group-alternative" >
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <textarea
                      // placeholder="Reason"
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      style={{ width: "100%", border: "0px", height: '43px', borderRadius: '32px' }}
                      required

                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <label> Type:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <select
                      className='form-control'
                      value={type}
                      onChange={handleType}


                    >
                      <option >Payment Type</option>
                      <option value="PhoenPay" >Phonepay</option>
                      <option value="Gpay">Gpay</option>
                      <option value="Cred">Cred</option>
                      <option value="Paytm">Paytm</option>
                      <option value="Cash">Cash</option>
                      <option value="others">others</option>
                    </select>


                  </InputGroup>

                </FormGroup>
                {type === 'others' && (
                  <div>
                    <label htmlFor="others">Others:</label>
                    <input
                      id="inputBox"
                      type="text"
                      value={otherType}
                      onChange={HandleOther}
                      placeholder="Others"
                      required
                    />
                  </div>
                )}

                <FormGroup>
                  <label>Payment Proof:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open " />
                      </InputGroupText>
                    </InputGroupAddon> */}

                    <Input
                      placeholder="ScreenShort"
                      type="file"
                      onChange={ImageUpload}
                      required
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
                  <Button className="my-4" color="primary" type="submit" >
                    Save
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
        <Modal.Footer>
        </Modal.Footer>
      </Modal>


      <Modal show={Editshow} onHide={EdithandleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ maxHeight: '500px' }}>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary shadow border-0" style={{ maxHeight: '500px' }}>
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <large>Debited Details </large>
              </div>
              <div className="btn-wrapper text-center">
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5" >

              <Form role="form" onSubmit={EditModal} style={{ marginTop: "-110px" }} >
                <FormGroup className="mb-3">
                  <label> Amount:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon>
                     */}
                    <Input
                      // placeholder="Amount"
                      type="text"
                      autoComplete="Amount"
                      value={amount}
                      onChange={handleAmountChange}
                      required

                    />
                  </InputGroup>
                </FormGroup>
                {/*  */}

                <FormGroup className="mb-3">
                  <label>Purpose:</label>
                  <InputGroup className="input-group-alternative" >
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <textarea
                      // placeholder="Reason"
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      style={{ width: "100%", border: "0px", height: '43px', borderRadius: '32px' }}
                      required

                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <label> Type:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fa-solid fa-file-signature" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <select
                      className='form-control'
                      value={type}
                      onChange={handleType}


                    >
                      <option >Payment Type</option>
                      <option value="PhoenPay" >Phonepay</option>
                      <option value="Gpay">Gpay</option>
                      <option value="Cred">Cred</option>
                      <option value="Paytm">Paytm</option>
                      <option value="Cash">Cash</option>
                      <option value="others">others</option>
                    </select>


                  </InputGroup>

                </FormGroup>
                {type === 'others' && (
                  <div>
                    <label htmlFor="others">Others:</label>
                    <input
                      id="inputBox"
                      type="text"
                      value={otherType}
                      onChange={HandleOther}
                      placeholder="Others"
                      required
                    />
                  </div>
                )}

                <FormGroup>
                  <label>Payment Proof:</label>
                  <InputGroup className="input-group-alternative">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open " />
                      </InputGroupText>
                    </InputGroupAddon> */}

                    <Input
                      placeholder="ScreenShort"
                      type="file"
                      onChange={ImageUpload}
                      required
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
                  <Button className="my-4" color="primary" type="submit" >
                    Save
                  </Button>
                  <Button variant="danger" onClick={EdithandleClose}>
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
        <Modal.Footer>



        </Modal.Footer>
      </Modal>


    </>
  );
}

