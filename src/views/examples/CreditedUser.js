import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Transaction_User from 'components/Headers/Transaction_User';
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

export default function CreditedUser() {
    const [users, setUsers] = useState([]);


    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [uuid, setUuid] = useState('');
    const [paidto, setpaidto] = useState('');
    const [PaidOthers, setPaidOthers] = useState('');
    const [paidNumber, setPaidNumber] = useState('');
    const [utr, setUtr] = useState('');
    const [image, setImage] = useState('');
    const [reason, setReason] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [otherType, setOtherType] = useState('');
    const [userdetails, setUserDetails] = useState('');
    const [userUUId, setUserUuid] = useState('');
    const [options, setOptions] = useState('Accepted');
    const [comments, setComments] = useState('');
    const [Accepted, setAccepted] = useState('');
    const [CtrId, setCtrId] = useState('');
    const [newComments, setNewComments] = useState('');

    const [updatedetails, setUpdateDetails] = useState('');


    const [amountError, setAmountError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [paidToError, setPaidToError] = useState('');
    const [paidNumberError, setPaidNumberError] = useState('');
    const [utrError, setUtrError] = useState('');
    const [imageError, setImageError] = useState('');
    const [otherTypeError, setOtherTypeError] = useState('');
    const [paidOthersError, setPaidOthersError] = useState('');
    const [commentsError, setCommentsError] = useState('');

    const [show, setShow] = useState(false);

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

    console.log(options, "options");
    console.log(selectedOption, "selectedOption");
    const [editshow, setEditShow] = useState(false);

    const edithandleClose = () => {
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

    const obj = [
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
    ]

    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false);
    const userdata = JSON.parse(localStorage.getItem('token' || ''))
    console.log(userdata, 'cfdttrdrg');
    console.log(type, "typeee");

    const userid = localStorage.getItem('userid');
    const Loginuuid = userid ? JSON.parse(userid) : null;
    const getUsers = () => {
        setLoading(true);
        // e.preventDefault();
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit/user/list?page=${pageNumber}&limit=10&search=&user_uuid=${Loginuuid}`, {
            headers: {
                "x-auth-token": userdata
            }
        })
            .then((res) => {
                setUsers(res?.data?.data || []);
                const Tpages = Math.ceil(res?.data?.count / 10);
                setTotalPages(Tpages || 0)
                console.log(res?.data, 'kohli');
                setLoading(false);
            })
            .catch((error) => {
                console.log("There is an error", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getUsers();
        Dropdown();
    }, [pageNumber])

    //   const UsersOption = []

    //   if (userdetails?.length > 0) {
    //     userdetails?.map((items) => {
    //       return UsersOption?.push({ label: items?.full_name, value: items?.uuid })
    //     })
    //   }

    const HandlechangeUser = (e) => {
        setUserUuid(e.target.value)
    }


    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Allow only numbers
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }
    };


    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setPaidNumber(value);
            if (value.length !== 10) {
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

    const ModalAdd = (e) => {
        e.preventDefault();
        let isValid = true;
        console.log(e,"gfhjkhjk")

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
            setUtrError("");
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
            setLoading(true);
            const payload =
            {
                "user_uuid": Loginuuid,
                "amount": amount,
                "type": type === 'others' ? otherType : type,
                "paid_to": paidto === 'Others' ? PaidOthers : paidto,
                "paid_number": paidNumber,
                "utr": utr,
                "image": image

            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit`, payload, {
                headers: {
                    "x-auth-token": userdata
                }
            })
                .then((res) => {
                    console.log(res?.data?.data, "kcdceji")

                    setTimeout(() => {
                        getUsers();
                        setShow(false)
                        handleClose();
                        setLoading(false)
                    }, 1000)

                })
                .catch((error) => {
                    console.log("it Might be an error")
                    setLoading(false)
                })
        }




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



       
        const updatePayLoad = {
            "user_uuid": Loginuuid,
            "amount": amount,
            "type": type === 'others' ? otherType : type,
            "paid_to": paidto === 'Others' ? PaidOthers : paidto,
            "paid_number": paidNumber,
            "utr": utr,
            "image": image,
        }

        setLoading(true)
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/transaction/credit/update/${updatedetails.uuid}`, updatePayLoad, {
            headers: {
                "x-auth-token": userdata
            }
        })
            .then((res) => {
                console.log(res?.data?.data, 'viis')
                setTimeout(() => {
                    setUsers();
                    setShow(false);
                    setLoading(false)
                }, 1000)


            })
            .catch((error) => {
                console.log("there might be a error", error);
                setLoading(false)
            });
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




    const handleEdit = (user) => {
        setUpdateDetails(user)
        setAmount(user.amount)
        setType(user.type)
        setpaidto(user.paid_to)
        setPaidNumber(user.paid_number)
        setUtr(user.utr)
        setImage(user.image)
        setNewComments(user?.comments)
        edithandleShow(true);

    }
    const handleAdd = () => {
        setAmount("")
        setType("")
        setpaidto("")
        setPaidNumber("")
        setUtr("")
        setImage("")
        handleShow(true);

    }



    return (
        <>

            <Transaction_User />

            {/* <h1>User Management</h1> */}

            <div  >


                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <span className="mb-0">Credited Money</span>

                                    {/* <button type='button' >ADD</button> */}
                                    <Button variant="primary" style={{ float: "right" }} onClick={handleAdd}>
                                        ADD
                                    </Button>

                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            {/* <th scope="col">User Name</th> */}
                                            <th scope="col">Amount</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Paid To</th>
                                            <th scope='col'>paid Number</th>
                                            <th scope="col">UTR</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Image</th>
                                            <th scope='col'>Edit</th>
                                            {/* <th scope='col'>Edit</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {loading ? (
                                            <tr>
                                                <td colSpan="8" className="text-center"><Spinner animation="border" /></td>
                                            </tr>
                                        ) : (
                                            users && users.length > 0 ? (
                                                users?.map((user, index) =>
                                                (
                                                    <tr key={user._id}>
                                                        <td>{user.amount}</td>
                                                        <td>{user.type}</td>
                                                        <td>{user.paid_to}</td>
                                                        <td>{user.paid_number}</td>
                                                        <td>{user.utr}</td>
                                                        <td>{user.approved_status}</td>
                                                        <td><img src={user.image} alt='' crossOrigin='anonymous' style={{ width: '50px', height: '50px' }} /></td>
                                                        <td><Button color='primary' size="sm" disabled={user.approved_status !== "Rejected"} onClick={() => handleEdit(user)} >Edit</Button></td>
                                                    </tr>
                                                ))
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

            </div >



            <Modal show={show} onHide={handleClose} animation={false} >
                <Modal.Header>
                    <h3>Credited Details</h3>
                </Modal.Header>
                <Modal.Body  >
                    {/* <Col lg="5" md="7"> */}
                    <Card className="bg-secondary shadow border-0" >
                        <CardBody className="px-lg-5 py-lg-5"  >
                            <Form role="form" onSubmit={ModalAdd} style={{ marginTop: "-94px" }} >
                                <FormGroup className="mb-3">
                                    <label>Amount:</label>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Amount"
                                            type="text"
                                            autoComplete="amount"
                                            value={amount}
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
                                        {loading ? 'saving...' : 'save'}
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
                <Modal.Header>
                    <h3>Credited Details</h3>
                </Modal.Header>
                <Modal.Body  >
                    {/* <Col lg="5" md="7"> */}
                    <Card className="bg-secondary shadow border-0" >
                        <CardBody className="px-lg-5 py-lg-5"  >
                            <Form role="form" onSubmit={ModalForm} style={{ marginTop: "-94px" }} >
                                <FormGroup className="mb-3">
                                    <label>Amount:</label>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Amount"
                                            type="text"
                                            autoComplete="amount"
                                            value={amount}
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
                                            // pattern="[0-9]{10}"
                                            autoComplete="tel"
                                            onChange={(e) => setPaidNumber(e.target.value)}

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
                                            // pattern="[a-zA-Z0-9]{10}"
                                            onChange={(e) => setUtr(e.target.value)}

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
                                <FormGroup>
                                    <label>Comments</label>
                                    <InputGroup className="input-group-alternative">
                                        <textarea
                                            type="text"
                                            value={newComments}
                                            style={{ width: "100%", border: '0px', height: "45px", borderRadius: '5px' }}
                                            onChange={(e) => setNewComments(e.target.value)}
                                            readOnly
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="submit" disabled={loading}>
                                        {loading ? "saving..." : 'save'}
                                    </Button>
                                    <Button variant="danger" onClick={edithandleClose} >
                                        Close
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
}


