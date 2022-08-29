import React, {useState, useEffect} from 'react';
import { isNonNullObject } from '@apollo/client/utilities';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom';
import { useFormik } from 'formik';
import { validate } from 'graphql';
import Form from './form'


const Employee = () => {
    const teamUrl = 'https://pcfy.redberryinternship.ge/api/teams';
    const positionUrl = 'https://pcfy.redberryinternship.ge/api/positions';
    const [teams, setTeams] = useState(null);
    const [positions, setPositions] = useState(null);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();


    let fetchTeams = () => {
        fetch(teamUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
           setTeams(data.data);
        })
        .catch((error) =>{
            console.log("error fetching data");
        })

    }

    let fetchPositions = () => {
        fetch(positionUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
           setPositions(data.data);
        })
        .catch((error) =>{
            console.log("error fetching data");
        })

    }


    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        fetchPositions();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            team: '',
            position: '',
            email: '',
            phone: ''

        }, 

        onSubmit: values => {
            console.log('Form data', values);
        },

        validate: values => {

            let errors = {};

            if(!values.name) {
                errors.name = "Required"
            }

            if(!values.surname) {
                errors.surname = "Required"
            }

            if(!values.team) {
                errors.team = "Required"
            }

            if(!values.position) {
                errors.position = "Required"
            }

            if(!values.email) {
                errors.email = "Required"
            }

            if(!values.phone) {
                errors.phone = "Required"
            }

            return errors;

        }


    })

 // Current value of selected Team
 // For filtering the positions options

    if (teams) {
        var select = document.getElementById('teams');
        var selectedValue = select.options[select.selectedIndex].value;
    }

    

    

    return (
        <>
        <Form />
        <div className='row mt-4 justify-content-center' style={{fontSize: "12px"}}>
            <form onSubmit={formik.handleSubmit} style={{maxWidth: 600}}>
                <div className='row'>

                    <div className='form-group col-6'>
                        <label htmlFor='name' className='' style={{float: "left"}}>სახელი</label>
                        <br />
                        <input className='form-control' type="text" name="name" 
                        { ...formik.getFieldProps('name')}/>
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
                        <input className='form-control' type="text" name="surname" 
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
                        <div className='form-group'>
                            <select id='teams' className='form-control' name='team'
                            
                            { ...formik.getFieldProps('team')}>
                                <option name="team" value="" disabled hidden>თიმი</option>
                                {teams && teams.map(({id, name}) => (
                                 <option name="team" value={id} key={id}>{name}</option>
                            )
                            )
                                    }   

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
                        <select id='positions' className='form-control' name='position' 
                        { ...formik.getFieldProps('position')}>
                            <option name="position" value="" disabled hidden>პოზიცია</option>
                            {positions && positions.map(({id, name, team_id}) => (
                            team_id == selectedValue ?
                            <option key={id}>{name}</option>
                            : null
                            )
                            )
                            }
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
                        <input name='email' className='form-control' refs="email" type="text" placeholder="Email" 
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
                        <input name="phone" className='form-control' refs="phone" type="text" placeholder="Phone" 
                        { ...formik.getFieldProps('phonefjfjsfsfsa')}
                        />
                            {formik.touched.phone && formik.errors.phone 
                            ?
                            <small className="form-text text-muted error" style={{float: "left"}}>{formik.errors.phone}</small>
                            : 
                            <small id="emailHelp" className="form-text text-muted" style={{float: "left"}}>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</small>
                            } 
                    </div>
                </div>
            <button type='submit'
            className='btn btn-info m-5 px-5 py-2'>
            Next 
            </button>

            </form>
          
        </div>
        </>
    )
}

export default Employee;