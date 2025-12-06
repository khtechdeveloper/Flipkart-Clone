import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
function CouponList() {
    const navigate = useNavigate();
    function goToAddCoponPage() {
        navigate('/add/coupon')
    }
    return (
        <>
            <button className="btn btn-success ms-3 mt-3 float-end" onClick={goToAddCoponPage}>Add Coupon +</button>
        </>
    )
}
export default CouponList