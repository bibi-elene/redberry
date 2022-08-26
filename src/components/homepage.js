import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../logo.png'
import Laptop from './laptop';
import Employee from './employee';
import Success from './success';
import Form from './form';
import { Link } from "react-router-dom";

const Homepage = () => {

    return (
        <div class="container justify-content-center">
            
            <img src={logo} alt='main-logo' width="auto" ></img>
            <div class="justify-content-center col-12">
            <Link to="/form">
            <button className='btn btn-info m-3 px-5 py-3'
             id="btn-add" style={{width: "300px"}} 
            
             > 
            ჩანაწერის დამატება </button>
            </Link>
            </div>

            <div class="justify-content-center col-12">
            <button className='btn btn-info px-5 py-3' 
            id="btn-data" style={{width: "300px"}}> 
            ჩანაწერის სია </button>
            </div>

        </div>
    )


}

export default Homepage;