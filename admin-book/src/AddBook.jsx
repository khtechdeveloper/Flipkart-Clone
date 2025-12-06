import { Container, Row, Col, Form, Button, Modal, Spinner } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
function AddBook() {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        navigate('/')
    };
    let [showSpinner, setShowSpinner] = useState(false)
    let [buttonDisabled, setButtonDisabled] = useState(false)
    let [bookTitle, setBookTitle] = useState('')
    let [authorName, setAuthorName] = useState('')
    let [shortDescription, setShortDescription] = useState('')
    let [longDescription, setLongDescription] = useState('')
    let [language, setLanguage] = useState('Hindi')
    let [binding, setBinding] = useState('PaperBinding')
    let [publisher, setPublisher] = useState('');
    let [isReplaceable, setIsReplaceable] = useState(true)
    let [quantity, setQuantity] = useState(0)
    let [originalPrice, setOriginalPrice] = useState(0)
    let [genre, setGnere] = useState('Academic')
    let [isbn, setIsbn] = useState('')
    let [edition, setEdition] = useState('');
    let [isUsed, setIsUsed] = useState(false)
    let [pages, setPages] = useState(0)
    let [publishYear, setPublishYear] = useState(2000);
    let [width, setWidth] = useState(0)
    let [height, setHeight] = useState(0)
    let [file, setFile] = useState();
    function doAddBook() {
        setButtonDisabled(true)
        setShowSpinner(true)
        let formData = new FormData()
        formData.append('bookTitle', bookTitle)
        formData.append('authorName', authorName)
        formData.append('shortDescription', shortDescription)
        formData.append('longDescription', longDescription)
        formData.append('language', language)
        formData.append('binding', binding)
        formData.append('publisher', publisher)
        formData.append('isReplaceable', isReplaceable)
        formData.append('quantity', quantity)
        formData.append('originalPrice', originalPrice)
        formData.append('genre', genre)
        formData.append('isbn', isbn)
        formData.append('edition', edition)
        formData.append('isUsed', isUsed)
        formData.append('pages', pages)
        formData.append('publishYear', publishYear)
        formData.append('width', width)
        formData.append('height', height)
        formData.append('file', file)
        formData.append('fileName', file.name)
        axios({
            url: 'http://localhost:3000/add/book',
            method: 'post',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((result) => {
            console.log(result);
            if (result.data.success) {
                setButtonDisabled(false)
                setShowSpinner(false)
                setShow(true);
                navigate('/books')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Book Title" onChange={(e) => { setBookTitle(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Author Name" onChange={(e) => { setAuthorName(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Short Description" onChange={(e) => { setShortDescription(e.target.value) }} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => { setLongDescription(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setLanguage(e.target.value) }}>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Punjabi">Punjabi</option>
                        </Form.Select>

                    </Col>
                    <Col>
                        <Form.Label>Select Book Binding</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setBinding(e.target.value) }}>
                            <option value="PaperBinding">Paper Binding</option>
                            <option value="HardCover">HardCover</option>
                            <option value="Spiral">Spiral</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Publisher" onChange={(e) => { setPublisher(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Replaceable</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setIsReplaceable(e.target.value) }}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>

                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Price in(Rs)" onChange={(e) => { setOriginalPrice(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Genre(Category)</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setGnere(e.target.value) }}>
                            <option value="Academic">Academic</option>
                            <option value="Banking">Banking</option>
                            <option value="Engineering">Engineering</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>ISBN No</Form.Label>
                            <Form.Control type="Text" placeholder="Enter ISBN" onChange={(e) => { setIsbn(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Edition" onChange={(e) => { setEdition(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Used</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setIsUsed(e.target.value) }}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pages(In Numbers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Number of Pages" onChange={(e) => { setPages(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Published Year(In Numbers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Published Year" onChange={(e) => { setPublishYear(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Height(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Height" onChange={(e) => { setHeight(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Width(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Width" onChange={(e) => { setWidth(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Book Image</Form.Label>
                            <Form.Control type="file" placeholder="Browse Image" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger">Cancel</Button>
                <Button className="ms-3" variant="success" disabled={buttonDisabled} onClick={doAddBook}>Add Book</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been saved successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {showSpinner && <Spinner animation="border" />}
        </Container>

    )
}
export default AddBook