import React, {useState, useEffect} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";
import { useFormik } from 'formik';
import { validate} from 'graphql';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

const Details = () => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let {id} = useParams();
    const detailsUrl = `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=02d26493adc8273c9e598948b8e434f8`


    useEffect(() => {
        fetch(detailsUrl)
        .then((res) => {
            if(res.ok){  
                return res.json();
            }
        })
        .then((data) => {
            setDetails([data.data]);
        })
        .catch((error) => {
            console.error('Error loading data', error);
            setError(error)
        }) 
        .finally(() => {
            setLoading(false);
        })
        
},[id]);

/*
<article id={name} className="list-container " style={{backgroundColor: "#EAFAFF", margin: "30px", borderRadius: "20px", }}>
                    <img style={{float: "left", borderRadius: "10px", marginRight: "40px"}} width="auto" height="auto" src={`https://pcfy.redberryinternship.ge/${laptop.image}`} alt="img"></img>
                  <div className="details text-start align-items-center mt-4" style={{fontWeight: "700"}}>
                    <p className="">{user.name}</p>
                    <p className="">{laptop.name}</p>
                    <Link to={`/${laptop.id}`} key={laptop.id} style={{fontWeight: "100"}}>Click</Link>
                    </div>
              </article>
*/

if (details) {
    return (
<>                     
<h1> ლეპტოპის ინფო </h1>
<Link to="/" className='position-absolute' style={{top:15, left: 20}}><i className="bi bi-arrow-left-circle" style={{color: "black"}}></i></Link>
        <div className='row text-center justify-content-center align-items-center'>
            {
            details.map(({user, laptop, name, surname, id, brand_id, laptop_image}) => (
                <div key={id} className="list-container " style={{margin: "30px", borderRadius: "20px", }}>
                    <img style={{float: "left", borderRadius: "10px", marginRight: "40px"}} width="300px" height="auto" src={`https://pcfy.redberryinternship.ge/${laptop.image}`} alt="img"></img>
                    
                    <div className="details text-start align-items-center mt-4" style={{fontWeight: "700"}}>

                    <p> id: {laptop.brand_id}</p>
                    <p> name: {user.name}</p>
                    <p> surname: {user.surname}</p>
                    </div>
                </div>
                ))
            }
        </div>
    </>        
)
    }

    return (
        <div></div>
    )
}   

export default Details;