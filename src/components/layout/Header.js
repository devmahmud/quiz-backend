import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { user } = auth;

  const onLogout = () => {
    dispatch(logout());
    toast.success("Succesfully Logged out !");
  };

  const guestLinks = (
    <>
      <Nav.Link as={NavLink} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={NavLink} to="/register">
        Register
      </Nav.Link>
    </>
  );

  const authLinks = (
    <>
      <Nav.Link onClick={onLogout}>Logout</Nav.Link>
    </>
  );

  return (
    <Navbar expand="lg" variant="dark" style={{ background: "#7F6000" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Venari
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user?.username ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
