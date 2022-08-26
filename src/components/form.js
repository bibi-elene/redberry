import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop'


const Form = () => {
    const [page, setPage] = useState(0);

    const formTitles = ['Employee', 'Laptop', 'Success'];

    const displayForm = () => {
        if (page === 0) {
            return <Employee />
        } else {
            return <Laptop />
        }
    }

    function sendData() {
        document.getElementById('next').innerHTML = "Subscribe";
    }

    return (
        <div className='row'>
            <h2 className='col-6'> თანამშრომლის ინფო</h2>
            <h2 className='col-6'> ლეპტოპის მახასიათებლები</h2>
            <div>{displayForm()}
            <button onChange={sendData()} 
                style={{width: "300px"}} 
                id="next"
                className='btn btn-info m-3' 
                onClick={ () =>
                setPage(currPage => currPage + 1) }> Next </button>
            </div>
        </div>
    )
}

export default Form;