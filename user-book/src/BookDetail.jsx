import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBook } from "./features/cart/cartSlice";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
function BookDetail() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate();
    let [book, setBook] = useState(null)
    let [reviews,setReviews]=useState([])
    let [pinCode, setPinCode] = useState('')
    let [result, setResult] = useState({})
    let [showMessage, setShowMesssage] = useState(false)
    let id = params.id
    useEffect(() => {
        axios({
            url: apiUrl + '/user/book/' + id,
            method: 'get'
        }).then((result) => {
            setBook(result.data.data)
            setReviews(result.data.reviews)
        }).catch((err) => {
            alert(err)
        })
    }, [params])
    if (!book && reviews.length===0) {
        return <div>Loading...</div>
    }
    function addToCart() {
        dispatch(addBook(book))
        alert('Book added in cart')
    }
    function checkPinCode() {
        if (pinCode.length != 6) {
            alert("Please Enter the Correct PinCode")
        } else {
            axios({
                url: apiUrl + '/check/pincode/' + pinCode,
                method: 'get'
            }).then((result) => {
                if (result.data.success) {
                    setResult(result.data.data)
                    setShowMesssage(true)
                }
            }).catch((err) => {
                alert(err)
            })
        }
    }
    function doBuy() {
        let token
        token = localStorage.getItem('token')
        if (token) {
            localStorage.setItem('book', JSON.stringify(book))
            alert('Now you can go payment')
            navigate('/checkout/single')
        } else {
            alert("Pls Login first")
        }
    }
    return (
        <Container fluid>
            <Row className="mt-3">
                <Col lg={4}>
                    <img src={book.image} width="400px" height="450px"></img>
                    <button className="mt-2 btn btn-warning w-25" onClick={doBuy}>BUY NOW</button>
                    <button className=" ms-3 mt-2 btn btn-warning w-50" onClick={addToCart}>ADD TO CART</button>
                </Col>
                <Col lg={8}>
                    <h6 style={{ color: 'gray' }}>{book.bookTitle} <span>( {book.binding} , {book.authorName})</span></h6>
                    <h6 style={{ color: 'gray' }} >{book.shortDescription}</h6>
                    <div style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}>{3.4}</div>


                    {book && book.DiscountDetail.length === 0 && <span style={{ fontWeight: 'bold' }}>&#x20b9; {book.originalPrice} </span>}
                    {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'fixed' && <div><span className="fs-1">&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className="ms-3 text-xl"><s>&#x20b9;{book.originalPrice}</s></span><span className="ms-3 bg-success px-2 text-white">&#x20b9; {book.DiscountDetail[0].discountValue} off</span></div>}
                    {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'percentage' && <div><span className="fs-1">&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className="ms-3"><s>&#x20b9;{book.originalPrice}</s></span><span className="ms-3 bg-success px-2 text-white"> {book.DiscountDetail[0].discountValue} % off</span></div>}
                    <h6 style={{ color: 'gray', }}>{book.shortDescription}</h6>
                    <h6 style={{ color: 'gray', textAlign: 'justify' }}>{book.longDescription}</h6>
                    <h6 style={{ color: 'gray' }}>Language: {book.language}</h6>
                    <h6 style={{ color: 'gray' }}>Binding: {book.binding}</h6>
                    <h6 style={{ color: 'gray' }} >Replaceable: {book.isisReplaceable ? 'YES' : 'NO'}</h6>
                    <h6 style={{ color: 'gray' }}>Category: {book.genre}</h6>
                    <h6 style={{ color: 'gray' }}>ISBN No: {book.isbn}</h6>
                    <h6 style={{ color: 'gray' }}>Edition: {book.edition}</h6>
                    <h6 style={{ color: 'gray' }}>Pages: {book.pages}</h6>
                    <h6 style={{ color: 'gray' }}>Published: {book.publishYear}</h6>
                    <h6 style={{ color: 'gray' }}>Height: {book.height} cm</h6>
                    <h6 style={{ color: 'gray' }}>Width: {book.width} cm</h6>
                    <h5>Check Availablity:
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 mt-2 ">
                                    <Form.Control className="w-50 d-inline" style={{ border: '1px solid gray' }} type="Text" placeholder="Enter PinCode" onChange={(e) => setPinCode(e.target.value)} />
                                    <Button className="ms-3" variant="danger" onClick={checkPinCode}>Check</Button>
                                    <p>{showMessage && result.isAvailable && <span className="text-success">Yes, Book Available in  + {result.city + " "}  {result.deliveryTime}</span>} </p>
                                    <p>{showMessage && !result.isAvailable && <span className="text-danger">Book Not Available hare</span>} </p>
                                </Form.Group>

                            </Col>
                        </Row>
                    </h5>
                    <h5>Reviews & Rating</h5>
                    {
                        reviews && reviews.length>0 && reviews.length+" "+"Reviews"
                    }
                    {
                    reviews.map((review)=>
                        <div style={{border:'1px solid gray'}}>
                            <div style={{margin:'20px', width:'50px',backgroundColor:'seagreen',borderRadius:'5px',color:'white',paddingLeft:'10px'}}>{review.rating}*</div>
                            <div style={{margin:'20px'}}>{review.comment}</div>
                        </div>
                    )
                }
                </Col>
                
            </Row>
        </Container>
    )
}
export default BookDetail