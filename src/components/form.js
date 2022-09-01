import React, {useState} from 'react';
import Employee from './employee';
import Laptop from './laptop';
import Success from './success';
import logo from '../LOGO-10 1.png'



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
        <div className='row mt-5 form text-center'>
        {page == 0 ?
    <div className='row' >  
         <div className="row col-6 text-end justify-content-center">
            <h2> თანამშრომლის ინფორმაცია </h2>
            <div>
            <hr style={{width: "140px", color: "black", float: "right", marginRight: "20px", height: "2px"}}/>
            </div>
        </div>
        <div className='row col-6 text-start'>
            <h2 className=''> ლეპტოპის მახასიათებლები</h2> 
            </div>
            </div>  
            :
            <div className='row' >  
            <div className="row col-6 text-end justify-content-center">
               <h2> თანამშრომლის ინფორმაცია </h2>
               <div>
               </div>
           </div>
           <div className='row ml-2 col-6 text-start'>
               <h2 className=''> ლეპტოპის მახასიათებლები</h2> 
               <hr style={{width: "140px", color: "black", float: "right", marginLeft: "33px", height: "2px", marginTop: "14px"}}/>
               </div>
               </div>  
        }
        </div>

        <div className="body">{PageDisplay()}</div>

        <div className='footer'><div>
          <img className='p-5' width="160px" src={logo} alt="logo"></img>
          </div></div>
    </>    
    )
}

export default FileForm;