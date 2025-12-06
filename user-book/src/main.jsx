
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import App from './App.jsx'
import HomeCard from './HomeCard.jsx'
import BookDetail from './BookDetail.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ShoppingCart from './ShoppingCart.jsx'
import Checkout from './Checkout.jsx'
import CheckOutSingle from './CheckOutSingle.jsx'
import PaymentSuccess from './PaymentSuccess.jsx'
import PaymentFailure from './PaymentFailure.jsx'
import MyOrders from './MyOrders.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomeCard></HomeCard>}></Route>
        <Route path='/book/detail/:id' element={<BookDetail></BookDetail>}></Route>
        <Route path='/cart' element={<ShoppingCart></ShoppingCart>}></Route>
        <Route path='/Checkout' element={<Checkout></Checkout>}></Route>
        <Route path='/payment/success' element={<PaymentSuccess></PaymentSuccess>}></Route>
        <Route path='/payment/failure' element={<PaymentFailure></PaymentFailure>}></Route>
        <Route path='/checkout/single' element={<CheckOutSingle></CheckOutSingle>}></Route>
        <Route path='myorders' element={<MyOrders></MyOrders>}></Route>
      
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  </Provider>
)
