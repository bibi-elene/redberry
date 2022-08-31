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
        <div className="container m-5 justify-content-center align-items-center">
            <div className=''>
            <img className='' width="auto" src={logo} alt="logo"></img>
            </div>
            <div>
            <img className='p-5 justify-content-center text-center' src={layer} alt='hero' width="100%" style={{maxWidth: "800px"}}></img>
            </div>
            <div className="justify-content-center ">
            <Link to="/form">
            <button className='btn btn-info my-3 px-5 py-3'
             id="btn-add" style={{width: "300px"}} 
            
             > 
            ჩანაწერის დამატება </button>
            </Link>
            </div>

            <div className="justify-content-center ">
            <button className='btn btn-info px-5 py-3' 
            id="btn-data" style={{width: "300px"}}> 
            ჩანაწერის სია </button>
            </div>

        </div>
    )


}

export default Homepage;