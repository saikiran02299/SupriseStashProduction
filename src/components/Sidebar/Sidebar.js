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
/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseStates, setCollapseStates] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [oldPassword, setOldpassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [oldError, setOldError] = useState('');
  const [newError, setNewError] = useState('');
  const [conformError, setConformError] = useState('');
  const [loading,setLoading]=useState(false)
  const handleConform = (e) => {
    console.log(e.target.value, "xhfghfghfg5657")
    const value = e.target.value;
    setConformPassword(value);
  }
  const HandleChangeClose = () => {
    setOldError('');
    setNewError('');
    setConformError('');
    setShow(false);
  }
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length > 4 && value.length <= 10) {
      setNewPassword(value);
      setNewError('');
    } else {
      setNewError('The password must be 5 characters');
    }
  };

  const handleConformPasswordChange = (e) => {
    const value = e.target.value;
    setConformPassword(value);
    if (value.length > 4 && value.length <= 10) {
      setConformPassword(value);
      setConformError('');
    } else {
      setConformError('The password must be 5 characters');
    }
  };



  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isactive');
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate('/auth/Login');
    }, 1000)
  };


  const Name = localStorage.getItem('Name');
  const userdata1 = Name ? JSON.parse(Name) : null;
  const UserName = JSON.parse(localStorage.getItem('Name'));
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = JSON.parse(localStorage.getItem('userid'));



  const ChangeFunction = (e) => {
    e.preventDefault();

    let isValid = true;
    if (!oldPassword) {
      setOldError("please enter the Old Password");
      isValid = false;
    }
    else {
      setOldError('');
    }

    if (!newPassword) {
      setNewError("please enter the new Password");
      isValid = false;
    }
    else {
      setNewError('');
    }
    if (!conformPassword) {
      setConformError("enter the conform password");
      isValid = false;
    }
    else {
      setConformError('');
    }




    if (user.data.role === 'user') {
      if (newPassword === conformPassword) {
        const changePayload = {

          "oldPassword": oldPassword,
          "newPassword": newPassword

        }
        setLoading(true)
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/change/password/${userid}`, changePayload, {

          headers: {
            "x-auth-token": userdata
          }

        })

          .then((res) => {
            setLoading(false);
            console.log(res, "vfvj");
            setTimeout(() => {
              setShow(false);
              toast?.success('Password Successfully Changed', {
                position: "top-right"
              })
              handleLogout();
              HandleChangeClose();

            }, 1000)

          })
          .catch((error) => {
            setLoading(false);
            console.log("there might be an error");
            setTimeout(() => {
              toast.error("Unsuccessfull Changes!!!")
            }, 1000)

          })
      }
      else {
        toast.warning('password and conformpassword are not same');
      }
    }
    else {

      if (newPassword === conformPassword) {
        const changePayload = {

          "oldPassword": oldPassword,
          "newPassword": newPassword

        }
        setLoading(true)
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/change/password/${userid}`, changePayload, {

          headers: {
            "x-auth-token": userdata
          }

        })

          .then((res) => {
            setLoading(false)
            console.log(res, "vfvj");
            setTimeout(() => {
              toast?.success('Password Successfully Changed', {
                position: "top-right"
              })
              handleLogout();

            }, 1000)

          })
          .catch((error) => {
            setLoading(false  )
            console.log("there might be an error");
            setTimeout(() => {
              toast.error("Unsuccessfull Changes!!!")
            }, 1000)

          })
      }
      else {
        toast.warning("password and conform password are not same")
      }
    }

  }


  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  // toggles submenus collapse between opened and closed (true/false)
  const toggleSubCollapse = (e, key) => {
    e.preventDefault();
    setCollapseStates({
      ...collapseStates,
      [key]: !collapseStates[key],
    });
  };

  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.children) {
        return (
          <NavItem key={key}>
            <NavLink href="#" onClick={(e) => toggleSubCollapse(e, key)}>
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
            <Collapse isOpen={collapseStates[key]}>
              <Nav navbar>
                {prop.children.map((childProp, childKey) => (
                  <NavItem key={childKey}>
                    <NavLink
                      to={childProp.layout + childProp.path}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                    >
                      <i className={childProp.icon} />
                      {childProp.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Collapse>
          </NavItem>
        );
      } else {
        return (
          <>
            {prop?.name !== "My Profile" && prop?.name !== "Profile" &&
              <NavItem key={key}>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                >
                  <i className={prop.icon} />
                  {prop.name}
                </NavLink>
              </NavItem>
            }
          </>

        );
      }
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }



  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to={user?.data?.role === 'management' ? '/admin/user-profile' : '/user/ProfileUser'} tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem> */}
            {user?.data?.role==='user'?(
                <DropdownItem  onClick={handleShow}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Change Password</span>
                </DropdownItem> 
                ):""}
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink> */}
            </NavItem>
          </Nav>
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <Modal.Haeder closeButton>
  <Modal.Title>Modal heading</Modal.Title>
</Modal.Header> */}
        <Modal.Body>
          {/* <Col lg="5" md="7"> */}
          <Card className="bg-secondary  shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h3>Change password</h3>
              </div>
              <div className="btn-wrapper text-center">
              </div>
            </CardHeader> */}
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
                      onChange={(e) => setOldpassword(e.target.value)}
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
                  {newError && <div style={{ color: "red", fontSize: "12px" }}>{newError}</div>}
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
                  {conformError && <div style={{ color: "red", fontSize: "12px" }}>{conformError}</div>}
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner style={{ width: "1rem", height: "1rem" }} className="spinner-border-custom" /> : 'save'}
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
    </Navbar>


  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};



export default Sidebar;
