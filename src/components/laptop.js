import React, {useState, useEffect} from 'react';
import '../App.css';
import Form from './form'
import {Link} from "react-router-dom";



const Laptop = () => {

    const brandUrl = 'https://pcfy.redberryinternship.ge/api/brands';
    const cpuUrl = 'https://pcfy.redberryinternship.ge/api/cpus'
    let [brand, setBrand] = useState(null);
    let [cpu, setCpu] = useState(null);
    const test = ['Peach'];

    const fetchBrands = () => {
        fetch(brandUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setBrand(data.data);
        })
    }

    const fetchCpu = () => {
        fetch(cpuUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCpu(data.data);
        })
    }

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchCpu();
    }, []);

    return (
        <>
        <div className='row mt-5'>
            <h2 className='col-6 text-end'> თანამშრომლის ინფო</h2>
            <h2 className='col-6 text-start'> ლეპტოპის მახასიათებლები</h2>
        </div>

        <div className='row justify-content-center' >
            <div className='row file-form m-5 justify-content-center' style={{width: "auto", maxWidth: 650, maxHeight: 400}}>
            <label htmlFor="files col"><i className="bi bi-exclamation-triangle"></i></label> <br />         
            <label htmlFor="files col" className="mb-4">ჩააგდე ან ატვირთე ლეპტოპის ფოტო <br /> </label>
            <label htmlFor="files col" style={{zIndex:1, width: 150}} className='btn btn-info mt-3'>ატვირთე</label>
            <input style={{zIndex:1}} className='col-12' type="file" id="files"/>
                </div>

    <div className='row justify-content-center '>
        <form className='m-5' style={{maxWidth: 650}}>
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

        <div className="row my-5"> 
            <Link to="/form" className='col-6 text-start'>
                <p className=''>უკან</p>
            </Link>

            <Link to="/success" className='col-6 text-end'>
            <button 
            className='btn btn-info px-5 py-2'>
             დამახსოვრება
            </button>
            </Link>
        </div>

                </form>
            </div>

        </div>

        </>
    )
}

export default Laptop;
