import React, { useState } from 'react';
import { Button, Container, Row, Col,Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import {ApnaAnaajLogo} from 'frontend/Crop_Prediction/static/ApnaAnaajLogo.png';
import UserLogin from './UserLogin';
import LogoImage from './images/ApnaAnaajLogo.png';
import './Home.css'; // Import the Home.css file
const Home = () => {
  const history = useHistory();

  const navigateToUserLogin = () => {
    history.push('/userlogin'); 
    window.location.reload(); 
    // Redirect to the UserLogin page
  };

  const navigateToAdminLogin = () => {
    history.push('/adminlogin'); 
    window.location.reload(); 
    // Redirect to the UserLogin page
  };

  return (
    <Container className="mt-5">
           
      <Row>
        <Col>
        <Image src={LogoImage} alt="Raita Labha Logo" className="mb-3 logo" />
          <h1 className="text-center">Raita Labha</h1>
        </Col>
      </Row>

      <Row className='info'>
        <p>Introducing Raita Labha: Your essential agricultural companion. This innovative web application offers precise month-wise crop price predictions, empowering farmers with data-backed insights. With a unique feature of three-month forecasts, Raita Labha guides farmers towards informed decisions, fostering improved harvest planning and financial gains.</p>
      </Row>
      <Row className="mt-4 btn">
        <Col className="text-center ">
          <Button variant="secondary" className="mr-2" onClick={navigateToUserLogin}>
            User{' '}
          </Button>
          <Button variant="secondary" className="mr-2" onClick={navigateToAdminLogin}>
            Admin
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
