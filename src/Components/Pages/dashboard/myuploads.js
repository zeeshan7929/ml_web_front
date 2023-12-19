import  { useEffect, useState } from 'react'
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { postData } from '../api/post';
import { Image, Shimmer } from 'react-shimmer'
const Myuploads = () => {

    const BaseURL = "http://localhost:5000";

    const [Item,SetItem] = useState([]);
    const [user_ids,setuser_ids] = useState([]); 
    var localdata = JSON.parse(localStorage.getItem("user_data"))
    var id = localdata.id;
    var myname = localdata.f_name + " "+localdata.l_name;

    async function fetchMyUploads(){
        
        // if (id == null){window.location.href = "/signin"}
        await postData("/get_my_uploads",{"user_id":String(id)})
        .then(res =>{
            SetItem(res.result);
            var ls = []
            res.result.map((e)=>{
                ls.push(e[1])
            })
            setuser_ids(ls)
        }).catch(err =>{
            console.log(err);
        });
    }

    async function DeleteItem(id){
        await postData("/delete_item",{"id":String(id)})
        .then(res =>{
            if (res.result === "OK"){
                fetchMyUploads()
            }
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
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"20px",flexWrap:"wrap"}} className="mt-10">
                
            {
                Item.map((i) => {
                    return (
                        <Card className="smooth-shadow-md">
          
                        <Card.Body className="p-6">
                            <div className="mb-4">
                            <Link href="/">
                            <p className="mb-2" style={{"fontSize":18}}>Uploaded by {myname}  </p>
                            
                            </Link>
                            <p className="mb-1">Before Image Type <strong>{i[11 + 2]}</strong></p>
                            <p className="mb-1">After Image Type <strong>{i[11 + 7]}</strong></p>
                            <p className="mb-1">Town <strong>{i[7 + 2]}</strong></p>
                            
                            <p className="mb-1">Region <strong>{i[8 + 2]}</strong></p>
                            <p className="mb-1">Date Image Before <strong>{i[10 + 2]}</strong></p>
                            <p className="mb-1">Date Image After <strong>{i[10 + 7]}</strong></p>
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
                            <div className="" style={{marginTop:"5%",display:"flex",flexDirection:"row-reverse"}}>
                            <Button variant="primary" type="button" onClick={()=>{DeleteItem(i[0])}}>
                                Delete
                            </Button>
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

export default Myuploads
