import { Container, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;
function Login() {
    const navigate = useNavigate()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState()
    let [show, setShow] = useState(false)
    function handleClose() {
        setShow(false)
        navigate('/books')
    }
    function doLogin() {

        let data = {
            email: email,
            password: password
        }
        axios({
            url: apiUrl + '/admin/login',
            method: 'post',
            data: data
        }).then((result) => {
            console.log(result)
            if (result.data.success) {
                setShow(true)
            }
        }).catch((err) => {
            console.log(err)
            alert('Invalid User Name/password...')
        })
    }
    return (
        <Container className='w-50 mt-5 p-5' style={{ border: '2px solid gray' }}>
            <div>
                <h3 className='text-center'>Login</h3>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="success" type="button" onClick={doLogin}>
                        Login
                    </Button>
                </Form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login Success...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default Login;