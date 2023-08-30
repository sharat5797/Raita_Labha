import React, { useState } from "react";
import { Form, Button, Table,Image,Row,Col} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LogoImage from './images/ApnaAnaajLogo.png';
import './Home.css'; // Import the Home.css file
const cropOptions = [
    "",
  "wheat", "paddy", "barley", "maize", "bajra", "copra", "cotton", "masoor",
  "gram", "groundnut", "arhar", "sesamum", "jowar", "moong", "niger", "rape",
  "jute", "safflower", "soyabean", "urad", "ragi", "sunflower", "sugarcane"
];

const AdminPage = () => {
  const [selectedCrop, setSelectedCrop] = useState(cropOptions[0]);
  const [formData, setFormData] = useState({});
  const [addedData, setAddedData] = useState([]);

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const handleAdd = () => {
    setAddedData([...addedData, { crop: selectedCrop, ...formData }]);
    setFormData({});
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Sending only the addedData to the API
      const response = await axios.post("http://127.0.0.1:5000/crops", addedData);
      console.log("Data added successfully:", response.data);
      toast.success("Data added successfully:");
      // Clear addedData and form fields after successful submission
      setAddedData([]);
      setFormData({});

    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    
    <div className="container mt-5">
        <ToastContainer />
       <div>

        <Image src={LogoImage} alt="Raita Labha Logo" className="mb-3 logo" />
          <h1 className="text-center">Raita Labha</h1>
       </div>
        
      <h3 className="text-center">Add Crop Details</h3>
    
      <Form className="container mt-2 form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="crop">
              <Form.Label>Crop</Form.Label>
              <Form.Control as="select" value={selectedCrop} onChange={handleCropChange}>
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" onChange={handleFormChange} value={formData.date || ""}  />
            </Form.Group>

            
          </Col>
          <Col md={6}>
            <Form.Group controlId="rainfall">
              <Form.Label>Rainfall</Form.Label>
              <Form.Control type="number" step="0.01" onChange={handleFormChange} value={formData.rainfall || ""} />
            </Form.Group>

            <Form.Group controlId="wpi">
              <Form.Label>WPI</Form.Label>
              <Form.Control type="number" step="0.01" onChange={handleFormChange} value={formData.wpi || ""} />
            </Form.Group>
          </Col>
        <Row>
            <Col md={3}>
            </Col>
          <Col md={6}>
          <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" onChange={handleFormChange} value={formData.price || ""} />
            </Form.Group>
            </Col>

        </Row>
        </Row>

        <Button variant="primary" type="button" onClick={handleAdd}>
          Add
        </Button>
      </Form>

      {addedData.length > 0 && (
        <>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Date</th>
                <th>Price</th>
                <th>Rainfall</th>
                <th>WPI</th>
              </tr>
            </thead>
            <tbody>
              {addedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.crop}</td>
                  <td>{data.date}</td>
                  <td>{data.price}</td>
                  <td>{data.rainfall}</td>
                  <td>{data.wpi}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="success" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default AdminPage;
