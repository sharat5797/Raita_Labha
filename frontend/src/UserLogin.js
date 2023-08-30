import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
const API = "http://127.0.0.1:5000";

const UserLogin = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory(); 
  const handleSignin = (event) => {
    event.preventDefault();
    if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
    // Call the API to verify email and password
    axios
      .get(`${API}/users`)
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          console.log("Login successful");
          setIsLoggedIn(true);
          toast.success("Login successful");
          // history.push("http://127.0.0.1:9000");
          window.location.href = "http://127.0.0.1:9000";
        } else {
          console.log("Invalid email or password");
          toast.error("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error verifying credentials:", error);
      });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setIsSignup(true);
  };

  const handleGoBack = () => {
    setIsSignup(false);
  };

  const handleClose = () => {
    history.push("/");
    window.location.reload(); 
  };
  
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (!name || !mobile || !email || !password || !address) {
      toast.error("Please fill in all the fields");
      return;
    }
      
    const newUser = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
      address: address,
    };

    // Call the API to create the new user
    axios
      .post(`${API}/user`, newUser)
      .then((response) => {
        console.log("User created:", response.data);
        setIsSignup(false);
        toast.success("User created successfully");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error("Error creating user");
      });
  };

  // if (isLoggedIn) {
  //   return (
  //     <BrowserRouter>
  //       <Switch>
  //         <Route
  //           path="/"
  //           render={() => <Home1 isSignup={isLoggedIn} />}
  //         />
  //         <Redirect to="/home1" />
  //       </Switch>
  //     </BrowserRouter>
  //   );
  // }
  return (
    <>
      <ToastContainer />
      <Modal show={!isSignup} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignup}>
            Sign Up
          </Button>
          <Button variant="primary" type="submit" onClick={handleSignin}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isSignup} onHide={handleGoBack}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmailSignup">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordSignup">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSignupSubmit}>
            Sign Up
          </Button>
          <Button variant="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserLogin;
