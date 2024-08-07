import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewHeader from 'components/Headers/NewHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import TransactionHeader from 'components/Headers/TransactionHeader';
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
  CardTitle,
} from "reactstrap";
import Toggle from 'react-toggle';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select'


const CreditedTransactions = () => {
  const [users, setUsers] = useState([]);


  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [uuid, setUuid] = useState('');
  const [paidto, setpaidto] = useState('');
  const [PaidOthers, setPaidOthers] = useState('');
  const [paidNumber, setPaidNumber] = useState('');
  const [utr, setUtr] = useState('');
  console.log(paidNumber, utr, "dfgdfhd5634gfd")
  const [image, setImage] = useState('');
  const [reason, setReason] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [otherType, setOtherType] = useState('');
  const [userdetails, setUserDetails] = useState('');
  const [userName, setUserName] = useState('');
  const [userName1, setUserName1] = useState('');
  const [options, setOptions] = useState('Accepted');
  const [comments, setComments] = useState('');
  const [Accepted, setAccepted] = useState('');
  const [CtrId, setCtrId] = useState('')
  console.log(options, "options");
  console.log(selectedOption, "selectedOption");


  const [amountError, setAmountError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [paidToError, setPaidToError] = useState('');
  const [paidNumberError, setPaidNumberError] = useState('');
  const [utrError, setUtrError] = useState('');
  const [imageError, setImageError] = useState('');
  const [otherTypeError, setOtherTypeError] = useState('');
  const [paidOthersError, setPaidOthersError] = useState('');
  const [commentsError, setCommentsError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [viewshow, setViewShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [users1, setUsers1] = useState('');
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [ViewuserData, setViewUserData] = useState('');
  console.log(ViewuserData, "ViewuserData");


  const handleClose = () => {
    setAmount('');
    setType('');
    setOtherType('');
    setpaidto('');
    setPaidOthers('');
    setPaidNumber('');
    setUtr('');
    setImage('');
    setAmountError('');
    setTypeError('');
    setOtherTypeError('');
    setPaidToError('');
    setPaidOthersError('');
    setPaidNumberError('');
    setUtrError('');
    setImageError('');
    setShow(false);
  }



  const handleShow = () => setShow(true);

  const viewhandleClose = () => {
    setViewShow(false);

  }



  const viewhandleShow = () => {
    setViewShow(true);
  }



  const handleview = (user) => {
    console.log(user, "vhf34f3hf");
    setViewUserData(user);
    viewhandleShow();
  }


  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);

    };
  }
  const validateUserName = (value) => {
    console.log(value?.target?.value, "value");
    setUserName(value?.target?.value)
    //   if (!userName) {
    //     setUserNameError("User name is required.");
    //     return false;
    //   }
    //   setUserNameError("");
    //   return true;
  };

  const validateUserName1 = (value) => {
    console.log(value, "value");
    setUserName1(value?.value)
    GetUsers(fromDate, toDate, value?.value);
    //   if (!userName) {
    //     setUserNameError("User name is required.");
    //     return false;
    //   }
    //   setUserNameError("");
    //   return true;
  };




  const edithandleClose = () => {
    setOptions('Accepted');
    setComments('');
    setCommentsError('');
    setEditShow(false);
  }


  const edithandleShow = () => setEditShow(true);
  const Ctrid = (id) => {
    console.log(id, 'cfgd');
    setCtrId(id?.uuid);
    edithandleShow();
    setOptions('Accepted');
    setComments('');


  }



  console.log(users, 'bhdbd');
  const userdata1 = JSON.parse(localStorage.getItem('token' || ''))

  const GetApi = () => {
    setLoading(true);

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/admin/dashboard`, {
      headers: {
        "x-auth-token": userdata1
      }
    })
      .then((res) => {
        console.log(res.data, 'cdid');
        setUsers1(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error!!!');
      })

  }

  const obj = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ]


  const userdata = JSON.parse(localStorage.getItem('token' || ''))
  console.log(userdata, 'cfdttrdrg');
  console.log(type, "typeee");
  const GetUsers = (startdate, enddate, username) => {
    setLoading(true)
    // e.preventDefault();
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit/admin/list?page=${pageNumber}&limit=10&search=&fromdate=${startdate}&todate=${enddate}&user_uuid=${username}`, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        setUsers(res?.data?.data);
        const Tpages = Math.ceil(res?.data?.count / 10);
        setTotalPages(Tpages || 0)
        console.log(res?.data, 'qowiwo');
        setLoading(false);
      })
      .catch((error) => {
        console.log("There is an error", error);
        setLoading(false);
      });
  };

  const HandleStartDate = (e) => {
    setFromDate(e.target.value)
    GetUsers(e.target.value, toDate, userName1)
  }

  const HandleEndDate = (e) => {
    setToDate(e.target.value)
    GetUsers(fromDate, e.target.value, userName1)
  }

  const UsersOption = []

  console.log(UsersOption, 'vhvhv');
  if (userdetails?.length > 0) {
    userdetails?.map((items) => {
      return UsersOption?.push({ label: items?.full_name, value: items?.uuid })
    })
  }




  


  const ModalForm = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!amount) {
      setAmountError("Please enter an amount.");
      isValid = false;
    }
    else if (isNaN(amount) && Number(amount) <= 10) {

      setAmountError('Amount must be positive number')
      isValid = false;

    }
    else {
      setAmountError('');
    }


    if (!type) {
      setTypeError("Please select a type.");
      isValid = false;
    } else {
      setTypeError('');
    }

    if (type === 'others' && !otherType) {
      setOtherTypeError("Please enter other type.");
      isValid = false;
    } else {
      setOtherTypeError('');
    }

    if (!paidto) {
      setPaidToError("Please select paid to.");
      isValid = false;
    } else {
      setPaidToError('');
    }

    if (paidto === 'Others' && !PaidOthers) {
      setPaidOthersError("Please enter other  paid to.");
      isValid = false;
    } else {
      setPaidOthersError('');
    }

    if (!paidNumber) {
      setPaidNumberError("Please enter  paid number.");
      isValid = false;
    }
    else if (!/^\d{10}$/.test(paidNumber)) {
      setPaidNumberError('Paid number must be 10 digits number')
    }

    else {
      setPaidNumberError('');
    }

    if (!utr) {
      setUtrError("Please enter a  UTR number.");
      isValid = false;
    } else if (/^\d*$/.test(utr)) {
      setUtrError(" ");
    }


    if (!image) {
      setImageError("Please upload an image.");
      isValid = false;
    } else {
      setImageError('');

    }

    if (options === 'Rejected' && !comments) {
      setCommentsError("Please enter comments for rejection.");
      isValid = false;
    } else {
      setCommentsError('');
    }

    if (!isValid) {
      return;
    }



    if (paidNumber.length === 10) {

      const payload =
      {
        "user_uuid": userName,
        "amount": amount,
        "type": type === 'others' ? otherType : type,
        "paid_to": paidto === 'Others' ? PaidOthers : paidto,
        "paid_number": paidNumber,
        "utr": utr,
        "image": image

      }
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit`, payload, {
        headers: {
          "x-auth-token": userdata
        }
      })
        .then((res) => {
          console.log(res?.data?.data, "kcdceji")
          setTimeout(() => {
            setLoading(false)
            GetUsers(fromDate, toDate, userName1);
            GetApi();
            setShow(false)
            handleClose();
            toast.success('Added Successfully')
          }, 1000)

        })
        .catch((error) => {
          console.log("it Might be an error")
          setLoading(false);
          toast.error('request unsuccessfull')
        })
    }

  }

  const handleDropdown = (select) => {
    console.log(select.target.value, 'fhgfgfh');
    setOptions(select.target.value)
  }


  const Dropdown = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/dropdown/list`)
      .then((res) => {
        console.log(res.data, "dropdown12");
        setUserDetails(res.data.data);
      })
      .catch((error) => {
        console.log("there is an error", error)
      })

  }

  function handleImage(e) {
    setImage(e.target.files[0])
    console.log(e.target.value);

  }


  const ImageUpload = (event) => {
    const data1 = event.target.files[0]
    const formData = new FormData();
    formData.append('file', data1);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/upload/image`, formData,
      {
        headers: {
          "x-auth-token": userdata
        }
      }
    )
      .then((res) => {
        console.log(res.data, "gfhdfhsgjhsgjh")
        setTimeout(() => {
          const filename = res.data.image.filename;
          setImage(filename);
        }, 1000)

      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const handleType = (e) => {
    const selectType = e.target.value;
    setType(selectType);
    if (selectType !== 'others') {
      setOtherType('');
    }
  }

  const handleOther = (e) => {
    const custom = e.target.value;
    setOtherType(custom);
  }

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPaidNumber(value);
      if (value?.length !== 10) {
        setPaidNumberError('Mobile number must be exactly 10 digits.');
      } else {
        setPaidNumberError('');
      }
    }
  };

  const handleUtr = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setUtr(value);

    }
  };



  const handlePaidTo = (e) => {
    const selectPaid = e.target.value;
    setpaidto(selectPaid);
    if (selectPaid !== "Others") {
      setPaidOthers('');
    }
  }

  const handlePaidOthers = (e) => {
    const selectCustom = e.target.value;
    setPaidOthers(selectCustom);
  }

  const HandleEdit = (e) => {
    e.preventDefault();
    const EditPayload =
    {
      // "credit_uuid": CtrId,
      "approved_status": options,
      "comments": comments

    }
    axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit/status/update/${CtrId}`, EditPayload, {

      headers: {
        "x-auth-token": userdata
      }

    })
      .then((res) => {
        console.log(res.data, "dropdown32");
        // setAccepted(res.data.data);
        setTimeout(() => {
          edithandleClose();
          GetUsers(fromDate, toDate, userName1);
          setEditShow(false);

        }, 1000)
        toast.success(res.data.message, {
          position: "top-right"
        })

      })
      .catch((error) => {
        console.log("there is an error", error);
        toast.error("Updated Failed!!", {
          position: 'top-right'
        })

      })
  }

  useEffect(() => {
    GetApi();
    GetUsers(fromDate, toDate, userName1);
    Dropdown();
  }, [pageNumber]);




  return (
    <>

      {/* <TransactionHeader/>   */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Credited
                        </CardTitle>
                        <span >
                          <small><i class="fa fa-inr" /></small> <strong> {loading ? <Spinner size="sm" /> : users1.totalCreditAmount} </strong>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-trend-up"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Today Credited
                        </CardTitle>
                        <span><small><i class="fa fa-inr" /></small> <strong>{loading ? <Spinner size="sm" /> : users1.todayCreditAmount}</strong></span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-trend-up"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last week</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* <h1>User Management</h1> */}

      <div  >


        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  {/* <span className="mb-0">Credited Money</span> */}
                  <div className='row'>
                    <div className='col-2'>
                      <input type='date' value={fromDate} onChange={HandleStartDate} />
                    </div>
                    <div className='col-3'>
                      <input type='date' value={toDate} onChange={HandleEndDate} style={{ marginLeft: "20px" }} />
                    </div>
                    <div className='col-3'>
                      <Select
                        className=''
                        options={UsersOption}
                        // value={userName1}
                        onChange={validateUserName1}
                        style={{ width: "150px", height: "40px" }}

                      />
                      {/* <option value="" disabled>Select User</option>

                      {UsersOption.length > 0 && UsersOption?.map((user) => {
                        return (
                          <option key={user.value} value={user.value} >
                            {user.label}
                          </option>
                        )
                      })}
                    </select> */}
                    </div>
                  </div>


                  {/* <button type='button' >ADD</button> */}
                  <Button variant="primary" style={{ float: "right" }} onClick={handleShow}>
                    Add Credit Amount
                  </Button>

                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Type</th>
                      <th scope='col'>Date</th>
                      <th scope="col">Paid To</th>
                      <th scope='col'>paid Number</th>
                      <th scope="col">UTR</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Image</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
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
                      users && users.length > 0 ? (
                        users.map((user, index) => {
                          console.log(user, 'bharath');
                          return (
                            <tr key={user._id}>
                              <td>{user?.user[0]?.full_name}</td>
                              <td>{user.amount}</td>
                              <td>{user.type}</td>
                              <td>{user.createdAt.slice(0, 10)}</td>
                              <td>{user.paid_to}</td>
                              <td>{user.paid_number}</td>
                              <td>{user.utr}</td>
                              <td>{user.approved_status}</td>
                              <td>
                                <img
                                  src={user.image}
                                  alt=""
                                  crossOrigin="anonymous"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() => handleview(user)}
                                >
                                  View
                                </Button>
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  disabled={user.approved_status !== "Pending"}
                                  onClick={() => Ctrid(user)}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          );
                        })

                      ) : (
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



      <Modal show={show} onHide={handleClose} animation={false} >
        <Modal.Header>
          {/* <h3>Credited Details</h3> */}
        </Modal.Header>
        <Modal.Body style={{ height: "100%" }}>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary shadow border-0" style={{ height: "100%" }}>
            <CardBody className="px-lg-5 py-lg-5"  >
              <Form role="form" onSubmit={ModalForm} style={{ marginTop: "-94px", paddingTop: "25px" }} >

                <FormGroup className="mb-3">
                  <label>User Name:</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={userName}
                      onChange={validateUserName}
                    >
                      <option value="" disabled>Select User</option>

                      {UsersOption.length > 0 && UsersOption?.map((user) => {
                        return (
                          <option key={user.value} value={user.value} >
                            {user.label}
                          </option>
                        )
                      })}
                    </select>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Amount:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Amount"
                      type="text"
                      autoComplete="amount"
                      value={amount}
                      maxLength={10}

                      onChange={handleAmountChange}


                    />

                  </InputGroup>
                  {amountError && <div style={{ color: 'red' }}>{amountError}</div>}

                </FormGroup>
                <FormGroup className="mb-3">
                  <label>PaidType:</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={type}
                      onChange={handleType}

                    >
                      <option value="disabled" type="disabled">Type:</option>
                      <option value="PhoenPay" >Phonepay</option>
                      <option value="Gpay">Gpay</option>
                      <option value="Cred">Cred</option>
                      <option value="Paytm">Paytm</option>
                      <option value="Cash">Cash</option>
                      <option value="others">others</option>
                    </select>

                  </InputGroup>
                  {typeError && <div style={{ color: 'red' }}>{typeError}</div>}
                </FormGroup>
                {type === 'others' && (
                  <div style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                    <label htmlFor="others">Others:</label>
                    <InputGroup className="input-group-alternative">
                      <input
                        id="inputBox"
                        type="text"
                        value={otherType}
                        onChange={handleOther}
                        placeholder="Enter Others"

                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '0px' }}

                      />
                    </InputGroup>
                    {otherTypeError && <div style={{ color: 'red' }}>{otherTypeError}</div>}
                  </div>


                )}

                <FormGroup className="mb-3">
                  <label>Paid To:</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={paidto}
                      onChange={handlePaidTo}
                    >
                      <option value="disabled" type="disabled"></option>
                      <option value="Bharath" >Bharath</option>
                      <option value="Sandeep">Sandeep</option>
                      <option value="Others">Others</option>
                    </select>

                  </InputGroup>
                  {paidToError && <div style={{ color: 'red' }}>{paidToError}</div>}
                </FormGroup>
                {paidto === 'Others' && (
                  <div style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                    <label htmlFor="others">Others:</label>
                    <InputGroup className="input-group-alternative">
                      <input
                        id="inputBox"
                        type="text"
                        value={PaidOthers}
                        onChange={handlePaidOthers}
                        placeholder="Enter Others"
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '0px' }}

                      />
                    </InputGroup>

                  </div>
                )}
                {paidOthersError && <div style={{ color: 'red' }}>{paidOthersError}</div>}
                <FormGroup>
                  <label>Mobile Number:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      value={paidNumber}
                      autoComplete="tel"

                      // minLength={10}
                      onChange={handleMobileChange}


                    />


                  </InputGroup>
                  {paidNumberError && <div style={{ color: 'red' }}>{paidNumberError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>UTR Number:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="UTR Number"
                      type="text"
                      value={utr}

                      onChange={handleUtr}

                    />

                  </InputGroup>
                  {utrError && <div style={{ color: 'red' }}>{utrError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>Image Screenshort:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      // placeholder="ScreenShort"
                      type="file"
                      onChange={ImageUpload}


                    />

                  </InputGroup>
                  {imageError && <div style={{ color: 'red' }}>{imageError}</div>}
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner style={{ width: "1rem", height: "1rem" }} className="spinner-border-custom" /> : 'save'}
                  </Button>
                  <Button variant="danger" onClick={handleClose} disabled={loading}>
                    Close
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Modal.Body>
      </Modal>


      {/* Edit modal */}

      <Modal show={editshow} onHide={edithandleClose} animation={false} >
        <Modal.Body style={{ height: "100%" }}>
          <Card className="bg-secondary shadow border-0 mt-4" style={{ height: "100%" }}>
            <CardBody className="px-lg-5 py-lg-5"  >
              <Form role="form" onSubmit={HandleEdit}>
                <FormGroup className="mb-3" style={{ marginTop: "-60px" }}>
                  <label>Status</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={options}
                      // options={obj}
                      onChange={handleDropdown}
                    >
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </InputGroup>
                </FormGroup>
                {options === 'Rejected' && (
                  <div>
                    <label htmlFor="Rejected">Comments</label>
                    <InputGroup className="input-group-alternative" >
                      <textarea
                        id="textarea"
                        type="text"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Enter Others"
                        style={{ width: "100%", border: "0px" }}
                        required

                      />
                      {commentsError && <div style={{ color: 'red' }}>{commentsError}</div>}
                    </InputGroup>
                  </div>
                )}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner style={{ width: "1rem", height: "1rem" }} className="spinner-border-custom" /> : 'save'}
                  </Button>
                  <Button variant="danger" onClick={edithandleClose}>
                    Close
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Modal.Body>
      </Modal>

      {/* view */}
      <Modal show={viewshow} onHide={viewhandleClose} animation={false} >
        <Modal.Header>
          {/* <h3>Credited Details</h3> */}
        </Modal.Header>
        <Modal.Body style={{ height: "100%" }}>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary shadow border-0" style={{ height: "100%" }}>
            <CardBody className="px-lg-5 py-lg-5"  >
              <Form role="form" style={{ marginTop: "-94px", paddingTop: "25px" }} >

                <FormGroup className="mb-3">
                  <label>User Name:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      className='form-control'
                      value={ViewuserData && ViewuserData?.user && ViewuserData?.user[0]?.full_name}
                      onChange={validateUserName}
                      disabled
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Amount:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Amount"
                      type="text"
                      autoComplete="amount"
                      value={ViewuserData?.amount}
                      maxLength={10}
                      disabled

                      onChange={handleAmountChange}


                    />

                  </InputGroup>
                  {amountError && <div style={{ color: 'red' }}>{amountError}</div>}

                </FormGroup>
                <FormGroup className="mb-3">
                  <label>PaidType:</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={ViewuserData?.type}
                      onChange={handleType}
                      disabled

                    >
                      <option value="disabled" type="disabled">Type:</option>
                      <option value="PhoenPay" >Phonepay</option>
                      <option value="Gpay">Gpay</option>
                      <option value="Cred">Cred</option>
                      <option value="Paytm">Paytm</option>
                      <option value="Cash">Cash</option>
                      <option value="others">others</option>
                    </select>

                  </InputGroup>
                  {typeError && <div style={{ color: 'red' }}>{typeError}</div>}
                </FormGroup>
                {type === 'others' && (
                  <div style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                    <label htmlFor="others">Others:</label>
                    <InputGroup className="input-group-alternative">
                      <input
                        id="inputBox"
                        type="text"
                        value={otherType}
                        onChange={handleOther}
                        placeholder="Enter Others"
                        disabled

                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '0px' }}

                      />
                    </InputGroup>
                    {otherTypeError && <div style={{ color: 'red' }}>{otherTypeError}</div>}
                  </div>


                )}

                <FormGroup className="mb-3">
                  <label>Paid To:</label>
                  <InputGroup className="input-group-alternative">
                    <select
                      className='form-control'
                      value={ViewuserData.paid_to}
                      onChange={handlePaidTo}
                      disabled
                    >
                      <option value="disabled" type="disabled"></option>
                      <option value="Bharath" >Bharath</option>
                      <option value="Sandeep">Sandeep</option>
                      <option value="Others">Others</option>
                    </select>

                  </InputGroup>
                  {paidToError && <div style={{ color: 'red' }}>{paidToError}</div>}
                </FormGroup>
                {paidto === 'Others' && (
                  <div style={{ padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                    <label htmlFor="others">Others:</label>
                    <InputGroup className="input-group-alternative">
                      <input
                        id="inputBox"
                        type="text"
                        value={PaidOthers}
                        onChange={handlePaidOthers}
                        placeholder="Enter Others"
                        required
                        disabled
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '0px' }}

                      />
                    </InputGroup>

                  </div>
                )}
                {paidOthersError && <div style={{ color: 'red' }}>{paidOthersError}</div>}
                <FormGroup>
                  <label>Mobile Number:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      value={ViewuserData.paid_number}
                      autoComplete="tel"
                      disabled

                      // minLength={10}
                      onChange={handleMobileChange}


                    />


                  </InputGroup>
                  {paidNumberError && <div style={{ color: 'red' }}>{paidNumberError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>UTR Number:</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="UTR Number"
                      type="text"
                      value={ViewuserData.utr}
                      disabled

                      onChange={handleUtr}

                    />

                  </InputGroup>
                  {utrError && <div style={{ color: 'red' }}>{utrError}</div>}
                </FormGroup>
                <FormGroup>
                  <label>Image Screenshort:</label>
                  {/* <InputGroup className="input-group-alternative">
                    <Input
                      // placeholder="ScreenShort"
                      type="file"
                      onChange={ImageUpload}
                      disabled
                    />
                  </InputGroup> */}
                  <br />
                  <img src={ViewuserData.image} alt='' crossOrigin='anonymous' style={{ height: "50px", width: "50px" }} />
                  {imageError && <div style={{ color: 'red' }}>{imageError}</div>}
                </FormGroup>
                <div className="text-center">
                  <Button variant="danger" onClick={viewhandleClose} disabled={loading}>
                    Close
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Modal.Body>
      </Modal>

    </>
  )
}
export default CreditedTransactions;


