import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop';
import frame from '../frame.png'
import {Link} from 'react-router-dom';


const Success = ({formData, setFormData}) => {

    return (
        <div style={{backgroundColor: "#4A4A4A", height: "150vh", overflow: "hidden", margin: -50}}>
    <div className='row text-center justify-content-center align-items-center'>      
        <div style={{borderRadius: "8px", width: "700px", height: "auto", margin: "10%", padding: "50px",backgroundColor: "white"}} className="row success-row ">
            <div className='row justify-content-center'>
            <img style={{width: "200px", height:"200px"}} className='' src={frame} alt="logo"></img>
            <h2 style={{fontSize: "22px", marginBottom: "30px"}}>ჩანაწერი დამატებულია!</h2>
            </div>
            <div className='row text-center justify-content-center'>
            <Link to="/redberry/list" className='col-12 m-2 btn btn-info' style={{maxWidth: "300px", backgroundColor: "#62A1EB", color: "white", padding: "13px 35px"}}>სიის ნახვა</Link>
            <Link onClick={() => setFormData({name: "",
                surname: "",
                team_id: "",
                position_id: "",
                email: "",
                phone_number: "",
                laptop_image: "",
                laptop_name: "",
                laptop_brand_id: "",
                laptop_cpu: "",
                laptop_cpu_cores: "",
                laptop_cpu_threads: "",
                laptop_ram: "",
                laptop_hard_drive_type: "",
                laptop_purchase_date: "",
                laptop_price: "",
                laptop_state: "",
                token: ""})} to="/redberry" className='col-12 m-2' style={{maxWidth: "300px", color: "#62A1EB", padding: "13px 35px"}}>უკან დაბრუნება</Link>
            </div>
            </div>  
    </div>
</div>
    )
}

export default Success;