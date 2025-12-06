import AddBook from "./AddBook"
import BookList from "./BookList"
import BookEdit from "./BookEdit"
import Sidebarmenu from './Sidebarmenu'
import { Routes, Route } from 'react-router-dom'
import CouponList from "./coupons/CouponList"
import AddCoupon from "./coupons/AddCoupon"
import DiscountList from "./discount/DiscountList"
import AddDiscount from "./discount/AddDiscount"
import BookDetail from "./BookDetail"
import PlaceList from "./bookatplace/PlaceList"
import AddPlace from "./bookatplace/AddPlace"
import TransactionList from "./transaction/TransactionList"
import ReviewList from "./review/ReviewList"
function DefaultLayout() {
    return (
        <Sidebarmenu>
            <Routes>

                <Route path='/books' element={<BookList></BookList>}></Route>
                <Route path='/add/book' element={<AddBook></AddBook>}></Route>
                <Route path='/edit/book/:id' element={<BookEdit></BookEdit>}></Route>
                <Route path='/book/detail/:id' element={<BookDetail></BookDetail>}></Route>
                <Route path='/coupons' element={<CouponList></CouponList>}></Route>
                <Route path='/add/coupon' element={<AddCoupon></AddCoupon>}></Route>
                <Route path='/discounts' element={<DiscountList></DiscountList>}></Route>
                <Route path='/add/discount' element={<AddDiscount></AddDiscount>}></Route>
                <Route path='/places' element={<PlaceList></PlaceList>}></Route>
                <Route path='/add/place' element={<AddPlace></AddPlace>}></Route>
                <Route path="/transactions" element={<TransactionList></TransactionList>}></Route>
                <Route path="/review" element={<ReviewList></ReviewList>}></Route>
            </Routes>
        </Sidebarmenu>
    )
}
export default DefaultLayout
