import React, { useEffect, useState } from 'react'

import {AiFillEdit} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import { deleteExperience, updateExperience } from '../../../redux/actions/userFunction/experienceAction'

import { years } from '../../ContainerLists/YearList'


const ExperienceCard = ({auth, experience, dispatch}) => {
    const initialState = {
        workPlace: "", 
        workName: "", 
        startYear: "", 
        endYear: "", 
        achievement: ""
    }

    const [experienceData, setExperienceData] = useState(initialState)
    const {  workPlace, workName, startYear, endYear, achievement } = experienceData

    const [onEdit, setOnEdit] = useState()

    useEffect(() => {
        setExperienceData(experience)
    }, [experience])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setExperienceData({...experienceData, [name]: value})
    }

    const handleClear = (e) => {
        e.preventDefault()
        setOnEdit(false)
        setExperienceData(initialState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateExperience(experienceData, experience._id, auth.token))
        setOnEdit(false)
    }

    const handleDelete = () => {
        dispatch(deleteExperience(experience, auth.token))
    }
    return (
        <>
            <div>
                <div className="info_header d-flex justify-content-between">
                    <h5>{experience.workName}</h5>
                    <div className="d-flex">
                        <AiFillEdit className="text-primary" style={{cursor: 'pointer'}}
                        onClick={() => setOnEdit(true)}
                        />
                        <FaTrashAlt className="text-primary ms-2" style={{cursor: 'pointer'}}
                        onClick={handleDelete} 
                        />
                    </div>
                    
                </div>
                
                <h6 style={{marginBottom: "0"}}>{experience.workPlace}</h6>
                <p className="disabled">{experience.startYear} - {experience.endYear} ({experience.endYear - experience.startYear} years)</p>
                <p style={{whiteSpace: "pre-line"}}>{experience.achievement}</p>
                
            </div>

            {
                onEdit &&
                (
                    <form onSubmit={handleSubmit}>
                        <div className="form-row d-flex mb-2">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Work Name</label>
                                <input type="text" className="form-control" 
                                id="workName" name="workName" value={workName} onChange={handleChangeInput}
                                placeholder="Enter your position or title" />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Company Name</label>
                                <input type="text" className="form-control"
                                id="workPlace" name="workPlace" value={workPlace} onChange={handleChangeInput}
                                placeholder="Enter your company name" />
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
                        

                        <div className="form-group mb-2">
                            <label htmlFor="inputAddress">Summary</label>
                            <textarea className="form-control" 
                            id="achievement" name="achievement" value={achievement} onChange={handleChangeInput}
                            cols="30" rows ="7" style={{resize: 'none'}}
                            placeholder="Describe your work experience"
                            />
                        </div>

                        <div className="d-flex">
                            <button className="btn btn-primary me-3" onClick={handleClear}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                        
                    </form>
                )
            }
        </>
    )
}

export default ExperienceCard