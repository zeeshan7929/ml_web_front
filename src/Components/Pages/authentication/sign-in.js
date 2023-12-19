// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";

import './back.css'
// import authlayout to override default layout
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postData } from "../api/post";

const SignIn = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  var localItem = localStorage.getItem("user_data")
  if ( localItem !== null){
      // alert(JSON.parse(localItem).id);
      window.location.href = "/upload-new"
  }

  async function onLoginSubmit(){

    const data = {
      "email":email,
      "password":password
    }
    await postData("/login",data)
    .then(res =>{
        res = res.data;
        var to_store = {
          "id":String(res[0]),
          "email":String(res[1]),
          "f_name":String(res[3]),
          "l_name":String(res[4])
        }

        localStorage.setItem("user_data",JSON.stringify(to_store))
        window.location.href = "/upload-new"
    }).catch(err =>{
        alert("Wrong username or password!")
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
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  name="username"
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

              {/* Checkbox */}
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="button" onClick={onLoginSubmit}>
                    Sign In
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link to="/signup" className="fs-5">
                      Create An Account{" "}
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

SignIn.Layout = AuthLayout;

export default SignIn;
