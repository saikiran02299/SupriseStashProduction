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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

const Debited_User = () => {
  const [users, setUsers] = useState('');
  const[loading,setLoading] =useState(false);
  console.log(users, 'bhdbd');
  const userdata = JSON.parse(localStorage.getItem('token' || ''))

  const getApi = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/dashboard`, {
        
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        console.log(res.data, 'cdid');
        setUsers(res.data);
        setLoading(true);
      })
      .catch((error)=>{
        console.log("error!!");
        setLoading(false);
      })

  }
  useEffect(() => {
    if(userdata){
      getApi();
    }
  },[userdata])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body" >
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
                         Total Debited
                        </CardTitle>
                        <span>
                        <small><i class="fa fa-inr"/></small> <strong>{loading? <Spinner size="sm" />:users.totalDebitAmount}</strong> 
                        </span>
                      </div>
                      <Col className="col-auto" >
                      <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-transfer"></i>
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
                         Today Debited
                        </CardTitle>
                        <span><small><i class="fa fa-inr"/></small> <strong>{loading? <Spinner size="sm" />:users.todayDebitAmount}</strong></span>
                      </div>
                      <Col className="col-auto">
                      <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-transfer"></i>
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
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Today user Debit
                        </CardTitle>
                        <span><small><i class="fa fa-inr"/></small> <strong>{loading? <Spinner size="sm" />:users.todayUserDebitAmount}</strong></span>
                      </div>
                      <Col className="col-auto">
                      <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-transfer"></i>
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

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total user Debit
                        </CardTitle>
                        <span><small><i class="fa fa-inr"/></small> <strong>{loading? <Spinner size="sm" />:users.totalUserDebitAmount}</strong></span>
                      </div>
                      <Col className="col-auto">
                      <div
                          className=" bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i class="fa-solid fa-money-bill-transfer"></i>
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
    </>
  );
};

export default Debited_User;
