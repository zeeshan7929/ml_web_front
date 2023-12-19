// import node module libraries
import { useState } from 'react';
import {Image} from 'react-bootstrap';
// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DefaultDashboardLayout = (props) => {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};	
	return (		
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`} >
			<div className="navbar-vertical navbar" >
				<NavbarVertical 
				
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
				<div className="nav-scroller">
          <Link href="/" className="navbar-brand" style={{position:"fixed",bottom:"0"}}>
		  <p style={{marginBottom:"-10%",textAlign:"center",marginRight:"11%",color:"#fff"}}>
                        This project is supported by <br></br>the Victorian Government<br></br>through Creative Victoria
                    </p>
            <Image src="/images/brand/logo/logo.png" style={{width:220,height:100,marginLef:"10%",}} alt="" />
			
          </Link>
        </div>
			</div>
			
			<div id="page-content" style={{backgroundColor:"#f1f5f9",padding:"0px !important"}}>
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				{props.children}
				
				{/* <div className='px-6 border-top py-3'>
					<Row>
						<Col sm={6} className='text-center text-sm-start mb-2 mb-sm-0'>
							<p className='m-0'>Made by <a href='https://codescandy.com/' target='_blank'>Codescandy</a></p></Col>
						<Col sm={6} className='text-center text-sm-end'>
							<p className='m-0'>Destributed by <a href='https://themewagon.com/' target='_blank'>ThemeWagon</a></p>
						</Col>
					</Row>
				</div> */}
			</div>
		</div>
	);
};
export default DefaultDashboardLayout;
