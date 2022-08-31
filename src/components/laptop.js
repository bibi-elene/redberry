import React, {useState, useEffect} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";
import { useFormik } from 'formik';
import { validate } from 'graphql';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';





const Laptop = ({formData, setFormData, page, setPage}) => {

    const FormTitles = ["Employee", "Laptop", "Success"]
    const brandUrl = 'https://pcfy.redberryinternship.ge/api/brands';
    const cpuUrl = 'https://pcfy.redberryinternship.ge/api/cpus'
    let [brand, setBrand] = useState(null);
    let [cpu, setCpu] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let values = useParams();

    const fetchBrands = () => {
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
    }

    const fetchCpu = () => {
        fetch(cpuUrl)
        .then((res) => {
            if(res.ok){ 
                return res.json();
            }
        })
        .then((data) => {
            setCpu(data.data);
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
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchCpu();
    }, []);

    var memoryRadios = document.getElementsByName("memoryVal");
    var conditionRadios =  document.getElementsByName("conditionVal");
    var memoryVal = localStorage.getItem('memoryVal');
    var conditionVal = localStorage.getItem('conditionVal');


    if (loading) return "Loading ..."
    if (error) return "Error: "

    console.log("Form Data", formData)

    return (
        <>
       
    <div className='row mt-2 justify-content-center' style={{fontSize: "12px"}}>

    <div className='row justify-content-center '>
        <form className='m-4' style={{maxWidth: 600}}>
        <div className='row file-form mb-5' style={{minHeight: 200, maxWidth: "600px"}}>
            <label htmlFor="file" style={{fontSize: "15px", fontWeight: "900", color: "rgb(107, 168, 214)"}}>ჩააგდე ან ატვირთე <br /> ლეპტოპის ფოტო <br/> 
            <a className='btn btn-info m-5' style={{color: "white"}}>ატვირთე</a>
            </label>
            <input type="file"
            id="file" name="file"
            accept="image/png, image/jpeg" 
            value={formData.file}
            onChange={(event) =>
            setFormData({ ...formData, file: event.target.value })
            }/>
                </div>
            <div className='row'>
                <div className='form-group col-6'>
                <label htmlFor='pcname' className='text-start' style={{float: "left"}}>ლეპტოპის სახელი</label>
                <input name="pcname" id='pcName' className='form-control' type="text"
                   value={formData.pcname}
                   onChange={(event) =>
                   setFormData({ ...formData, pcname: event.target.value })
                   }
                 />
               
                </div>

                <div className='form-group col-6' style={{marginTop: "18px"}}>
                <select name='pcbrand' className='form-control' required
                >
                        
                    <option value="" disabled hidden>ლეპტოპის ბრენდი</option>
                        {brand && brand.map(({id, name, team_id}) => (
                            <option key={id}
                            value={formData.pcbrand}
                            onChange={(event) =>
                            setFormData({ ...formData, pcbrand: event.target.value })
                            }>{name}</option>
                        ))}
                </select>
                 
                </div>
            </div>

            <div className='row my-4'>
                <div className='form-group col-4' style={{marginTop: "34px"}}>
                <select name='cpu' className='form-control' required
                    >
                    <option value="" disabled hidden>CPU</option>
                        {cpu && cpu.map(({id, name}) => (
                            <option key={id}
                            value={formData.cpu}
                            onChange={(event) =>
                            setFormData({ ...formData, cpu: event.target.value })
                            }>{name}</option>
                        ))}
                </select>
                 
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='cpuprop1' className='pb-3' style={{float: "left"}}>CPU-ს ბირთვი</label>
                <input 
                className='form-control' 
                type="number" 
                id='cpuprop1' 
                name="cpuprop1" 
                   value={formData.cpuprop1}
                   onChange={(event) =>
                   setFormData({ ...formData, cpuprop1: event.target.value })
                   }
                />
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='cpuprop2' className='pb-3' style={{float: "left"}}>CPU-ს ნაკადი</label>
                <input className='form-control' type="number" name="cpuprop2"
                value={formData.cpuprop2}
                onChange={(event) =>
                setFormData({ ...formData, cpuprop2: event.target.value })
                }
                />
               
                </div>

            </div>

            <div className='row'>
            <div className='form-group col-6 my-3'>
                <label htmlFor='ram' className='pb-3' style={{float: "left"}}>ლეპტოპის RAM (GB)</label>
                <input className='form-control' type="number" name="ram" 
                value={formData.ram}
                onChange={(event) =>
                setFormData({ ...formData, ram: event.target.value })
                }
                />
                
                </div>
            
            <div className='form-group col-6 my-3 text-start'>
                <label htmlFor='memoryVal' className='pb-4'>მეხსიერების ტიპი</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="memoryVal" id="memoryVal1" value="memoryVal1" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">SSD</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="memoryVal" id="memoryVal2" value="memoryVal2" />
                <label className="form-check-label" htmlFor="inlineRadio2">HDD</label>
                </div>
            </div>

            </div>

            <div className='row'>
                <div className='form-group col-6 my-3'>
                <label htmlFor="date" style={{float: "left"}}>შეძენის რიცხვი (არჩევითი)</label>
                <br />
                <input name='date' className='form-control mt-3' type="date"
                value={formData.date}
                onChange={(event) =>
                setFormData({ ...formData, date: event.target.value })
                }
                />
                </div>

                <div className='form-group col-6 my-3'>
                <label htmlFor='price' className='pb-3' style={{float: "left"}}>ლეპტოპის ფასი</label>
                <br />
                <input className='form-control' type="number" name="price" 
                value={formData.price}
                onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
                }
                />
                
                </div>
            </div>

        <div className="row justify-content-start text-start">
            <div className='form-group col-6 my-3'>
                <label htmlFor='conditionVal' className='pb-4'>ლეპტოპის მდგომარეობა</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="conditionVal" id="conditionVal1" value="conditionVal1" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">ახალი</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="conditionVal" id="conditionVal2" value="conditionVal2" />
                <label className="form-check-label" htmlFor="inlineRadio2">მეორადი</label>
                </div>
            </div>
        </div>
        
        <div className="footer">

<button
    className='btn btn-info m-5 px-5 py-2'
    disabled={page == 0}
    onClick={() => {
      setPage((currPage) => currPage - 1);
    }}>
        ეკან
    </button>
<button
    type='submit'
    className={page !== FormTitles.length - 1 ? 'btn btn-info m-5 px-5 py-2' : 'd-none'}
    onClick={() => {
      if (page === FormTitles.length) {
        alert("FORM SUBMITTED", formData);
        console.log(formData);
      } else {
        setPage((currPage) => currPage + 1);
      }
    }}>
    {page === FormTitles.length ? "დამახსოვრება" : "შემდეგი"}
    </button>
  </div>
                </form>
            </div>

        </div>

        </>
    )
}

export default Laptop;
