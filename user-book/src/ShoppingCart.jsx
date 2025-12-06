import { Container, Row, Button } from "react-bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { deleteBook } from "./features/cart/cartSlice"
import { useNavigate } from "react-router-dom"
function ShoppingCart() {
    let dispatch= useDispatch()
    const { products } = useSelector((state) => state.cart)
    let [totalCost, setTotalCost] = useState(0)
    let [showCart, setShowCart] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {

        if (products.length > 0) {
            setShowCart(true)
        }
        for (let i = 0; i < products.length; i++) {
            console.log(products[i], 'roduct')
            let price = products[i].DiscountDetail.length > 0 ? products[i].DiscountDetail[0].finalPrice : products[i].originalPrice
            totalCost = totalCost + price

        }
        setTotalCost(totalCost)
    }, [])
    function goToDelete(id){
        dispatch(deleteBook(id))
    }
    function goToCheckout(){
        let token=localStorage.getItem('token');
        if(token){
            navigate('/Checkout')
        }
        else{
            alert('plz login first')
        }

    }

    return (
        <Container>
            <Row>
                <h3 className="mt-3">Shopping Cart</h3>
                {
                    showCart &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th> Product Name</th>
                                <th>Original Price</th>
                                <th>Discount</th>
                                <th>Final Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) =>
                                    <tr>
                                        <td><img src={product.image} width="40px" height="40px"></img></td>
                                        <td>{product.bookTitle}</td>
                                        <td>{product.originalPrice}</td>
                                        <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].discountValue : 0}</td>
                                        <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].finalPrice : product.originalPrice}</td>
                                        <td>
                                            <i className='bi bi-trash text-danger' onClick={() => goToDelete(product._id)}></i>
                                        </td>
                                    </tr>
                                )

                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total Cost</td>
                                <td>{totalCost.toFixed(2)}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                }
                <div className="text-end">
                { showCart && <Button  style={{width: '20%'}} onClick={goToCheckout}>Procced to Check out</Button>}
                </div>
                {
                    !showCart &&
                    <h3 className="text-danger"> No data to display</h3>
                }
            </Row>
        </Container>
    )
}
export default ShoppingCart