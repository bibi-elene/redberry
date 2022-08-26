import React, {useState} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";



const Laptop = () => {
    return (
        <>
        <div className='row'>
            <h2 className='col-6'> თანამშრომლის ინფო</h2>
            <h2 className='col-6'> ლეპტოპის მახასიათებლები</h2>
        </div>

            <div className='m-5'>
            <label for="files">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</label> <br />
            <label for="files">ICON</label> <br />
            <input type="file" id="files"/>
            </div>
            <Link to="/success">
            <button 
            className='btn btn-info m-5 px-5 py-2'>
            Next 
            </button>
            </Link>
        </>
    )
}

export default Laptop;