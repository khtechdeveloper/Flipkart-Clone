import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
const apiUrl= import.meta.env.VITE_API_URL;
function MyOrders(){
    let [myOrders, setMyOrders]=useState([]);
    let [showModel, setShowModel]=useState(false);
    let [showReviewModel, setShowReviewModel]=useState(false)
    let [transaction, setTransaction]=useState({});
    let [productsForReview, setProductsForReview]=useState([]);
    let [rating, setRating]=useState(0);
    let [comment, setComment]=useState('')
    let [book, setBook]=useState('')
    const handleClose = () => {
        setShowModel(false)
        setShowReviewModel(false)
    };
    useEffect(()=>{
        let tokenSend='Bearer'+ " "+ localStorage.getItem('token')
        const headers={
            'Content-Type': 'application/json',
            authorization: tokenSend
        }
        axios({
            url: apiUrl + '/my/orders',
            method: 'get',
            headers: headers
        }).then((result)=>{
            setMyOrders(result.data.data)
        }).catch((err)=>{
            
        })
    },[])

    function goToView(myOrder){
        setTransaction(myOrder)
        setShowModel(true)
    }
    function postReview(products){
        setShowReviewModel(true)
        productsForReview.length=0;
        for(let i=0;i<products.length;i++){
            productsForReview.push({
                _id: products[i]._id,
                bookName: products[i].bookTitle,
            })
        }
        console.log(productsForReview,'productreview')
        setProductsForReview(productsForReview)
    }
    function submitReview(){
        let data={
            book:book,
            comment:comment,
            rating:rating
        }
        let tokenSend='Bearer'+ " "+ localStorage.getItem('token')
        const headers={
            'Content-Type': 'application/json',
            authorization: tokenSend
        }
        axios({
            url:apiUrl+'/post/comment',
            method:'post',
            data:data,
            headers:headers
        }).then((result)=>{
            if(result.data.success){
                alert('comment has been submitted...')
                handleClose();
            }
           
        }).catch((err)=>{
            alert(err.message)
        })
    }
    function setProduct(){
        alert('ok')
    }
    return(
        <Container>
            <Row>
                <Col>
                    <h3>My Orders</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Products</th>
                            <th>Total Price</th>
                            <th>Payment By</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                myOrders.map((myOrder)=>
                                    <tr>
                                        <td>{myOrder.transactionId.substring(0, 10) + "..."}</td>
                                        <td>{myOrder.products.map((product)=>
                                            product.bookTitle +","
                                        )}</td>
                                        <td>{myOrder.totalPrice}</td>
                                        <td>{myOrder.paymentGateway}</td>
                                        <td>{myOrder.status}</td>
                                        <i className="bi bi-eye ms-2" onClick={()=>goToView(myOrder)}></i>
                                        <i className="bi bi-pencil ms-2" onClick={()=>postReview(myOrder.products)}></i>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>

            <Modal show={showModel} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="text-center">Transaction Details:</h3>
                    <br />
                    <Row>
                        <Col>                        
                            <>
                            <h5>First Name: {transaction.firstName}</h5>
                            <h5>Last Name: {transaction.lastName}</h5>
                            <h5>Email: {transaction.email}</h5>
                            <h5>Mobile No: {transaction.mobNo}</h5>
                            <h5>Address Line1: {transaction.addressLine1}</h5>
                            <h5>Address Line2: {transaction.addressLine2}</h5>
                            <h5>City: {transaction.city}</h5>
                            <h5>State: {transaction.state}</h5>
                            <h5>Country: {transaction.country}</h5>
                            <h5>ZipCode: {transaction.zipCode}</h5>
                            <h5>Status: {transaction.status}</h5>
                            <h5>Transaction Id: {transaction.transactionId}</h5>
                            <h5>Total Price: {transaction.totalPrice}</h5>
                            <h5>Payment Gateway: {transaction.paymentGateway}</h5>                           
                            </>                           
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showReviewModel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>post your review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>select your product</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>setBook(e.target.value)}>
                        <option value="select">Select Your Product</option>
                {
                    productsForReview.map((product)=>(
                        <option key={product._id} value={product._id}>{product.bookName}</option>
                    ))
                }
                
                </Form.Select>
                <Form.Label>write your Review</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e)=>{setComment(e.target.value)}}/>
                <Form.Label>Give your rating(out of 10)</Form.Label>
                <Form.Control type="Number" placeholder="Enter Rating" onChange={(e)=>{setRating(e.target.value)}}></Form.Control>
                <Button className="mt-3" variant="primary" onClick={submitReview}>post Review</Button>
            </Form.Group>           
          </Form>
        </Modal.Body>
            </Modal>
        </Container>
    )
}

export default MyOrders