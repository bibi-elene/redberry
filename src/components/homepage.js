import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import layer from '../Layer1.png'
import logo from '../LOGO-02 1.png'
import Laptop from './laptop';
import Employee from './employee';
import Success from './success';
import Form from './form';
import { Link } from "react-router-dom";

const Homepage = () => {

    return (
        <div style={{backgroundColor: "white", height: "100vh", overflow: "hidden"}}>
        <div style={{backgroundColor: "white"}} className="container homepage-container m-5 justify-content-center align-items-center">
            <div className=''>
            <img className='' width="auto" src={logo} alt="logo"></img>
            </div>
            <div>
            <img className='p-5 homepage-img justify-content-center text-center' src={layer} alt='hero' width="100%" style={{maxWidth: "800px"}}></img>
            </div>

            <div className="row homepage">

        <div className='row justify-content-center'>
            <Link to="/form" className='btn btn-info my-3 mx-2'
            style={{fontSize: "20px", width: "auto",borderRadius: "8px", color: "white", backgroundColor: "#62A1EB", padding: "18px 60px", width: "350px"}}
            id="btn-add">
            ჩანაწერის დამატება 
            </Link>
            </div>

            <div className='row justify-content-center'>
            <Link to="/list" className='btn btn-info my-1 mx-2'
            style={{fontSize: "20px", width: "auto",borderRadius: "8px", color: "white", backgroundColor: "#62A1EB", padding: "18px 60px", width: "350px"}}
            id="btn-add">
            ჩანაწერის სია 
            </Link>
            </div>
            </div>

        </div>
        </div>
    )


}

export default Homepage;