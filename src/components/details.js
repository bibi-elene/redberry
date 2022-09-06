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
    const [teams, setTeams] = useState(null);
    const [brand, setBrand] = useState(null);
    const [positions, setPositions] = useState(null);
    const {id} = useParams();
    const teamUrl = 'https://pcfy.redberryinternship.ge/api/teams';
    const positionUrl = 'https://pcfy.redberryinternship.ge/api/positions';
    const brandUrl = 'https://pcfy.redberryinternship.ge/api/brands';
    const detailsUrl = `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=02d26493adc8273c9e598948b8e434f8`;

    useEffect(() => {
        fetch(teamUrl)
        .then((res) => {
           if (res.ok){ 
            return res.json();
           }
           throw res;
        })
        .then((data) => {
           setTeams(data.data);
        })
        .catch((error) =>{
            console.error("error fetching data", error);
            setError(error);
        })
        .finally(()=>{
            setLoading(false);
        })

    }, []);

    useEffect(() => {
        fetch(positionUrl)
        .then((res) => {
           if (res.ok){ 
            return res.json();
           }
           throw res;
        })
        .then((data) => {
           setPositions(data.data);
        })
        .catch((error) =>{
            console.error("error fetching data", error);
            setError(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch(brandUrl)
        .then((res) => {
            if(res.ok){  
                return res.json();
            }
        })
        .then((data) => {
            setBrand(data.data);
        })
        .catch((error) => {
            console.error('Error loading data', error);
            setError(error)
        }) 
        .finally(() => {
            setLoading(false);
        })
    }, [])


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


if (details) {
    return (
<>           
<Link to="/redberry/list" className='position-absolute' style={{top:20, left: 40}}><i className="bi bi-arrow-left-circle" style={{color: "black"}}></i></Link>
<h1 className='m-5' style={{fontWeight: 700, fontSize: "2em"}}> ლეპტოპის ინფო </h1>
        <div className='container details-container text-center justify-content-between align-items-center'>
            {
            details.map(({user, laptop}) => (
                <div key={id} className="row justify-content-center text-center " style={{margin: "30px", borderRadius: "20px", }}>
                    <div className='row'>

                    <div className='user user-image mt-3'> 
                    <img style={{borderRadius: "10px", maxWidth: "100%"}} width="auto" height="auto" src={`https://pcfy.redberryinternship.ge/${laptop.image}`} alt="img"></img>
                    </div>

                    <div className="user details mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start px-5'> 
                    <p> სახელი: </p>
                    <p> თიმი: </p>
                    <p> პოზიცია: </p>
                    <p> მეილი: </p>                    
                    <p> ტელ. ნომერი: </p>
                    </div>
                    </div>

                    <div className="user details mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'> 
                    <p> <span>{user.name} {user.surname}</span></p>
                    {teams && teams.map(({id, name}) => (
                    <p key={id}> <span>{id == user.team_id ? name : null}</span></p>
                    ))}
                    {positions && positions.map(({id, name}) => (
                        <p key={id}> <span>{id == user.position_id ? name : null}</span></p>
                    ))}
                    
                    <p> <span>{user.email}</span></p>                    
                    <p> <span>{user.phone_number}</span></p>
                    </div>
                    </div>
                    </div>

                    
                <hr className='mt-5'/>


                    <div className='row'>
                    <div className="laptop align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'> 
                    <p> ლეპტოპის  სახელი: </p>
                    <p> ლეპტოპის ბრენდი: </p>
                    <p> RAM: </p>
                    <p> მეხსიერების ტიპი: </p>                    
                    </div>
                    </div>

                    <div className="laptop align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start px-5'> 
                    <p> <span>{laptop.name}</span></p>
                    {brand && brand.map(({id, name}) => (
                    <p key={id}> <span>{id == laptop.brand_id ? name : null}</span></p>
                    ))}                    
                    <p> <span>{laptop.ram}</span></p>                    
                    <p> <span>{laptop.hard_drive_type}</span></p>
                    </div>
                    </div>

                    <div className="laptop align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'> 
                    <p> CPU: </p>
                    <p> CPU-ს ბირთვი: </p>
                    <p> CPU-ს ნაკადი: </p>
                    </div>
                    </div>

                    <div className="laptop align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'> 
                    <p> <span>{laptop.cpu.name}</span></p>
                    <p> <span>{laptop.cpu.cores}</span></p>                    
                    <p> <span>{laptop.cpu.threads}</span></p>
                    </div>
                    </div>
                    </div>

                    <hr className='mt-5'/>
                    
                    <div className='row'>
                    <div className="laptop details align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'> 
                        <p> ლეპტოპის მდგომარეობა: </p>                    
                        <p> ლეპტოპის ფასი: </p>
                    </div>
                    </div>

                    <div className="laptop details align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'>
                    <p> <span>{laptop.state}</span></p>                    
                    <p> <span>{laptop.price} $ </span></p>
                    </div>
                    </div>

                    <div className="laptop details align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start px-5'>               
                    <p> შეძენის რიცხვი: </p>
                    </div>
                    </div>

                    <div className="laptop details align-items-center mt-4" style={{fontWeight: "700"}}>
                        <div className='text-start'>                
                    <p> <span>{laptop.purchase_date}</span></p>
                    </div>
                    </div>
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