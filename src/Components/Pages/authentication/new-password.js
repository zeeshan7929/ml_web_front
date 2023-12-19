// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";

import './back.css'
// import authlayout to override default layout
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { postData } from "../api/post";

const NewPassword = () => {

  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  var localItem = localStorage.getItem("user_data")
  const [searchParams, setSearchParams] = useSearchParams();
  if ( localItem !== null){
      // alert(JSON.parse(localItem).id);
      window.location.href = "/gallery"
  }

  async function onLoginSubmit(){

    if (password === "" && confirmPassword === ""){return;}
    if (password !== confirmPassword){return;}
    const data = {
      "token":searchParams.get("token"),
      "password":password
    }
    
    await postData("/new_password",data)
    .then(res =>{
        res = res.result;
        if (res === "EXPIRE"){
            alert("Link Expire!")
        }else{
            alert("Successfully Created new password\nPlease login to your account.")
            window.location.href = "/signin"
        }
        
    }).catch(err =>{
        alert("Unknown Error!")
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
              <h4 className="mb-6">Create New Password</h4>
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
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

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
                  name="confirm-password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Checkbox */}
              {/* <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div> */}
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="button" onClick={onLoginSubmit}>
                    Apply New Password
                  </Button>
                </div>
                {/* <div className="d-md-flex justify-content-between mt-4">
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
                </div> */}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </>
  );
};

// SignIn.Layout = AuthLayout;

export default NewPassword;
