import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Landingpage = () => {
  return (
    <div>
      <header>
        <div class="container">
            <nav class="navbar navbar-dark bg-transparenet">
                <Link class="navbar-brand" href="#">
                
                <Image style={{width:"250px",height:"120px"}} src='/images/brand/logo/logo.png' alt="logo"/>
                <p style={{marginTop:"-15%",textAlign:"center",marginRight:"11%"}}>
                        This project is supported by <br></br>the Victorian Government<br></br>through Creative Victoria
                    </p>
                
                </Link>
                {/* <span class="navbar-text ml-auto d-none d-sm-inline-block">978-130-5444 </span> */}
                <span class="navbar-text d-none d-sm-inline-block" style={{color:"gray"}}>leach.samuel@gmail.com</span>
            </nav>
        </div>
    </header>
    <div class="" style={{padding:"10%"}}>
        <div class="container">
            <h1 class="page-title">Shaping the Future of Victorian Landscapes with AI</h1>
            <p class="page-description">An upcoming artistic project by Sam Leach that harnesses the power of AI to influence the future of Victorian landscapes.
            We'll be inviting you to share before and after images of landscapes and giving you the opportunity to actively participate in shaping the future through AI-driven design.
            Stay tuned for updates.
            </p>
            <p>Stay connected</p>
            <nav class="footer-social-links">
                <a href="#!" class="social-link"><i class="mdi mdi-facebook-box"></i></a>
                <a href="#!" class="social-link"><i class="mdi mdi-twitter"></i></a>
                <a href="#!" class="social-link"><i class="mdi mdi-google"></i></a>
                <a href="#!" class="social-link"><i class="mdi mdi-slack"></i></a>
                <a href="#!" class="social-link"><i class="mdi mdi-skype"></i></a>
            </nav>
        </div>
    </div>
    </div>
  )
}

export default Landingpage
