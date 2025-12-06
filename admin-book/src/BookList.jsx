import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;
function BookList() {
    let navigate = useNavigate()
    let [books, setBooks] = useState([])
    const [show, setShow] = useState(false);
    let [isDelete, setIsDelete] = useState(false)
    let [searchByBookName, setSearchByBookName] = useState('')
    let [nop, setNop] = useState(1)
    let [pageNo, setPageNo] = useState(1);
    let [totalBooks, setTotalBooks] = useState(0)
    let bookPerPage = 3;
    let items = [];
    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/books',
            method: 'get',
            params: {
                bookTitle: searchByBookName,
                pageNo: pageNo,
                limit: 3
            }
        }).then((result) => {
            if (result.data.success) {
                console.log(result.data.data)
                setBooks(result.data.data)
                setTotalBooks(result.data.totalCount)
                setNop(Math.ceil(result.data.totalCount / bookPerPage))
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [isDelete, searchByBookName, pageNo])
    function goToAddBookPage() {
        navigate('/add/book')
    }
    function searchBook(bookname) {
        setSearchByBookName(bookname)
    }
    const handleClose = () => {
        setShow(false)
        setIsDelete(true)

    };

    function goToDelete(id) {
        axios({
            url: 'http://localhost:3000/delete/book/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true)
            }
        }).catch((err) => {

        })
    }
    function goToEdit(id) {
        navigate('/edit/book/' + id)
    }
    function goToView(id) {
        navigate('/book/detail/' + id)
    }
    return (
        <>
            <Form.Control type="text" placeholder=" Enter Book Name to search" onChange={(e) => searchBook(e.target.value)} />
            <button className="btn btn-success ms-3 mt-3 float-end" onClick={goToAddBookPage}>Add Book+</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Image</th>
                        <th> Book Title</th>
                        <th>Author Name</th>
                        <th>Publisher Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book) =>
                            <tr>
                                <td><img src={book.image} width="40px" height="40px"></img></td>
                                <td>{book.bookTitle}</td>
                                <td>{book.authorName}</td>
                                <td>{book.publisher}</td>
                                <td>{book.originalPrice}</td>
                                <td>
                                    <i className='bi bi-trash' onClick={() => goToDelete(book._id)}></i>
                                    <i className='bi bi-pencil ms-2' onClick={() => goToEdit(book._id)}></i>
                                    <i className='bi bi-eye ms-2' onClick={() => goToView(book._id)}></i>
                                    {/* <button className="btn btn-primary ms-2" onClick={() => goToEdit(book._id)}>Edit</button> */}
                                </td>

                            </tr>
                        )
                    }
                </tbody>

            </table>
            <div className="d-flex justify-content-center">

                {totalBooks > bookPerPage ? <Pagination>{items}</Pagination> : ''}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default BookList