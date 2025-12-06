import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

function CheckOut() {
    let [totalCost, setTotalCost] = useState(0)
    const { products } = useSelector((state) => state.cart)
    //...........product Detalis............
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [mobileNo, setMoblieNo] = useState('')

    let [addressLine1, setAddressLine1] = useState('')
    let [addressLine2, setAddressLine2] = useState('')
    let [state, setState] = useState('')
    let [country, setCountry] = useState('')
    let [zipCode, setZipCode] = useState('')
    let [city, setCity] = useState('')


    useEffect(() => {

        let name = localStorage.getItem('name')
        let customerEmail = localStorage.getItem('email');
        let lastName= localStorage.getItem('lastName');
        setFirstName(name)
        setEmail(customerEmail)
        setLastName(lastName)
        let price = 0;
        totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            price = products[i].DiscountDetail.length > 0 ? products[i].DiscountDetail[0].finalPrice : products[i].originalPrice
            totalCost = totalCost + price
        }
        setTotalCost(totalCost)

    }, [])
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
            for (let i = 0; i < products.length; i++) {
                cart.push(products[i])
            }
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
                localStorage.setItem('transactionId', result.data.transactionId)
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
                                    <Form.Control type="text" value={lastName} readOnly></Form.Control>
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
                    <h3 className='mt-3'> Product Summary</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                {/* <th>Product Price</th>
              <th>Discount</th> */}
                                <th>Final Price</th>
                                {/* <th>Action</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) =>
                                    <tr>
                                        <td><img src={product.image} width="40px" height="40px"></img></td>
                                        <td>{product.bookTitle}</td>
                                        {/* <td>{product.originalPrice}</td> */}
                                        {/* <td>{product.DiscountDetail.length> 0 ?product.DiscountDetail[0].discountValue:0 }</td> */}
                                        <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].finalPrice : product.originalPrice}</td>

                                        {/* <td>
                         <i className="bi bi-eye" onClick={() => goToView(product._id)}></i>
                         <i className="bi bi-pencil ms-3" onClick={() => goToEdit(product._id)}></i>
                        <i className="bi bi-trash ms-3" onClick={() => goToDelete(product._id)}></i>
           </td> */}

                                    </tr>
                                )
                            }
                            <tr>
                                {/* <td></td>
              <td></td> */}
                                <td></td>
                                <td>Total Cost</td>
                                <td>{totalCost.toFixed(2)}</td>
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

export default CheckOut
