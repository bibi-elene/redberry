import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useFormik } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';

const Employee = ({formData, setFormData, page, setPage}) => {

    const FormTitles = ["Employee", "Laptop", "Success"];
    const teamUrl = 'https://pcfy.redberryinternship.ge/api/teams';
    const positionUrl = 'https://pcfy.redberryinternship.ge/api/positions';
    const [teams, setTeams] = useState(null);
    const [positions, setPositions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const initialValues = {
        name: localStorage.getItem('name') !== 'undefined' ? localStorage.getItem('name') : '',
        surname: localStorage.getItem('surname') !== 'undefined' ? localStorage.getItem('surname') : '',
        team_id: localStorage.getItem('team_id') !== 'undefined' ? localStorage.getItem('team_id') : '',
        position_id: localStorage.getItem('position_id') !== 'undefined' ? localStorage.getItem('position_id') : '',
        email: localStorage.getItem('email') !== 'undefined' ? localStorage.getItem('email') : '',
        phone_number: localStorage.getItem('phone_number') !== 'undefined' ? localStorage.getItem('phone_number') : '',
    }

    window.onbeforeunload = () => {

            localStorage.setItem('name', $('#name').val());
            localStorage.setItem('surname', $('#surname').val());
            localStorage.setItem('team_id', $("#team_id").val());
            localStorage.setItem('position_id', $("#position_id").val());
            localStorage.setItem('email', $('#email').val());
            localStorage.setItem('phone_number', $('#phone_number').val());
        
    }


    const onSubmit = (values) => {
        setFormData({
            ...formData, 
            name: values.name,
            surname: values.surname,
            team_id: selectedTeamId,
            position_id: selectedPositionId,
            email: values.email,
            phone_number: values.phone_number});

            localStorage.setItem('name', $('#name').val());
            localStorage.setItem('surname', $('#surname').val());
            localStorage.setItem('team_id', $("#team_id").val());
            localStorage.setItem('position_id', $("#position_id").val());
            localStorage.setItem('email', $('#email').val());
            localStorage.setItem('phone_number', $('#phone_number').val());
            

            setPage((currPage) => currPage + 1);   
    }
    
    const validate = (values) => {
        let errors = {};
        if(!values.name) {errors.name = "Required"}
        if(values.name.length < 2) {errors.name = "2 სიმბოლო მინიმუმ"}
        else if(!(/^[ა-ჰ]+$/).test(values.name)) {errors.name = "გამოიყენე ქართული ასოები"}
        if(!values.surname) {errors.surname = "Required"}
        else if(!(/^[ა-ჰ]+$/).test(values.surname)) {errors.surname = "გამოიყენე ქართული"}
        if(values.surname.length < 2) {errors.surname = "2 სიმბოლო მინიმუმ"}
        if(!values.team_id) {errors.team_id = "Required"}
        if(!values.position_id) {errors.position_id = "Required"}
        if(!values.email) {errors.email = "Required"}
        else if(!values.email.endsWith("@redberry.ge")) {errors.email = "invalid format"}
        if(!values.phone_number) {errors.phone_number = "Required"}
        else if(!values.phone_number.startsWith('+995')) {errors.phone_number = "False format"}
        else if(values.phone_number.length !== 13) {errors.phone_number = "False format"}
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
            if (teams === undefined) {return 'error fetching data'}
            var selectTeam = document.getElementById('team_id');
            var selectPosition = document.getElementById('position_id');
    
            if (selectTeam.options[selectTeam.selectedIndex]) {
            var selectedTeamId = selectTeam.options[selectTeam.selectedIndex].id;
            }
            
            if (selectPosition.options[selectPosition.selectedIndex]) {
            var selectedPositionId = selectPosition.options[selectPosition.selectedIndex].id;
            }     
        }  
    

    return (
        <>
        <Link to="/" className='position-absolute' style={{top:15, left: 20}}><i className="bi bi-arrow-left-circle" style={{color: "black"}}></i></Link>
        <div className='row employee-container  text-center justify-content-center' style={{fontSize: "12px"}}>
            <form id="employee-form" onSubmit={formik.handleSubmit} style={{maxWidth: 900, minHeight: "100%"}}>
                <div style={{padding: "50px 70px 10px 70px"}}>
                <div className='row'>

                <div className='form-group col-6'>
                        <label htmlFor='name' style={{float: "left"}}>სახელი</label>
                        <br />
                        <input id='name' key='name' className='form-control' type="text" name="name" placeholder='გრიშა' 
                        style={{borderColor: formik.errors.name ? "red" : "#4D9AC3"}}
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
                        <input id='surname' className='form-control' type="text" name="surname" placeholder='ბაგრატიონი'
                        style={{borderColor: formik.errors.surname ? "red" : "#4D9AC3"}}

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
                            <select id='team_id' className='form-control' name='team_id' 
                            style={{backgroundColor: "#EBEBEB", borderRadius: "8px", padding: "8px 24px", fontWeight: "700", borderColor: formik.errors.team_id ? "red" : "#4D9AC3"}}
                            { ...formik.getFieldProps('team_id')}>
                                <option value="" disabled hidden>თიმი</option>
                                {teams && teams.map(({id, name}) => (
                                 <option name={id} id={id} key={id}>{name}</option>
                            ))}   

                            </select>
                                {formik.touched.team_id && formik.errors.team_id 
                                ?
                                <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.team_id}</small>
                                : null
                                } 
                        </div>
                    </div>

                <div className='row justify-content-center my-4'>
                    <div className='form-group'>
                        <select id='position_id' className='form-control' name='position_id' 
                        style={{backgroundColor: "#EBEBEB", borderRadius: "8px", padding: "8px 24px", fontWeight: "700", borderColor: formik.errors.position_id ? "red" : "#4D9AC3"}}
                        { ...formik.getFieldProps('position_id')}>
                            <option value="" disabled hidden>პოზიცია</option>
                            {positions && positions.map(({id, name, team_id}) => (
                            team_id == selectedTeamId
                            ?
                            <option id={id} key={id}>{name}</option> 
                            : null
                            ))}
                        </select>
                                {formik.touched.position_id && formik.errors.position_id 
                                ?
                                <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.position_id}</small>
                                : 
                                null
                        } 
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label className='mx-2 my-1' htmlFor="email" style={{float: "left"}}>მეილი</label>
                        <br />
                        <input key="email" id='email' name='email' className='form-control' type="text" placeholder="email@redberry.ge"
                        { ...formik.getFieldProps('email')}
                        style={{borderColor: formik.errors.email ? "red" : "#4D9AC3"}}
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
                        <label className="mx-2 my-1" htmlFor="phone_number" style={{float: "left"}}>ტელეფონის ნომერი</label>
                        <br />
                        <input key="phone_number" id='phone_number' name="phone_number" className='form-control' refs="phone_number" type="text" placeholder="+995 123 123 123" 
                        { ...formik.getFieldProps('phone_number')}
                        style={{borderColor: formik.errors.phone_number ? "red" : "#4D9AC3"}}
                        />
                            {formik.touched.phone_number && formik.errors.phone_number 
                            ?
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.phone_number}</small>
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