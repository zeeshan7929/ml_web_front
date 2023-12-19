// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import './back.css'

// import authlayout to override default layout
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postData } from "../api/post";

const SignUp = () => {

  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setconfirm] = useState("");
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  async function onRegisterHandler(){

    if (password !== confirm){alert("Password do not match!");return}
    if (password === "" && confirm === ""){return;}
    if (username.length === 0){return;}
    if (email.length === 0){return;}
    if (!isValidEmail(email)){alert("Please input valid email!"); return;}
    var l_name = ""
    var f_name = ""
    if (username.includes(" ")){
        f_name = username.split(" ")[0]
        l_name = username.split(" ")[1]
    }else{
      f_name = username
    }

    const data = {
      "email":email,
      "password":password,
      "f_name":f_name,
      "l_name":l_name
    }

    await postData('/register',data)
    .then(res =>{
          alert("Account created Successfully!")
          window.location.href = "/signin"
    }).catch(err=>{

    });
  
  }
  

  return (
    <>
    <div>
    <Link href="/" className="navbar-brand" style={{position:"fixed",right:"0",bottom:"0"}}>
    <p style={{marginBottom:"-10%",textAlign:"center",marginRight:"11%",color:"#fff"}}>
                        This project is supported by <br></br>the Victorian Government<br></br>through Creative Victoria
                    </p>
            <Image src="/images/brand/logo/logo.png" style={{width:220,height:100,marginLef:"10%"}} alt="" />
          </Link>
    </div>
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
              <p className="mb-6" style={{"fontSize":34}}><strong>Future Landscape</strong> <span style={{"fontSize":24}}>Prediction</span></p>
              
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={(e)=>{setUsername(e.target.value)}}
                  placeholder="User Name"
                  required=""
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  name="email"
                  placeholder="Enter address here"
                  required=""
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  name="password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e)=>{setconfirm(e.target.value)}}
                  name="confirm-password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Checkbox */}
              <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I agree to the <Link href="#"> Terms of Service </Link> and{" "}
                    <Link href="#"> Privacy Policy.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="button" onClick={onRegisterHandler}>
                    Create Free Account
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link to="/signin" className="fs-5">
                      Already member? Login{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
