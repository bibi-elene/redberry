import { data } from 'jquery';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';




const List = () => {

    const dataUrl = 'https://pcfy.redberryinternship.ge/api/laptops?token=02d26493adc8273c9e598948b8e434f8';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = () => {
        fetch(dataUrl)
        .then((res) => {
            if(res.ok){  
                return res.json();
            }
        })
        .then((data) => {
            setData(data.data);
        })
        .catch((error) => {
            console.error('Error loading data', error);
            setError(error)
        }) 
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <h1 className='mt-5'> ჩანაწერის სია </h1>
            <Link to="/" className='position-absolute' style={{top:15, left: 20}}><i className="bi bi-arrow-left-circle" style={{color: "black"}}></i></Link>
            <div className='row page-container justify-content-center m-5'>
                {
                    data && data.map(({laptop, user, id, image, surname}) => (
                        
                <div key={laptop.id} className="row list-container align-items-center" style={{backgroundColor: "#EAFAFF", margin: "30px", borderRadius: "20px", padding: "10px"}}>
                    <div className='col-6'>
                    <img style={{float: "left", borderRadius: "10px", marginRight: "40px", maxWidth: "100%", maxHeight: "100%", padding: "10px"}} width="auto" height="auto" src={`https://pcfy.redberryinternship.ge/${laptop.image}`} alt="img"></img>
                    </div>
                    
                  <div className="col-6 details text-start align-items-center" style={{fontWeight: "700"}}>
                    <p className="">{user.name}  {user.surname}</p>
                    <p className="">{laptop.name}</p>
                    <Link to={`/${laptop.id}`} key={laptop.id} style={{fontWeight: "100"}}>მეტის ნახვა</Link>
                    </div>
              </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List