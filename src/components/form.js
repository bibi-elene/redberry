import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop';
import Success from './success';


const FileForm = () => {
    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        team: "",
        position: "",
        email: "",
        phone: "",
        file: "",
        pcname: "",
        pcbrand: "",
        cpu: "",
        cpuprop1: "",
        cpuprop2: "",
        ram: "",
        memoryType: "",
        date: "",
        price: "",
        condition: ""
    })

    const FormTitles = ["Employee", "Laptop", "Success"]

    const PageDisplay = () => {
        if (page === 0) {
            return <Employee page={page} setPage={setPage} formData={formData} setFormData={setFormData}/>
        } else if (page === 1) {
            return <Laptop page={page} setPage={setPage} formData={formData} setFormData={setFormData}/>
        } else {
            return <Success />
        }
    };

    return (
    <>   
        <div className='row my-5 form'>
            <h2 className='col-6 text-end'> თანამშრომლის ინფო</h2>
            <h2 className='col-6 text-start'> ლეპტოპის მახასიათებლები</h2>
        </div>

        <div className="body">{PageDisplay()}</div>

    
    </>    
    )
}

export default FileForm;