import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './Login';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
function NavBar() {
    const navigate = useNavigate()
    const {products} = useSelector((state)=> state.cart)
    let [showLoginModal, setShowLoginModal] = useState(false)
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [userName, setUserName] = useState('')
    useEffect(() => {
        let token;
        token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true)
            setUserName(localStorage.getItem('name'))
        }
    }, [])
    function doLogOut() {
        localStorage.setItem('name', '')
        localStorage.setItem('email', '')
        localStorage.setItem('token', '')
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        <Container fluid>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">RDC Book Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            // style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="text-white" href="#action1">Mobile</Nav.Link>
                            <Nav.Link className="text-white" onClick={() => navigate('/')}>Book</Nav.Link>
                            <Nav.Link className="text-white" onClick={() => navigate('/myorders')}>My Orders</Nav.Link>
                            {/* <NavDropdown title="Link" id="navbarScrollingD ropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown> */}
                            {/* <Nav.Link className="text-white" onClick={() => navigate('/cart')}>
                                Cart {products.length > 0 ? products.length : ''}
                            </Nav.Link> */}

                        </Nav>
                        <Nav.Link onClick={()=> navigate('/cart')} className="text-white " style={{position : 'relative'}}>
                            <i className='bi bi-cart' style={{fontSize:'1.3rem'}}></i>
                            <Badge
                            bg='danger'
                            pill
                            style={{
                                position: 'absolute',
                                top: '0px',
                                right: '-8px',
                                fontSize: '0.7rem'
                            }}>
                                {products.length}
                            </Badge>
                            
                        </Nav.Link>
                        {
                            isLoggedIn && <span className='text-white'>Welcome  {userName}</span>
                        }
                        <Form className="d-flex me-0">
                            
                            {
                                isLoggedIn && <Button className="ms-2 no-wrap" variant='success' onClick={doLogOut}>Log out</Button>
                            }
                            {!isLoggedIn && <Button className="ms-2" variant='success' onClick={() => setShowLoginModal(true)}>Login</Button>}

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showLoginModal && <Login></Login>}
        </Container>
    );
}

export default NavBar;