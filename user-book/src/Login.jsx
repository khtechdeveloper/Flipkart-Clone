import { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
function Login() {

    let [showSpinner, setShowSpinner]=useState(false)
    let [emailVarifySpinner, setEmailVarifySpinner]=useState(false)
    let [signupSpinner, setSignupSpinner]=useState(false)
    let [show, setShow] = useState(true)
    let [loginShow, setLoginShow]=useState(false)
    let [signupShow, setSignupShow]=useState(false)
    let [login, setLogin] = useState(true)
    let [signup, setSignup] = useState(false)
    let [title, setTitle]=useState('Login')
    let [firstName, setFirstName]=useState('')
    let [lastName, setLastName]=useState('')
    let [signUpEmail, setSignUpEmail]=useState('')
    let [signUpPassword, setSignUpPassword]=useState('')
    let [loginEmail,setLoginEmail]=useState('')
    let [loginPassword, setLoginPassword]=useState('');
    let [loginLastName, setLoginLastName]=useState('')
    let [showOtpContent, setShowOtpContent]=useState(false)
    let [otpSend, setOtpSend]=useState(0);
    let [otpEntered, setOtpEntered]=useState(0)
    let [showOtpMessage, setShowOtpMessage]=useState(false)
    let [showFailureOtpMessage,setShowFailureOtpMessage]=useState(false)
    let [disabledSignUpButton, setDisabledSignUpButton]=useState(true)
    let [disabledVerifyOTPButton, setDisabledVerifyOTPButton]=useState(false)
    function handleClose() {
        setShow(false);
    }

    function showSignUpModal() {
        setLogin(false)
        setSignup(true)
        setTitle('Sign Up')
    }

    function showLoginModal(){
        setLogin(true)
        setSignup(false)  
        setTitle('Login')
    }

    function doSignUp(){
        setSignupSpinner(true)
        let data={
            firstName: firstName,
            lastName: lastName,
            email: signUpEmail,
            password: signUpPassword
        }

        axios({
            url: apiUrl+'/add/user',
            method:'post',
            data: data
        }).then((result)=>{
            if(result.data.success){
                
                setLogin(true)
                setSignup(false)
                setSignupShow(true)
                setSignupSpinner(false);
            }
        }).catch((err)=>{
            alert('error')
        })
    }

    function doLogin(){
        setShowSpinner(true)
    let data={
      email: loginEmail,
      password: loginPassword,
      lastName: lastName
    }
    axios({
      url: apiUrl+'/user/login',
      method: 'post',
      data: data
    }).then((result)=>{
      if(result.data.success){
        setShowSpinner(false);
        localStorage.setItem('name', result.data.data.name)
        localStorage.setItem('email', result.data.data.email)
        localStorage.setItem('token', result.data.data.token)
        setShow(false)
        setLoginShow(true) 
      }
    }).catch((err)=>{
      console.log(err)
      alert('invalid user name/password..')
    })
  }

  function doSendOTP(){
    setEmailVarifySpinner(true)
    let data={
        email: signUpEmail
    }
    axios({
        url: apiUrl+'/send/otp/for/signup',
        method: 'post',
        data: data
    }).then((result)=>{
        if(result.data.success){
            setShowOtpContent(true);
            setOtpSend(result.data.data)
            setEmailVarifySpinner(false)
        }
    }).catch((err)=>{
        console.log(err)
    })
  }

  function verifyOtp(){
    if(parseInt(otpSend)===parseInt(otpEntered)){
        setShowOtpMessage(true)
        setShowOtpContent(false)
        setDisabledSignUpButton(false)
        setDisabledVerifyOTPButton(true)
    }else{
        setShowFailureOtpMessage(true)
    }
  }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {login &&
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Type Email here' onChange={(e)=>setLoginEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Type Password here' onChange={(e)=>setLoginPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' variant='success' onClick={doLogin}>Login</Button>
                            
                            {showSpinner && <Spinner animation='border'/>}

                            <p>Do you have an account?<span className='text-danger ms-2' onClick={showSignUpModal}>Signup</span></p>
                        </Form>
                    }
                    {signup &&
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' placeholder='Type First name here' onChange={(e)=> setFirstName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type='text' placeholder='Type Last name here' onChange={(e)=> setLastName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Type Email here' onChange={(e)=>setSignUpEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                             <Button className='mt-2' variant='success' onClick={doSendOTP} disabled={disabledVerifyOTPButton}>varify Email</Button>
                                {emailVarifySpinner && <Spinner animation='border'/>}
                             {
                                showOtpContent &&
                                <Form.Group>
                                    <p className='text-success' > otp has been on sent on above entered email.</p>
                                    <Form.Label>Enter Otp</Form.Label>
                                    <Form.Control type='email' placeholder='Enter otp here' onChange={(e)=>setOtpEntered(e.target.value)}></Form.Control>
                                    <Button className='mt-2' variant='success' onClick={verifyOtp} >Verify OTP</Button>

                                    </Form.Group>
                             }
                             {showOtpMessage && <span className='text-success'> Email varified successfully.</span>}
                             {showFailureOtpMessage && <span className='text-danger'>Incorrect otp</span>}
                             
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Type Password here' onChange={(e)=>setSignUpPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' variant='success' onClick={doSignUp} disabled={disabledSignUpButton}>SignUp</Button>
                                {signupSpinner && <Spinner animation='border'/>}

                            <p>Already have an account?<span className='text-danger ms-2' onClick={showLoginModal}>Login</span></p>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
            <Modal show={loginShow} onHide={()=> setLoginShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Success</Modal.Title>
                                </Modal.Header>
                                     <Modal.Body>Login successful...</Modal.Body>
                                 <Modal.Footer>
                                <Button variant="secondary" onClick={()=> setLoginShow(false)}>
                                    Close
                                </Button>
                                </Modal.Footer>
                        </Modal>
                <Modal show={signupShow} onHide={()=> setSignupShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Success</Modal.Title>
                                </Modal.Header>
                                     <Modal.Body>signup successful...</Modal.Body>
                                 <Modal.Footer>
                                <Button variant="secondary" onClick={()=> setSignupShow(false)}>
                                    Close
                                </Button>
                                </Modal.Footer>
                        </Modal>

                        
        </>
    )
}
export default Login;