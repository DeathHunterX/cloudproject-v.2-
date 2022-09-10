import React, { useEffect, useState } from 'react'

import { countries } from '../../ContainerLists/CountriesList'
import { years } from '../../ContainerLists/YearList'

import {AiFillEdit} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import { deleteEducation, updateEducation } from '../../../redux/actions/userFunction/educationAction'


const EducationCard = ({auth, education, dispatch}) => {
    const initialState = {
        career: "", 
        institutionName: "", 
        country: "", 
        startYear: "", 
        endYear: "" 
    }

    const [educationData, setEducationData] = useState(initialState)
    const { career, institutionName, country, startYear, endYear } = educationData

    const [onEdit, setOnEdit] = useState(false)
    
    useEffect(() => {
        setEducationData(education)
    }, [education])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setEducationData({...educationData, [name]: value})
    }
    
    const handleClear = (e) => {
        e.preventDefault()
        setOnEdit(false)
        setEducationData(education)   
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateEducation(educationData, education._id, auth.token))
        setOnEdit(false)
    }

    const handleDelete = () => {
        dispatch(deleteEducation(education, auth.token))
    }
    
    return (   
        <>
            <div>
                <div className="info_header d-flex justify-content-between">
                    <h5>{education.career}</h5>
                    <div className="d-flex">
                        <AiFillEdit className="text-primary" style={{cursor: 'pointer'}}
                        onClick={() => setOnEdit(true)}
                        />
                        <FaTrashAlt className="text-primary ms-2" style={{cursor: 'pointer'}}
                        onClick={handleDelete} 
                        />
                    </div>
                    
                </div>
                
                <span>{education.institutionName}, {education.country}</span>
                <p className="disabled">{education.startYear} - {education.endYear} ({education.endYear - education.startYear} years)</p>
                
            </div>
        
        {
            onEdit && 
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="career">Degree</label>
                    <input type="text" className="form-control" 
                    id="career" name="career" value={career} onChange={handleChangeInput}
                    placeholder="Enter your degree" />
                </div>

                <div className="form-row d-flex mb-2">
                    <div className="form-group col-sm-8 me-4">
                        <label htmlFor="institutionName">Institution Name</label>
                        <input type="text" className="form-control" 
                        id="institutionName" name="institutionName" value={institutionName} onChange={handleChangeInput}
                        placeholder="Enter your institution / university" />
                    </div>
                    
                    <div className="form-group col-sm-3 me-4">
                        <label htmlFor="exampleFormControlSelect1">Country</label>
                        <select className="form-select"
                        id="country" name="country" value={country} onChange={handleChangeInput}
                        >
                            <option defaultChecked>--Select Country--</option>
                            {
                                countries.map((country, idx) => (
                                    <option value={country.text} key={idx}>{country.text}</option>
                                ))
                            }                      
                        </select>
                        
                    </div>
                    
                </div>

                <div className="form-row d-flex mb-2">
                    <div className="form-group col-md-2 me-2">
                        <label htmlFor="exampleFormControlSelect1">Start Year</label>
                        <select className="form-select"
                        id="startYear" name="startYear" value={startYear} onChange={handleChangeInput}
                        >
                            <option defaultChecked>--Select Year--</option>

                            {
                                years.map((year,idx) => (
                                    <option value={year} key={idx}>{year}</option>
                                ))
                            }
                            
                            
                        </select>
                    </div>
                
                    <div className="form-group col-md-2 me-2">
                        <label htmlFor="exampleFormControlSelect1">End Year</label>
                        <select className="form-select" 
                        id="endYear" name="endYear" value={endYear} onChange={handleChangeInput}
                        >
                            <option defaultChecked>--Select Year--</option>
                            {
                                years.map((year,idx) => (
                                    <option value={year} key={idx}>{year}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <button className="btn btn-primary me-3" onClick={handleClear}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                
            </form>
        }
            
        </>
    )
}

export default EducationCard