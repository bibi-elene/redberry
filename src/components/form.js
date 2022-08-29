import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop'


const Form = () => {
    const [page, setPage] = useState(0);

    return (
        <div className='row my-5'>
            <h2 className='col-6 text-end'> თანამშრომლის ინფო</h2>
            <h2 className='col-6 text-start'> ლეპტოპის მახასიათებლები</h2>
        </div>
    )
}

export default Form;