import React, {useState, useEffect} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";
import { useFormik } from 'formik';
import { validate } from 'graphql';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import $ from 'jquery';





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
    
        
    const initialValues = {
        file: '',
        pcname: localStorage.getItem('pcname') !== undefined ? localStorage.getItem('pcname') : '',
        pcbrand: localStorage.getItem('pcbrand') !== undefined ? localStorage.getItem('pcbrand') : '',
        cpu: localStorage.getItem('cpu') !== undefined ? localStorage.getItem('cpu') : '',
        cpuprop1: localStorage.getItem('cpuprop1') !== undefined ? localStorage.getItem('cpuprop1') : '',
        cpuprop2: localStorage.getItem('cpuprop2') !== undefined ? localStorage.getItem('cpuprop2') : '',
        ram: localStorage.getItem('ram') !== undefined ? localStorage.getItem('ram') : '',
        memoryType: localStorage.getItem('memoryVal') !== undefined ? localStorage.getItem('memoryVal') : '',
        date: localStorage.getItem('date') !== undefined ? localStorage.getItem('date') : '',
        price: localStorage.getItem('price') !== undefined ? localStorage.getItem('price') : '',
        condition: localStorage.getItem('conditionVal') !== undefined ? localStorage.getItem('conditionVal') : ''
    }

    const onSubmit = (values) => {
        setFormData({
            ...formData, 
            file: values.file,
            pcname: values.pcname,
            pcbrand: values.pcbrand,
            cpu: values.cpu,
            cpuprop1: values.cpuprop1,
            cpuprop2: values.cpuprop2,
            ram: values.ram,
            memoryType: selectedType,
            date: values.date,
            price: values.price,
            condition: selectedCondition});
        
/*
            if (page === FormTitles.length - 1) {
              alert("FORM SUBMITTED", formData);
            } else {
              setPage((currPage) => currPage + 1);
            }
     */     
    }

    const validate = (values) => {

        /*
        let errors = {};
        if(!values.name) {errors.name = "Required"}
        if(values.name.length < 2) {errors.name = "2 სიმბოლო მინიმუმ"}
        else if(!(/^[ა-ჰ]+$/).test(values.name)) {errors.name = "გამოიყენე ქართული ასოები"}
        if(!values.surname) {errors.surname = "Required"}
        else if(!(/^[ა-ჰ]+$/).test(values.surname)) {errors.surname = "გამოიყენე ქართული"}
        if(values.surname.length < 2) {errors.surname = "2 სიმბოლო მინიმუმ"}
        if(!values.team) {errors.team = "Required"}
        if(!values.position) {errors.position = "Required"}
        if(!values.email) {errors.email = "Required"}
        else if(!values.email.endsWith("@redberry.ge")) {errors.email = "invalid format"}
        if(!values.phone) {errors.phone = "Required"}
        else if(!values.phone.startsWith('+995')) {errors.phone = "False format"}
        else if(values.phone.length !== 13) {errors.phone = "False format"}
        return errors;
        */
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    window.onbeforeunload = function() {
        localStorage.setItem('file', $('#file').val());
        localStorage.setItem('pcname', $('#pcname').val());
        localStorage.setItem('pcbrand', $("#pcbrand").val());
        localStorage.setItem('cpu', $("#cpu").val());
        localStorage.setItem('cpuprop1', $('#cpuprop1').val());
        localStorage.setItem('cpuprop2', $('#cpuprop2').val());
        localStorage.setItem('ram', $("#ram").val());
        localStorage.setItem('memoryVal', selectedType);
        localStorage.setItem('date', $("#date").val());
        localStorage.setItem('price', $("#price").val());
        localStorage.setItem('conditionVal', selectedCondition);
    }

    const saveData = () => {
        localStorage.setItem('file', $('#file').val());
        localStorage.setItem('pcname', $('#pcname').val());
        localStorage.setItem('pcbrand', $("#pcbrand").val());
        localStorage.setItem('cpu', $("#cpu").val());
        localStorage.setItem('cpuprop1', $('#cpuprop1').val());
        localStorage.setItem('cpuprop2', $('#cpuprop2').val());
        localStorage.setItem('ram', $("#ram").val());
        localStorage.setItem('memoryVal', selectedType);
        localStorage.setItem('date', $("#date").val());
        localStorage.setItem('price', $("#price").val());
        localStorage.setItem('conditionVal', selectedCondition);}

     // value of memoryType Radio
    //value of Condition Radio

    if (document.querySelector('input[name="memoryVal"]:checked')) {
        var selectedType = document.querySelector('input[name="memoryVal"]:checked').value
    } 
    if (document.querySelector('input[name="conditionVal"]:checked')) {
        var selectedCondition = document.querySelector('input[name="conditionVal"]:checked').value
    } 



    if (loading) return "Loading ..."
    if (error) return "Error: "


    console.log("Form Data", formData)


    return (
        <>
       
       <div className='row text-center justify-content-center' style={{fontSize: "12px"}}>

       <form onSubmit={formik.handleSubmit} style={{maxWidth: 900, minHeight: "100%"}}>
        <div className='row justify-content-center' style={{padding: "50px 70px 0 70px"}}>

        <div className='row align-content-center file-form mb-5' style={{minHeight: 150, maxHeight: 300, maxWidth: 700}}>
                <label htmlFor="file" style={{fontSize: "15px", fontWeight: "900", color: "#4386A9", padding: "15px", fontWeight: "500"}}>ჩააგდე ან ატვირტე <br /> ლეპტოპის ფოტო <br/></label>
                <label htmlFor='file'><a className='mt-4 btn btn-info' style={{color: "white", padding: "8px 40px", backgroundColor: "#62A1EB"}}>ატვირთე </a></label>
                <input key="file" type="file"
                id="file" name="file"
                accept="image/png, image/jpeg" 
                { ...formik.getFieldProps('file')}
                />
                    {formik.touched.file && formik.errors.file 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.file}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }  
        </div>

            <div className='row'>
                <div className='form-group col-6'>
                        <label htmlFor='pcname' className='' style={{float: "left"}}>ლეპტოპის სახელი</label>
                        <br />
                        <input key="pcname" id='pcname' className='form-control' type="text" name="pcname" 
                        {...formik.getFieldProps('pcname')}
                        />
                        {formik.touched.pcname && formik.errors.pcname 
                        ? 
                        <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.pcname}</small>                        
                        :
                        <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                        }                     
                    </div>

                <div className='form-group col-6' style={{marginTop: "18px"}}>
                <select key="pcbrand" id="pcbrand" name='pcbrand' className='form-control' required
                  {...formik.getFieldProps('pcbrand')}
                  style={{backgroundColor: "#EBEBEB", padding: "8px 24px"}}
                >
                    <option value="" disabled hidden>ლეპტოპის ბრენდი</option>
                        {brand && brand.map(({id, name, team_id}) => (
                            <option key={id}
                            >{name}</option>
                            ))}
                            {formik.touched.pcbrand && formik.errors.pcbrand 
                            ? 
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.pcbrand}</small>                        
                            :
                            <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                            }  
                </select>
                 
                </div>
            </div>

            <div className='row my-4'>
                <div className='form-group col-4' style={{marginTop: "34px"}}>
                <select key="cpu" id="cpu" name='cpu' className='form-control' required
                style={{backgroundColor: "#EBEBEB", padding: "8px 24px"}}
                    {...formik.getFieldProps('cpu')}
                    >
                    <option value="" disabled hidden>CPU</option>
                        {cpu && cpu.map(({id, name}) => (
                            <option key={id}
                            >{name}</option>
                        ))}

                            {formik.touched.cpu && formik.errors.cpu 
                            ? 
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.cpu}</small>                        
                            :
                            <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                            }  
                </select>
                 
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='cpuprop1' className='pb-3' style={{float: "left"}}>CPU-ს ბირთვი</label>
                <input 
                className='form-control' 
                type="number" 
                id='cpuprop1' 
                name="cpuprop1" 
                key="cpuprop1"
                {...formik.getFieldProps('cpuprop1')}
                />
                    {formik.touched.cpuprop1 && formik.errors.cpuprop1 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.cpuprop1}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }  
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='cpuprop2' className='pb-3' style={{float: "left"}}>CPU-ს ნაკადი</label>
                <input className='form-control' type="number" key="cpuprop2" id="cpuprop2" name="cpuprop2"
                {...formik.getFieldProps('cpuprop2')}
                />
                    {formik.touched.cpuprop2 && formik.errors.cpuprop2 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.cpuprop2}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
               
                </div>

            </div>

            <div className='row'>
            <div className='form-group col-6 my-3'>
                <label htmlFor='ram' className='pb-3' style={{float: "left"}}>ლეპტოპის RAM (GB)</label>
                <input className='form-control' type="number" name="ram" key="ram" id="ram"
                {...formik.getFieldProps('ram')}
                />
                    {formik.touched.ram && formik.errors.ram 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.ram}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
                
                </div>
            
            <div className='form-group col-6 my-3 text-start'>
                <label htmlFor='memoryVal' className='pb-4'>მეხსიერების ტიპი</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="memoryVal" id="memoryVal1" value="SSD" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">SSD</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="memoryVal" id="memoryVal2" value="HDD" />
                <label className="form-check-label" htmlFor="inlineRadio2">HDD</label>
                </div>
            </div>

            </div>

            <div className='row'>
                <div className='form-group col-6 my-3'>
                <label htmlFor="date" style={{float: "left"}}>შეძენის რიცხვი (არჩევითი)</label>
                <br />
                <input name='date' id="date" key="date" className='form-control mt-3' type="date"
                    {...formik.getFieldProps('date')}
                />
                </div>

                <div className='form-group col-6 my-3'>
                <label htmlFor='price' className='pb-3' style={{float: "left"}}>ლეპტოპის ფასი</label>
                <br />
                <input 
                 className='form-control'
                 type="number"
                 name="price" 
                 key="price"
                 id="price"
                {...formik.getFieldProps('price')}
                />
                    {formik.touched.price && formik.errors.price 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.price}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
                
                </div>
            </div>

        <div className="row justify-content-start text-start">
            <div className='form-group col-6 my-3'>
                <label htmlFor='conditionVal' className='pb-4'>ლეპტოპის მდგომარეობა</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" name="conditionVal" 
                id="conditionVal1" 
                key="conditionVal1" 
                value="ახალი" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">ახალი</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" 
                name="conditionVal" 
                id="conditionVal2" 
                key="conditionVal2" 
                value="მეორადი" />
                <label className="form-check-label" htmlFor="inlineRadio2">მეორადი</label>
                </div>
            </div>
        </div>
        
        <div className="footer text-center align-items-end ">

    <a
    className='m-5'
    style={{color: "#62A1EB", float: "left"}}
    disabled={page == 0}
    onClick={() => {
      setPage((currPage) => currPage - 1);
      saveData();
    }}>
        ეკან
    </a>
<button
    type='submit'
    className={page !== FormTitles.length - 1 ? 'btn btn-info m-4' : 'd-none'}
    style={{borderRadius: "8px", color: "white", backgroundColor: "#62A1EB", padding: "16px 45px", float: "right"}}
    >
    {page === FormTitles.length - 2 ? "დამახსოვრება" : "შემდეგი"}
    </button>
  </div>
  </div>

                </form>
            </div>


        </>
    )
}

export default Laptop;
