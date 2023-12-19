// import node module libraries
import { Fragment, useEffect, useState } from "react";

import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap';


import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'

import { Link } from "react-router-dom";
import './white.css'
import { postData } from "../api/post";
import { Shimmer , Image } from "react-shimmer";
const Gallery = () => {
    const [item,setItem] = useState([]);

     

    async function fetchMyUploads(){
        await postData("/get_public_gallery_uplaods",{})
        .then(res =>{
            var preRes = res.result;
            setItem(preRes);
            
        }).catch(err =>{
            console.log(err);
        });
    }


    useEffect( ()=>{
        fetchMyUploads();
    },[])

    
    return (
        
            <DefaultDashboardLayout>
            <div style={{textAlign:"center",paddingBottom:"0px !important",paddingTop:"0px !important"}} className=" pt-5">
                <h1></h1>
            </div>
            <div style={{display:"flex",flexDirection:"row-reverse",justifyContent:"center",gap:"20px",flexWrap:"wrap"}} className="mt-10">
                
            {
                item.map((i) => {
                    return (
                        <Card className="smooth-shadow-md">
          
                        <Card.Body className="p-6">
                            <div className="mb-4">
                            <Link href="/">
                            <p className="mb-2" style={{"fontSize":18}}>Uploaded by {i[14 + 5]}  </p>
                            
                            </Link>
                            <p className="mb-1">Before Image Type <strong>{i[11 + 2]}</strong></p>
                            <p className="mb-1">After Image Type <strong>{i[11 + 7]}</strong></p>
                            <p className="mb-1">Town <strong>{i[7 + 2]}</strong></p>
                            <p className="mb-1">Region <strong>{i[8 + 2]}</strong></p>
                            <p className="mb-1">Date Before <strong>{i[10 + 2]}</strong></p>
                            <p className="mb-1">Date After <strong>{i[10 + 7]}</strong></p>
                            <p className="mb-1">Description <strong>{i[9 + 2]}</strong></p>
                            <p className="mb-1">Comments <strong>{i[12 + 2]}</strong></p>
                            

                            </div>
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                                <div>
                                <h5>Before</h5>
                                <img height={200} width={200} fallback={<Shimmer width={200} height={200} />} src= {"https://api.futurelandscape.art/imgs/"+ i[3]} alt="" />
                                </div>

                                <div>
                                <h5>After</h5>
                                <img height={200} width={200} fallback={<Shimmer width={200} height={200} />} src= {"https://api.futurelandscape.art/imgs/"+ i[5]} alt="" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    );

                    
                })
            }
            
       
            </div>
            </DefaultDashboardLayout>
        
    )
}
export default Gallery;
