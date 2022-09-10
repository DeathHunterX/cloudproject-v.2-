import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createEducation, getEducation } from '../../../redux/actions/userFunction/educationAction'

import { countries } from '../../ContainerLists/CountriesList'
import { years } from '../../ContainerLists/YearList'

import EducationCard from './EducationCard'

const Education = ({id, auth}) => {
    const initialState = {
        career: "", 
        institutionName: "", 
        country: "", 
        startYear: "", 
        endYear: "" 
    }

    const [educationData, setEducationData] = useState(initialState)
    const { career, institutionName, country, startYear, endYear } = educationData

    const [onCreate, setOnCreate] = useState(false)

    const { education } = useSelector(state => state)
    const dispatch = useDispatch()


    const handleChangeInput = e => {
        const {name, value} = e.target
        setEducationData({...educationData, [name]: value})
    }
    
    const handleClear = (e) => {
        e.preventDefault()
        setOnCreate(false)
        setEducationData(initialState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createEducation(educationData, auth))
        setEducationData(initialState)
    }

    useEffect(() => {
        dispatch(getEducation(id, auth.token))
    }, [auth.token, dispatch, id])

    return (
        <div className="education_container">
            <div className="education_header d-flex justify-content-between">
                <h2>Education</h2>
                {
                    auth.user._id === id && <button className="btn btn-primary" onClick={() => setOnCreate(true)}>Add Education</button>
                }
            </div>
            
            <hr />
            
            <div className="education_body">
                {
                    onCreate &&
                    (
                        
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
                    )
                }
                
                
                    
                <ul className="education_timeline" style={{display: onCreate ?  'none' : 'block' }}>
                    {
                        education.educations.map(education => 
                            
                            id === education.userId &&
                            (
                                <li key={education._id}>
                                    <EducationCard auth={auth} education={education} dispatch={dispatch}/>
                                </li> 
                                
                            )
                        )
                    }
                </ul>
                
            </div>
            
        </div>
    )
}

export default Education