import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
function DiscountList() {
    const navigate = useNavigate();
    let [discounts, setDiscounts] = useState([])
    let [isDelete, setIsDelete] = useState(false)
    const [show, setShow] = useState(false);
    function goToAddDiscountPage() {
        navigate('/add/discount')
    }
    function handleClose() {
        setShow(false);
        setIsDelete(true)
    }
    function goToDelete(id) {
        alert(id)
        axios({
            url: apiUrl + '/delete/discount/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true)

            }
        }).catch((err) => {
            alert(err)
        })
    }
    function goToEdit(id) {
        alert("it is an assignment...");
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/discounts',
            method: 'get'
        }).then((result) => {
            setDiscounts(result.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [isDelete])
    return (
        <>
            <>
                <button className="btn btn-success ms-3 mt-3 float-end" onClick={goToAddDiscountPage}>Add Discount +</button>
            </>
            <table className="table">
                <thead>
                    <tr>
                        <th>Discount Name</th>
                        <th>Applied On</th>
                        <th>Author Name</th>
                        <th>Original Price</th>
                        <th>Discount Type</th>
                        <th>Discount Value</th>
                        <th>Final Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        discounts.map((discount) =>
                            <tr>
                                <td>{discount.discountName}</td>
                                <td>{discount.book.bookTitle}</td>
                                <td>{discount.book.authorName}</td>
                                <td>{discount.book.originalPrice}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                <td>{ discount.discountType=='fixed'? discount.book.originalPrice - discount.discountValue : discount.book.originalPrice- (discount.book.originalPrice * discount.discountValue /100) }</td>
                                <td>
                                    <i className='bi bi-trash' onClick={() => goToDelete(discount._id)}></i>
                                    <i className='bi bi-pencil ms-2' onClick={() => goToEdit(discount._id)}></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Discount has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DiscountList