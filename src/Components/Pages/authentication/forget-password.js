// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";

import './back.css'

// import authlayout to override default layout
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postData } from "../api/post";

const ForgetPassword = () => {

  const [email,setEmail] = useState("");


  async function onhandle(){
    const data = {
      "email":email
    };

  await postData("/forget_password",data)
  .then(res =>{
    if (res.result === "NOT_FOUND"){
      alert("This email not found in database");
    }else if (res.result === "SENT"){
      alert("Please check your email!");
    }
  }).catch(err =>{

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
              <p className="mb-6">
                Don&apos;t worry, we&apos;ll send you an email to reset your
                password.
              </p>
            </div>
            {/* Form */}
            <Form>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  name="email"
                  placeholder="Enter Your Email"
                />
              </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="button" onClick={onhandle}>
                  Reset Password
                </Button>
              </div>
              <span>
                Don&apos;t have an account?{" "}
                <Link to="/signin">Sign In</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
