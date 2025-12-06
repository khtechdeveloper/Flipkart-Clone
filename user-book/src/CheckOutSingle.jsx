import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

function CheckOutSingle() {
    let [totalCost, setTotalCost] = useState(0)
    //...........product Details............
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName]=useState('')
    let [email, setEmail] = useState('')
    let [mobileNo, setMoblieNo] = useState('')
    let [addressLine1, setAddressLine1] = useState('')
    let [addressLine2, setAddressLine2] = useState('')
    let [state, setState] = useState('')
    let [country, setCountry] = useState('')
    let [zipCode, setZipCode] = useState('')
    let [city, setCity] = useState('')
    let [book, setBook]=useState(null)
    let products=[];

    useEffect(() => {

        let name = localStorage.getItem('name')
        let customerEmail = localStorage.getItem('email');
        book=JSON.parse(localStorage.getItem('book'))
        setBook(book)
        setFirstName(name)
        setEmail(customerEmail)
        

    }, [])
    if(!book){
        return <div>Loading....</div>
    }
    async function goToBuy() {
        let token
        token = localStorage.getItem('token')
        if (token) {

            
            let data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                country: country,
                zipCode: zipCode
            }
            const stripe = await loadStripe('pk_test_51SPd4UPUUsotr9KLCwckKhJiyTBgkoZB3Ezqj3aGQoSwtBYfB5e4igsAF1srNWULLvncmgRnBtRfGZ6R7lxKNMvW00xwRmejA7');
            let tokenSend='Bearer' + ' ' + localStorage.getItem('token');

            const headers={
                'Content-Type': 'application/json',
                authorization: tokenSend
            }
            let cart = [];
            // for (let i = 0; i < products.length; i++) {
            //     cart.push(products[i])
            // }
            cart.push(book)
            let body = {
                products: cart,
                data: data
            }
            axios({
                url: apiUrl + '/checkout',
                method: 'post',
                data: body,
                headers: headers
            }).then((result) => {
                window.location.href = result.data.data

            }).catch((err) => {
                alert(err);
            })
        } else {
            alert('plz login first..')
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <h3 className='mt-3'>Shipping Detail</h3>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstName} readOnly></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} readOnly></Form.Control> 
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile No</Form.Label>
                                    <Form.Control type="number" placeholder="Enter your Moblile Number" onChange={(e) => setMoblieNo(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your Address" onChange={(e) => setAddressLine1(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setAddressLine2(e.target.value)} />
                                </Form.Group>
                            </Col>


                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setCity(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>State </Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setState(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setCountry(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Zip Code </Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setZipCode(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                </Col>
                <Col>
                    <h3 className='mt-3'>Product Summary</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Final Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={book.image} width="40px" height="40px"></img></td>
                                <td>{book.bookTitle}</td>
                                <td>{book && book.DiscountDetail.length > 0 ? book.DiscountDetail[0].finalPrice : book.originalPrice}</td>
                            </tr>                           
                        </tbody>                       
                    </table>
                    <div className='text-end'>
                        <Button variant='success' style={{ width: '25%' }} onClick={goToBuy}> Pay Now</Button>
                    </div>
                </Col>
            </Row>


        </Container>
    )
}

export default CheckOutSingle
