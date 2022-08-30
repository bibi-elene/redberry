import React, {useState, useEffect} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";
import { useFormik } from 'formik';
import { validate } from 'graphql';
import { useNavigate } from 'react-router-dom'




const Laptop = () => {

    const brandUrl = 'https://pcfy.redberryinternship.ge/api/brands';
    const cpuUrl = 'https://pcfy.redberryinternship.ge/api/cpus'
    let [brand, setBrand] = useState(null);
    let [cpu, setCpu] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const initialValues = {
        file: localStorage.getItem('file') == 'undefined' ? '' : localStorage.getItem('file'),
        pcname: localStorage.getItem('pcname') == 'undefined' ? '' : localStorage.getItem('pcname'),
        pcbrand: localStorage.getItem('pcbrand') == 'undefined' ? '' : localStorage.getItem('pcbrand'),
        cpu: localStorage.getItem('cpu') == 'undefined' ? '' : localStorage.getItem('cpu'),
        cpuprop1: localStorage.getItem('cpuprop1') == 'undefined' ? '' : localStorage.getItem('cpuprop1'),
        cpuprop2: localStorage.getItem('cpuprop2') == 'undefined' ? '' : localStorage.getItem('cpuprop2'),
        ram: localStorage.getItem('ram') == 'undefined' ? '' : localStorage.getItem('ram'),
        memoryType: localStorage.getItem('memoryType') == 'undefined' ? '' : localStorage.getItem('memoryType'),
        date: localStorage.getItem('date') == 'undefined' ? '' : localStorage.getItem('date'),
        price: localStorage.getItem('price') == 'undefined' ? '' : localStorage.getItem('price'),
        condition: localStorage.getItem('condition') == 'undefined' ? '' : localStorage.getItem('condition')
    }

    const onSubmit = (values) => {
        console.log('Form data', values);
        navigate('/success')
    }

    const validate = (values) => {
        let errors = {};
        if(!values.file) {errors.file = "Required"}
        if(!values.pcname) {errors.pcname = "Required"}
        if(!values.pcbrand) {errors.pcbrand = "Required"}
        if(!values.cpu) {errors.cpu = "Required"}
        if(!values.cpuprop1) {errors.cpuprop1 = "Required"}
        if(!values.cpuprop2) {errors.cpuprop2 = "Required"}
        if(!values.ram) {errors.ram = "Required"}
        if(!values.memoryType) {errors.memoryType = "Required"}
        if(!values.date) {errors.date = "Required"}
        if(!values.price) {errors.price = "Required"}
        if(!values.condition) {errors.condition = "Required"}


        return errors;
    }

    const formik = useFormik({
        initialValues, 
        onSubmit, 
        validate
    })

    if (loading) return "Loading ..."
    if (error) return "Error: "

    return (
        <>
        <Form />
       
    <div className='row mt-2 justify-content-center' style={{fontSize: "12px"}}>

    <div className='row justify-content-center '>
        <form onSubmit={formik.handleSubmit} className='m-5' style={{maxWidth: 600}}>

            <div className='row file-form m-4 justify-content-center' style={{width: "auto", maxWidth: 600, maxHeight: 280}}>
            <label htmlFor="files col"><i className="bi bi-exclamation-triangle"></i></label> <br />         
            <label htmlFor="files col" className="mb-4">ჩააგდე ან ატვირთე ლეპტოპის ფოტო <br /> </label>
            <label htmlFor="files col" style={{zIndex:1, width: 150}} className='btn btn-info mt-3'>ატვირთე</label>
            <input style={{zIndex:1}} className='col-12' type="file" id="files"/>
                </div>

            <div className='row'>
                <label className='text-start'>ლეპტოპის სახელი</label>
                <div className='form-group col-6'>
                <input id='pcName' name="pcName" className='form-control' pattern=".{3,}" required title="3 characters minimum" type="text"/>
                </div>

                <div className='form-group col-6'>
                <select defaultValue="" className='form-control' required>
                    <option value="" disabled hidden>ლეპტოპის ბრენდი</option>
                        {brand && brand.map(({id, name, team_id}) => (
                            <option key={id}>{name}</option>
                        ))}
                </select>
                </div>
            </div>

            <div className='row'>
                <div className='form-group col-4 my-3'>
                <select defaultValue="" className='form-control' required>
                    <option value="" disabled hidden>CPU</option>
                        {cpu && cpu.map(({id, name}) => (
                            <option key={id}>{name}</option>
                        ))}
                </select>
                </div>

                <div className='form-group col-4 my-3'>
                <input className='form-control' type="number" name="someid" />
                <small id="emailHelp" className="form-text text-muted" style={{float: "left"}}>მხოლოდ ციფრები</small>
                </div>

                <div className='form-group col-4 my-3'>
                <input className='form-control' type="number" name="someid" />
                <small id="emailHelp" className="form-text text-muted"  style={{float: "left"}}>მხოლოდ ციფრები</small>
                </div>

            </div>

            <div className='row'>
            <div className='form-group col-6 my-3'>
                <label className='pb-3' style={{float: "left"}}>ლეპტოპის RAM (GB)</label>
                <input className='form-control' type="number" name="someid" />
                <small id="emailHelp" className="form-text text-muted"  style={{float: "left"}}>მხოლოდ ციფრები</small>
                </div>
            
            <div className='form-group col-6 my-3 text-start'>
                <label className='pb-4'>მეხსიერების ტიპი</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">SSD</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">HDD</label>
                </div>
            </div>

            </div>

            <div className='row'>
                <div className='form-group col-6 my-3'>
                <label htmlFor="purchase" style={{float: "left"}}>შეძენის რიცხვი (არჩევითი)</label>
                <br />
                <input className='form-control mt-3' type="date" id="birthday" name="birthday"/>
                </div>

                <div className='form-group col-6 my-3'>
                <label className='pb-3' style={{float: "left"}}>ლეპტოპის ფასი</label>
                <br />
                <input className='form-control' type="number" name="someid" />
                <small id="emailHelp" className="form-text text-muted" style={{float: "left"}}>მხოლოდ ციფრები</small>
                </div>
            </div>
        <div className="row justify-content-start text-start">
            <div className='form-group col-6 my-3'>
                <label className='pb-4'>მეხსიერების ტიპი</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">SSD</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">HDD</label>
                </div>
            </div>
        </div>

        <div className="row my-4"> 
            <Link to="/employee" className='col-6 text-start'>
                <p className='back'>უკან</p>
            </Link>

            <button 
            type='submit'
            className='btn btn-info px-5 py-2'>
             დამახსოვრება
            </button>
        </div>

                </form>
            </div>

        </div>

        </>
    )
}

export default Laptop;
