import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import Select from 'react-select'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AddPlace() {
    const navigate = useNavigate()
    let [inputValue, setInputValue] = useState('');
    let [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    let [pinCode, setPinCode] = useState('')
    let [city, setCity] = useState()
    let [isAvailable, setIsAvailable] = useState(false)
    let [deliveryTime, setDeliveryTime] = useState('')
    let [deliveryCharges, setDeliveryCharges] = useState(0)
    let [showModal, setShowModal] = useState(false)
    let [serverMessage, setServerMessage] = useState('')
    const handleClose = () => {
        setShowModal(false)
        navigate('/places')
    };
    function handleInputChange(input) {
        setInputValue(input)
    }
    function handleChange(selected) {
        setSelectedOption(selected)
    }
    function doAddPlace() {
        let data = {
            book: selectedOption.value,
            pinCode: pinCode,
            city: city,
            isAvailable: isAvailable,
            deliveryTime: deliveryTime,
            deliveryCharges: deliveryCharges,
        }
        axios({
            url: 'http://localhost:3000/add/place',
            method: 'post',
            data: data
        }).then((result) => {
            if (result.data.success) {
                setServerMessage(result.data.message)
                setShowModal(true)
            }
        }).catch((err) => {
            setServerMessage(err.response.data.message)
            setShowModal(true)
        })
    }

    useEffect(() => {
        axios({
            url: 'http://localhost:3000/books/for/discount',
            method: 'get',
            params: {
                bookTitle: inputValue
            }
        }).then((result) => {
            setOptions(result.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <Container>

            <h4>Add Place For Book Delivery</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Select the Book to apply the discount</Form.Label>
                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={handleChange}
                        isSearchable={true}
                        placeholder="Search or select a book..."
                        onInputChange={handleInputChange}
                    >

                    </Select>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Pin Code" onChange={(e) => { setPinCode(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="Text" placeholder="Enter City" onChange={(e) => { setCity(e.target.value) }} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Label>Is Avaialble Here?</Form.Label>
                        <Form.Select aria-label="IsAvaialable" onChange={(e) => { setIsAvailable(e.target.value) }}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Time</Form.Label>
                            <Form.Control type="Text" onChange={(e) => { setDeliveryTime(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Charges</Form.Label>
                            <Form.Control type="Number" onChange={(e) => { setDeliveryCharges(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant='success' onClick={doAddPlace}> Add Discount</Button>
            </Form>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{serverMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default AddPlace