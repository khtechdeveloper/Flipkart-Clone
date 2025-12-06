import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Col, Card, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ImageSlider from './ImageSlider'
const apiUrl = import.meta.env.VITE_API_URL;
function HomeCard() {
    let navigate = useNavigate();
    let [books, setBooks] = useState([])
    useEffect(() => {
        axios({
            url: apiUrl + '/books/user/home',
            method: 'get',
            params: {
                limit: 10
            }
        }).then((result) => {
            setBooks(result.data.data)
        }).catch((err) => {

        })
    }, [])
    function goToBookDetailPage(id) {
        navigate('/book/detail/' + id)

    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    <ImageSlider></ImageSlider>
                </Col>
            </Row>
            <Row>
                {books.map((book, index) =>
                    <Col key={index} lg={3} className='mt-3'>
                        <Card style={{ width: '18rem' }} onClick={() => goToBookDetailPage(book._id)}>
                            <Card.Img src={book.image} height="200px" width="200px"></Card.Img>
                            <Card.Body>
                                <Card.Title>{book.bookTitle}</Card.Title>
                                <Card.Text>
                                    {book.shortDescription}
                                    <div style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}>{3.4 + index}</div>
                                    <span style={{ color: 'gray', display: 'block' }}>{book.binding} ,{book.authorName}</span>
                                    {book.DiscountDetail.length === 0 && <span style={{ fontWeight: 'bold' }}>&#x20b9; {book.originalPrice} </span>}
                                    {book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'fixed' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className="ms-2"><s>&#x20b9;{book.originalPrice}</s></span><span className="ms-2 bg-warning px-2">&#x20b9; {book.DiscountDetail[0].discountValue} off</span></div>}
                                    {book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'percentage' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className="ms-2"><s>&#x20b9;{book.originalPrice}</s></span><span className="ms-2 bg-warning px-2"> {book.DiscountDetail[0].discountValue} % off</span></div>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col >
                )
                }
            </Row>
        </Container>
    )
}
export default HomeCard