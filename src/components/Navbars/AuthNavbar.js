import { Link, useNavigate } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, "user");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/auth/Login');
  }

  console.log(window.location.pathname, "WINDOEEEE");

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../assets/img/brand/Stash design.png")}
            />
          </NavbarBrand>
          {window.location.pathname !== "/auth/Login" && (
            <>
              <button className="navbar-toggler" id="navbar-collapse-main">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                <div className="navbar-collapse-header d-md-none">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("../../assets/img/brand/Stash design.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-collapse-main">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-auto" navbar>
                  {user === null ? (
                    <NavItem>
                      <NavLink className="nav-link-icon" onClick={handleLogin} tag={Link}>
                        <i className="ni ni-key-25" />
                        <span className="nav-link-inner--text">Login</span>
                      </NavLink>
                    </NavItem>
                  ) : (
                    <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        to={user?.data?.role === "management" ? "/admin/index" : "/user/index"}
                        tag={Link}
                      >
                        <i className="ni ni-tv-2" />
                        <span className="nav-link-inner--text">Dashboard</span>
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
