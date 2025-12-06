import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
const apiUrl = import.meta.env.VITE_API_URL;
function BookDetail() {
    const params = useParams()
    const navigate = useNavigate()
    let [book, setBook] = useState({})
    useEffect(() => {
        axios({
            url: apiUrl + '/book/' + params.id,
            method: 'get'
        }).then((result) => {
            setBook(result.data.data)
        }).catch((err) => {
            alert('Some thing went wrong')
        })
    }, [])
    function goToListPage() {
        navigate('/books')
    }
    return (
        <Container>
            <h3>Book Detail:</h3>
            <Row>
                <Col>
                    <h5>Book Name: {book.bookTitle} </h5>
                </Col>
                <Col>
                    <h5>Author Name: {book.authorName} </h5>
                </Col>
                <Col>
                    <h5>Short Description: {book.shortDescription} </h5>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <h5>Long Description: {book.longDescription} </h5>
            </Row>
            <hr></hr>

            <Row className='mt-2'>
                <Col>
                    <img src={book.image} width="300px" height="300px"></img>
                </Col>

            </Row>
            <Button variant='success' className="mt-2 w-10" onClick={goToListPage}>Back</Button>
        </Container>
    )
}
export default BookDetail