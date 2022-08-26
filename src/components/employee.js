import React, {useState, useEffect} from 'react';
import { isNonNullObject } from '@apollo/client/utilities';
import { useParams } from 'react-router-dom';

const Employee = () => {

    const teamUrl = 'https://pcfy.redberryinternship.ge/api/teams';
    const positionUrl = 'https://pcfy.redberryinternship.ge/api/positions';
    const [teams, setTeams] = useState(null);
    const [positions, setPositions] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data} = useParams();


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
        console.log(positions);
    }, []);

    useEffect(() => {
        fetchPositions();
        console.log(positions);
    }, []);



    return (
        <div>
            <form>
                <label className='m-2 text-start'> 
                Name 
                <br />
                <input pattern=".{3,}" required title="3 characters minimum" type="text" name="name" />
                </label>
                <label className='m-2 text-start'> 
                Surname
                <br />
                <input pattern=".{3,}"   required title="3 characters minimum" type="text" name="name" />
                </label>
                <br />
                <div className='justify-content-center col-12'>
                    <select className='m-3 p-2 long-field' style={{width: "500px"}}>
                    <option value="" selected disabled hidden>Team</option>
                {teams && teams.map(({id, name}) => (
                   <option key={id}>{name}</option>
                    )
                    )
                }

                    </select>
                    <select className='p-2' style={{width: "500px"}}>
                    <option value="" selected disabled hidden>Position</option>
                {positions && positions.map(({id, name, team_id}) => (
                   <option key={id}>{name}</option>
                    )
                    )
                }
                    </select>
                </div>
                <input className='m-3' style={{width: "500px"}} refs="email" type="text" size="30" placeholder="Email" />
                <br />
                <input style={{width: "500px"}} refs="phone" type="text" size="30" placeholder="Phone" />
            </form>
        </div>
    )
}

export default Employee;