import React, { useState,useEffect } from 'react'
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
// import widget as custom components
import { FormSelect, DropFiles } from "../../widgets";
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout';
import { postData } from '../api/post';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Uploadfile = () => {
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
    const countryOptions = [
        { value: "painting", label: "Painting" },
        { value: "drawing", label: "Drawing" },
        { value: "photo", label: "Photo" },
        { value: "other", label: "Other" },
    ]
    const [files, setFiles] = useState([]);
    const [files_2, setFiles_2] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    });

    const { getRootProps:getrootAfterProps, getInputProps:getInputAfterProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
        setFiles_2(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    });
  
    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <Image src={file.preview} style={img} alt={file.name} />
        </div>
      </div>
    ));
  
    const thumbs_2 = files_2.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <Image src={file.preview} style={img} alt={file.name} />
        </div>
      </div>
    ));
    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
        files_2.forEach((file) => URL.revokeObjectURL(file.preview));
      },
      [files,files_2]
    );
    const [street,setStreet] = useState("");
    const [town,setTown] = useState("");
    const [region,setRegion] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [type_2,setType_2] = useState("");
    const [date,setDate] = useState("");
    const [date_2,setDate_2] = useState("");
    const [comments,setComments] = useState("");
    
    const year = (new Date()).getFullYear() - 100;
    var years = Array.from(new Array(200),(val, index) => index + year);

    async function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = reject
      })
    }

    async function onUploadHandler(){

      if (files.length > 0 && files_2.length > 0){

        await getBase64(files[0]).then(async res =>{
          await getBase64(files_2[0]).then(async res_2 =>{
            const data = {
              "user_id":JSON.parse(localStorage.getItem("user_data")).id,
              "street":street,
              "town":town,
              "region":region,
              "description":description,
              "type":type,
              "image_src":res,
              "image_src_2":res_2,
              "date":date,
              "date_2":date_2,
              "comments":comments,
              "filename":files[0].name,
              "filename_2":files_2[0].name,
              "to_display":"false",
              "type_2":type_2
            }
            await postData("/upload_data",data).then(res=>{
              // window.location.href = "/gallery"
              const options = {
                title: 'Confirmation',
                message: 'Do you want to upload more images?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => window.location.href = "/upload-new"
                  },
                  {
                    label: 'No',
                    onClick: () => window.location.href = "/gallery"
                  }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                willUnmount: () => {},
                afterClose: () => {},
                onClickOutside: () => {},
                onKeypress: () => {},
                onKeypressEscape: () => {},
                overlayClassName: "overlay-custom-class-name"
              };
              
              confirmAlert(options);
            })
          }).then(res_2 =>{
              
          })    
          .then(res =>{
            console.log("response : "+res.result)
          }).catch(err=>{
            console.log("ERRRRRRRRR: "+err)
          })
        })

        
      }
      
    }

  return (

    
    <DefaultDashboardLayout>
    <Row className="mb-8" style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"2%"}}>
      {/* <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">
            Profile configuration settings{" "}
          </p>
        </div>
      </Col> */}
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6" style={{padding:"2%",textAlign:"center"}}>
              <h4 className="mb-1">This is a project to collect information about how the Victorian Landscape is evolving.<br></br>Please add a pair of images that show the landscape has changed over time.
              </h4>
            </div>
            <Row className="align-items-center mb-8">
              
            </Row>
            {/* col */}
            <Row className="mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                {/* heading */}
                <h5 className="mb-0">Images</h5>
              </Col>
              <Col md={9}>
                {/* dropzone input */}
                <div style={{display:"flex",justifyContent:"center",gap:"5%"}}>
                  
                <div>
                  <strong>Before</strong>
                <section className="container" style={{cursor:"pointer",padding:"10%",border:"1px solid #efefef"}}>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p className="text-center">Drag & drop an image here, or click to select image</p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
                </div>
                <div>
                  <strong>After</strong>
                <section className="container" style={{cursor:"pointer",padding:"10%",border:"1px solid #efefef"}}>
                <div {...getrootAfterProps({ className: 'dropzone' })}>
                  <input {...getInputAfterProps()} />
                  <p className="text-center">Drag & drop an image here, or click to select image</p>
                </div>
                <aside style={thumbsContainer}>{thumbs_2}</aside>
              </section>
                </div>
                  
                  {/* <Button variant="outline-white" type="submit">
                    Change{" "}
                  </Button> */}
                </div>
              </Col>
            </Row>
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              <Form>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Town <span className="text-muted">(Optional)</span>
                  </label>
                  <div className="col-md-8 col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Town"
                      id="town"
                      onChange={(e)=>{setTown(e.target.value)}}
                      required
                    />
                  </div>
                  

                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">
                    Region <span className="text-muted">(Optional)</span>
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Region"
                      id="region"
                      onChange={(e)=>{setRegion(e.target.value)}}
                    />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="email"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-8 col-12">
                    <textarea
                      type="email"
                      className="form-control"
                      multiple="true"
                      placeholder="Description e.g “Smith’s Farm"
                      id="description"
                      onChange={(e)=>{setDescription(e.target.value)}}
                      required
                    />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">
                    Year of before image 
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      
                      placeholder="Enter Date of image"
                      id="date"
                      onChange={(e)=>{setDate(e.target.value)}}
                    />
                  </Col>
                  {/* <Col md={8} xs={12}>
                  <Form.Select onChange={(e)=>{setDate(e.target.value)}}>
                  {
                    years.map((year, index) => {
                      return <option key={`year${index}`} value={year}>{year}</option>
                    })
                  }
                </Form.Select>
                </Col> */}
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">
                    Year of after image 
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Date of image"
                      id="date_2"
                      onChange={(e)=>{setDate_2(e.target.value)}}
                    />
                  </Col>
                  {/* <Col md={8} xs={12}>
                  <Form.Select onChange={(e)=>{setDate_2(e.target.value)}}>
                  {
                    years.map((year, index) => {
                      return <option key={`year${index}`} value={year}>{year}</option>
                    })
                  }
                </Form.Select>
                </Col> */}
                </Row>

                {/* Location */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">
                    Before Image Type
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      as={FormSelect}
                      placeholder="Select Type"
                      id="type"
                      options={countryOptions}
                      onChange={(e)=>{setType(e.target.value)}}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">
                    After Image Type
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      as={FormSelect}
                      placeholder="Select Type"
                      id="type"
                      options={countryOptions}
                      onChange={(e)=>{setType_2(e.target.value)}}
                    />
                  </Col>
                </Row>

                

               
                {/* Zip code */}
                <Row className="align-items-center">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Comments
                    <i className="fe fe-info fs-4 me-2 text-muted icon-xs"></i>
                  </Form.Label>

                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter comments"
                      id="comments"
                      required
                      onChange={(e)=>{setComments(e.target.value)}}
                    />
                  </Col>

                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    <Button variant="primary" type="button" onClick={onUploadHandler}>
                      Process
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </DefaultDashboardLayout>
  )
}

export default Uploadfile
