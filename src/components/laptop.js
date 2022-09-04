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
    const [image, setImage] = useState('')
  

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

    useEffect((values) => {
        ;
    }, []);
    
        
    const initialValues = {
        laptop_image: '',
        laptop_name: localStorage.getItem('laptop_name') !== undefined ? localStorage.getItem('laptop_name') : '',
        laptop_brand_id: localStorage.getItem('laptop_brand_id') !== undefined ? localStorage.getItem('laptop_brand_id') : '',
        laptop_cpu: localStorage.getItem('laptop_cpu') !== undefined ? localStorage.getItem('laptop_cpu') : '',
        laptop_cpu_cores: localStorage.getItem('laptop_cpu_cores') !== undefined ? localStorage.getItem('laptop_cpu_cores') : '',
        laptop_cpu_threads: localStorage.getItem('laptop_cpu_threads') !== undefined ? localStorage.getItem('laptop_cpu_threads') : '',
        laptop_ram: localStorage.getItem('laptop_ram') !== undefined ? localStorage.getItem('laptop_ram') : '',
        laptop_hard_drive_type: localStorage.getItem('laptop_hard_drive_type'),
        laptop_purchase_date: localStorage.getItem('laptop_purchase_date') !== undefined ? localStorage.getItem('laptop_purchase_date') : '',
        laptop_price: localStorage.getItem('laptop_price') !== undefined ? localStorage.getItem('laptop_price') : '',
        laptop_state: localStorage.getItem('laptop_state')
    }

    const my_token = '02d26493adc8273c9e598948b8e434f8'
    const url = 'https://pcfy.redberryinternship.ge/api/laptop/create';

    const onSubmit = (values) => {
        
        setFormData({
            ...formData, 
            laptop_image: values.laptop_image,
            laptop_name: values.laptop_name,
            laptop_brand_id: selectedBrand,
            laptop_cpu: values.laptop_cpu,
            laptop_cpu_cores: values.laptop_cpu_cores,
            laptop_cpu_threads: values.laptop_cpu_threads,
            laptop_ram: values.laptop_ram,
            laptop_hard_drive_type: selectedType,
            laptop_purchase_date: values.laptop_purchase_date,
            laptop_price: values.laptop_price,
            laptop_state: selectedCondition,
            });        

            let data = new FormData();
            data.append('name', formData.name);
            data.append('surname', formData.surname);
            data.append('team_id', formData.team_id);
            data.append('position_id', formData.position_id);
            data.append('email', formData.email);
            data.append('phone_number', formData.phone_number);
            data.append('laptop_image', document.getElementById('laptop_image').files[0]);
            data.append('laptop_brand_id', formData.laptop_brand_id);
            data.append('laptop_cpu', formData.laptop_cpu);
            data.append('laptop_name', formData.laptop_name);
            data.append('laptop_brand_id', formData.laptop_brand_id);
            data.append('laptop_cpu_cores', formData.laptop_cpu_cores);
            data.append('laptop_cpu_threads', formData.laptop_cpu_threads);
            data.append('laptop_ram', formData.laptop_ram);
            data.append('laptop_hard_drive_type', formData.laptop_hard_drive_type);
            data.append('laptop_purchase_date', formData.laptop_purchase_date);
            data.append('laptop_price', formData.laptop_price);
            data.append('laptop_state', formData.laptop_state);
            data.append('token', my_token);

            const requestOptions = {
                method: 'POST',
                body: data
            }



            fetch(url, requestOptions)
                .then((res) => {
                if(res.ok){  
                    return res.json();
                    }
                })

                .catch(error => console.error(error))

        }

    const regex = (/^[A-Za-z0-9!@#$%^&*()_+=]+$/)


    const validate = (values) => {
        
        let errors = {};
       
        return errors;
        
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    const saveData = () => {
        localStorage.setItem('laptop_image', $('#laptop_image').val());
        localStorage.setItem('laptop_name', $('#laptop_name').val());
        localStorage.setItem('laptop_brand_id', $("#laptop_brand_id").val());
        localStorage.setItem('laptop_cpu', $("#laptop_cpu").val());
        localStorage.setItem('laptop_cpu_cores', $('#laptop_cpu_cores').val());
        localStorage.setItem('laptop_cpu_threads', $('#laptop_cpu_threads').val());
        localStorage.setItem('laptop_ram', $("#laptop_ram").val());
        localStorage.setItem('laptop_hard_drive_type', selectedType);
        localStorage.setItem('laptop_purchase_date', $("#laptop_purchase_date").val());
        localStorage.setItem('laptop_price', $("#laptop_price").val());
        localStorage.setItem('laptop_state', selectedCondition);  
    }

    window.onbeforeunload = function() {
        saveData();
    }

     // value of laptop_hard_drive_type Radio
    //value of Condition Radio

    if (document.querySelector('input[name="laptop_hard_drive_type"]:checked')) {
        var selectedType = document.querySelector('input[name="laptop_hard_drive_type"]:checked').value
    } 
    if (document.querySelector('input[name="laptop_state"]:checked')) {
        var selectedCondition = document.querySelector('input[name="laptop_state"]:checked').value
    } 


const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'hxvgjgxa')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dt6ciyw6x/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
  }

  var selectBrand = document.getElementById('laptop_brand_id');

if (brand) {
  if (selectBrand.options[selectBrand.selectedIndex]) {
    var selectedBrand = selectBrand.options[selectBrand.selectedIndex].id;
    }
}        



    if (loading) return ("Loading ...")
    if (error) return "Error: "


    return (
        <>
       
       <div className='row text-center justify-content-center' style={{fontSize: "12px"}}>

       <form onSubmit={formik.handleSubmit} style={{maxWidth: 900, minHeight: "100%"}}>
        <div className='row justify-content-center' style={{padding: "50px 70px 0 70px"}}>

        <div className='row align-content-center file-form mb-5' style={{minHeight: 150, maxHeight: 300, maxWidth: 700}}>
                <label htmlFor="laptop_image" style={{fontSize: "15px", fontWeight: "900", color: "#4386A9", padding: "15px", fontWeight: "500"}}>ჩააგდე ან ატვირტე <br /> ლეპტოპის ფოტო <br/></label>
                <label htmlFor='laptop_image'><a className='mt-4 btn btn-info' style={{color: "white", padding: "8px 40px", backgroundColor: "#62A1EB"}}>ატვირთე </a></label>
                <input key="laptop_image" 
                type="file"
                id="laptop_image" 
                name="laptop_image"
                accept="image/png, image/jpeg" 
                {...formik.getFieldProps('laptop_image')}
                />
                    {formik.touched.laptop_image && formik.errors.laptop_image 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_image}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }  
        </div>

        <div className='row'>
                <div className='form-group col-6'>
                        <label htmlFor='laptop_name' className='' style={{float: "left"}}>ლეპტოპის სახელი</label>
                        <br />
                        <input key="laptop_name" id='laptop_name' className='form-control' type="text" name="laptop_name" 
                        {...formik.getFieldProps('laptop_name')}
                        />
                        {formik.touched.laptop_name && formik.errors.laptop_name 
                        ? 
                        <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_name}</small>                        
                        :
                        <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                        }                     
                    </div>

                <div className='form-group col-6' style={{marginTop: "18px"}}>
                <select key="laptop_brand_id" id="laptop_brand_id" name='laptop_brand_id' className='form-control' required
                  {...formik.getFieldProps('laptop_brand_id')}
                  style={{backgroundColor: "#EBEBEB", padding: "8px 24px"}}
                >
                    <option value="" disabled hidden>ლეპტოპის ბრენდი</option>
                        {brand && brand.map(({id, name}) => (
                            <option id={id} key={id}>{name}</option>
                            ))}
                           
                </select>
                            {formik.touched.laptop_brand_id && formik.errors.laptop_brand_id 
                            ? 
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_brand_id}</small>                        
                            :
                            <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                            }  
                 
                </div>
            </div>

            <div className='row my-4'>
                <div className='form-group col-4' style={{marginTop: "34px"}}>
                <select key="laptop_cpu" id="laptop_cpu" name='laptop_cpu' className='form-control' required
                style={{backgroundColor: "#EBEBEB", padding: "8px 24px"}}
                    {...formik.getFieldProps('laptop_cpu')}
                    >
                    <option value="" disabled hidden>CPU</option>
                        {cpu && cpu.map(({id, name}) => (
                            <option key={id}
                            >{name}</option>
                        ))}      
                </select>
                            {formik.touched.laptop_cpu && formik.errors.laptop_cpu 
                            ? 
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.cpu}</small>                        
                            :
                            <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                            } 
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='laptop_cpu_cores' className='pb-3' style={{float: "left"}}>CPU-ს ბირთვი</label>
                <input 
                className='form-control' 
                type="number" 
                id='laptop_cpu_cores' 
                name="laptop_cpu_cores" 
                key="laptop_cpu_cores"
                {...formik.getFieldProps('laptop_cpu_cores')}
                />
                    {formik.touched.laptop_cpu_cores && formik.errors.laptop_cpu_cores 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_cpu_cores}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }  
                </div>

                <div className='form-group col-4 '>
                <label htmlFor='laptop_cpu_threads' className='pb-3' style={{float: "left"}}>CPU-ს ნაკადი</label>
                <input className='form-control' type="number" key="laptop_cpu_threads" id="laptop_cpu_threads" name="laptop_cpu_threads"
                {...formik.getFieldProps('laptop_cpu_threads')}
                />
                    {formik.touched.laptop_cpu_threads && formik.errors.laptop_cpu_threads 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_cpu_threads}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
               
                </div>

            </div>

            <div className='row'>
            <div className='form-group col-6 my-3'>
                <label htmlFor='laptop_ram' className='pb-3' style={{float: "left"}}>ლეპტოპის laptop_ram (GB)</label>
                <input className='form-control' type="number" name="laptop_ram" key="laptop_ram" id="laptop_ram"
                {...formik.getFieldProps('laptop_ram')}
                />
                    {formik.touched.laptop_ram && formik.errors.laptop_ram 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_ram}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
                
                </div>
            
            <div className='form-group col-6 my-3 text-start'>
                <label htmlFor='laptop_hard_drive_type' className='pb-4'>მეხსიერების ტიპი</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="laptop_hard_drive_type" id="memoryVal1" value="SSD" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">SSD</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="laptop_hard_drive_type" id="memoryVal2" value="HDD" />
                <label className="form-check-label" htmlFor="inlineRadio2">HDD</label>
                </div>
            </div>

            </div>

            <div className='row'>
                <div className='form-group col-6 my-3'>
                <label htmlFor="laptop_purchase_date" style={{float: "left"}}>შეძენის რიცხვი (არჩევითი)</label>
                <br />
                <input name='laptop_purchase_date' id="laptop_purchase_date" key="laptop_purchase_date" className='form-control mt-3' type="date"
                    {...formik.getFieldProps('laptop_purchase_date')}
                />
                </div>

                <div className='form-group col-6 my-3'>
                <label htmlFor='laptop_price' className='pb-3' style={{float: "left"}}>ლეპტოპის ფასი</label>
                <br />
                <input 
                 className='form-control'
                 type="number"
                 name="laptop_price" 
                 key="laptop_price"
                 id="laptop_price"
                {...formik.getFieldProps('laptop_price')}
                />
                    {formik.touched.laptop_price && formik.errors.laptop_price 
                    ? 
                    <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.laptop_price}</small>                        
                    :
                    <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                }
                
                </div>
            </div>

        <div className="row justify-content-start text-start">
            <div className='form-group col-6 my-3'>
                <label htmlFor='laptop_state' className='pb-4'>ლეპტოპის მდგომარეობა</label>
                <br />
                <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" name="laptop_state" 
                id="conditionVal1" 
                key="conditionVal1" 
                value="new" required/>
                <label className="form-check-label" htmlFor="inlineRadio1">ახალი</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" 
                name="laptop_state" 
                id="conditionVal2" 
                key="conditionVal2" 
                value="used" />
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