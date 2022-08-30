import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop';
import Success from './success';


const FileForm = () => {
    const [page, setPage] = useState(0);

    const PageTitles = ["Employee", "Laptop", "Success"]

    const PageDisplay = () => {
        if (page === 0) {
            return <Employee />
        } else if (page === 1) {
            return <Laptop />
        } else {
            return <Success />
        }
    };

    return (
        
        <div className='row my-5 form'>
            <h2 className='col-6 text-end'> თანამშრომლის ინფო</h2>
            <h2 className='col-6 text-start'> ლეპტოპის მახასიათებლები</h2>
        </div>
    )
}

export default FileForm;