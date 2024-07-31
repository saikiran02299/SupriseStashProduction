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
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Spinner from 'react-bootstrap/Spinner';



const NewHeader = () => {
  const [users, setUsers] = useState('')
  const [loading,setLoading]=useState(false);
  console.log(users, 'fdgfdg');

const userdata = JSON.parse(localStorage.getItem('token' || ''))

  const getApi = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/admin/dashboard`, {
      headers: {
        "x-auth-token": userdata
      }
    })
      .then((res) => {
        console.log(res.data, 'cdid');
        setUsers(res.data);
        setLoading(false)

      })
      .catch((error)=>{
        console.log("error!!");
        setLoading(false)
      })

  }
  useEffect(() => {
    if(userdata){
      getApi();
    }
  }, [userdata])
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3" style={{ marginTop: "18px" }}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Active Users
                        </CardTitle>
                        <span><small><i class="fa fa-inr" /></small> <strong>{loading? <Spinner size="sm" />:users.active_users}</strong></span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="fas fa-user bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>


              <Col lg="6" xl="3" style={{ marginTop: "18px" }}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Inactive Users
                        </CardTitle>
                        <span> <small><i class="fa fa-inr" /></small> <strong>{loading? <Spinner size="sm" />:users.inactive_users}</strong></span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="fas fa-user-alt-slash bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i className="fas fa-percent" />
                        </div>
                      </Col>

                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3" style={{ marginTop: "18px" }}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Users
                        </CardTitle>
                        <span>  <strong>{ loading? <Spinner size="sm" />:users.total_users}</strong></span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="fa-solid fa-users bg-info text-white rounded-circle shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: "22px", height: '50px', width: "50px", lineHeight: "50px" }}
                        >
                          <i className="fas fa-percent" />
                        </div>
                      </Col>


                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last month</span> */}
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

export default NewHeader;
