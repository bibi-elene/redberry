import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom';
import { useFormik, ErrorMessage } from 'formik';
import { validate } from 'graphql';
import Form from './form'
import $ from 'jquery';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import Laptop from './laptop';
import { values } from 'lodash';
import * as Yup from 'yup';
import logo from '../LOGO-10 1.png'


const Employee = ({formData, setFormData, page, setPage}) => {

    const FormTitles = ["Employee", "Laptop", "Success"];
    const teamUrl = 'https://pcfy.redberryinternship.ge/api/teams';
    const positionUrl = 'https://pcfy.redberryinternship.ge/api/positions';
    const [teams, setTeams] = useState(null);
    const [positions, setPositions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    let fetchTeams = () => {
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

    }

    let fetchPositions = () => {
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

    }


    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        fetchPositions();
    }, []);


    // Store items locally to avoid  
    // Losing data on Refresh
    window.onbeforeunload = function() {
        localStorage.setItem('name', $('#name').val());
        localStorage.setItem('surname', $('#surname').val());
        localStorage.setItem('team', $("#team").val());
        localStorage.setItem('position', $("#position").val());
        localStorage.setItem('email', $('#email').val());
        localStorage.setItem('phone', $('#phone').val());
    }

    const initialValues = {
        name: localStorage.getItem('name') == 'undefined' ? '' : localStorage.getItem('name'),
        surname: localStorage.getItem('surname') == 'undefined' ? '' : localStorage.getItem('surname'),
        team: localStorage.getItem('team') == 'null' ? '' : localStorage.getItem('team'),
        position: localStorage.getItem('position') == 'null' ? '' : localStorage.getItem('position'),
        email: localStorage.getItem('email') == 'undefined' ? '' : localStorage.getItem('email'),
        phone: localStorage.getItem('phone') == 'undefined' ? '' : localStorage.getItem('phone')
    }

    console.log(localStorage.getItem('position'))

    const onSubmit = (values) => {
        setFormData({
            ...formData, 
            name: values.name,
            surname: values.surname,
            team: values.team,
            position: values.position,
            email: values.email,
            phone: values.phone});

            localStorage.setItem('name', $('#name').val());
            localStorage.setItem('surname', $('#surname').val());
            localStorage.setItem('team', $("#team").val());
            localStorage.setItem('position', $("#position").val());
            localStorage.setItem('email', $('#email').val());
            localStorage.setItem('phone', $('#phone').val());
            
        

            if (page === FormTitles.length) {
              alert("FORM SUBMITTED", formData);
            } else {
              setPage((currPage) => currPage + 1);
            }
          
    }

    const validate = (values) => {
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
    }

    const formik = useFormik({
        initialValues, 
        onSubmit, 
        validate
    })

    if (loading) return "Loading ..."
    if (error) return "Error: "
    
 // Current ID of selected Team
 // For filtering the positions options
        if (teams){
            if (teams == undefined) {return 'error fetching data'}
            var selectTeam = document.getElementById('team');
            var selectPosition = document.getElementById('position');
    
            if (selectTeam.options[selectTeam.selectedIndex]) {
            var selectedTeamId = selectTeam.options[selectTeam.selectedIndex].id;
            var selectedTeamValue = selectTeam.options[selectTeam.selectedIndex].value;
            }
            
            if (selectPosition.options[selectPosition.selectedIndex]) {
            var selectedPositionId = selectPosition.options[selectPosition.selectedIndex].id;
            var selectedPositionValue = selectPosition.options[selectPosition.selectedIndex].value;
            }     
        }   
        
    

    return (
        <>
        <Link to="/" className='position-absolute' style={{top:15, left: 20}}><i class="bi bi-arrow-left-circle" style={{color: "black"}}></i></Link>
        <div className='row  text-center justify-content-center' style={{fontSize: "12px"}}>
            <form onSubmit={formik.handleSubmit} style={{maxWidth: 900, minHeight: "100%"}}>
                <div style={{padding: "50px 70px 10px 70px"}}>
                <div className='row'>

                <div className='form-group col-6'>
                        <label htmlFor='name' className='' style={{float: "left"}}>სახელი</label>
                        <br />
                        <input id='name' key='name' className='form-control' type="text" name="name" 
                       { ...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name 
                        ? 
                        <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.name}</small>                        
                        :
                        <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                        }                     
                    </div>

                    <div className='form-group col-6'>
                        <label htmlFor='surname' className='' style={{float: "left"}}>გვარი</label>     
                        <br />
                        <input id='surname' className='form-control' type="text" name="surname" 
                        { ...formik.getFieldProps('surname')}/>
                        {formik.touched.surname && formik.errors.surname 
                        ? 
                        <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.surname}</small>                        
                        :
                        <small className="form-text text-muted" style={{float: "left"}}>მინიმუმ 2 სიმბოლო, ქართული ასოები</small>
                        }
                    </div>

                </div>

                    <div className='row justify-content-center my-5'>
                        <div className='form-group teams-div'>
                            <select id='team' className='form-control' name='team' 
                            style={{backgroundColor: "#EBEBEB", borderRadius: "8px", padding: "8px 24px", fontWeight: "700"}}
                            { ...formik.getFieldProps('team')}>
                                <option value="" disabled hidden>თიმი</option>
                                {teams && teams.map(({id, name}) => (
                                 <option name={id} id={id} key={id}>{name}</option>
                            ))}   

                            </select>
                                {formik.touched.team && formik.errors.team 
                                ?
                                <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.team}</small>
                                : null
                                } 
                        </div>
                    </div>

                <div className='row justify-content-center my-4'>
                    <div className='form-group'>
                        <select id='position' className='form-control' name='position' 
                        style={{backgroundColor: "#EBEBEB", borderRadius: "8px", padding: "8px 24px", fontWeight: "700"}}
                        { ...formik.getFieldProps('position')}>
                            <option value="" disabled hidden>პოზიცია</option>
                            {positions && positions.map(({id, name, team_id}) => (
                            team_id == selectedTeamId
                            ?
                            <option key={id}>{name}</option> 
                            : null
                            ))}
                        </select>
                                {formik.touched.position && formik.errors.position 
                                ?
                                <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.position}</small>
                                : 
                                null
                        } 
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label className='mx-2 my-1' htmlFor="email" style={{float: "left"}}>მეილი</label>
                        <br />
                        <input key="email" id='email' name='email' className='form-control' type="text" placeholder="Email" 
                        { ...formik.getFieldProps('email')}
                        />
                                {formik.touched.email && formik.errors.email 
                                ?
                                <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.email}</small>
                                : 
                                <small className="form-text text-muted" style={{float: "left"}}>უნდა მთავრდებოდეს @redberry.ge -ით</small>
                                } 
                    </div>
                </div>
                
                <div className='row my-4'>
                    <div className='form-group'>
                        <label className="mx-2 my-1" htmlFor="phone" style={{float: "left"}}>ტელეფონის ნომერი</label>
                        <br />
                        <input key="phone" id='phone' name="phone" className='form-control' refs="phone" type="text" placeholder="Phone" 
                        { ...formik.getFieldProps('phone')}
                        />
                            {formik.touched.phone && formik.errors.phone 
                            ?
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.phone}</small>
                            : 
                            <small id="emailHelp" className="form-text text-muted" style={{float: "left"}}>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</small>
                            } 
                    </div>
                </div>

    <div className="footer text-end justify-content-end">

<button
    id="submit"
    type='submit'
    className={page !== FormTitles.length - 1 ? 'btn btn-info mt-5' : 'd-none'}
    style={{borderRadius: "8px", color: "white", backgroundColor: "#62A1EB", padding: "18px 45px"}}
    >
    {page === FormTitles.length ? "დამახსოვრება" : "შემდეგი"}
    </button>
  </div>

  </div>

            </form>
          
            </div>
        </>
    )
}

export default Employee;