import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop'


const Form = () => {
    const [page, setPage] = useState(0);

    return (
        <div className='row'>
            <h2 className='col-6'> თანამშრომლის ინფო</h2>
            <h2 className='col-6'> ლეპტოპის მახასიათებლები</h2>
            <Employee />
        </div>
    )
}

export default Form;