import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createExperience, getExperience } from '../../../redux/actions/userFunction/experienceAction'

import { years } from '../../ContainerLists/YearList'
import ExperienceCard from './ExperienceCard'


const Experience = ({id, auth}) => {
    const initialState = {
        workPlace: "", 
        workName: "", 
        startYear: "", 
        endYear: "", 
        achievement: ""
    }

    const [experienceData, setExperienceData] = useState(initialState)
    const {  workPlace, workName, startYear, endYear, achievement } = experienceData

    const [onCreate, setOnCreate] = useState(false)

    const { experience } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setExperienceData({...experienceData, [name]: value})
    }

    const handleClear = (e) => {
        e.preventDefault()
        setOnCreate(false)
        setExperienceData(initialState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createExperience(experienceData, auth))
        setExperienceData(initialState)
    }

    useEffect(() => {
        dispatch(getExperience(id, auth.token))
    }, [auth.token, dispatch, id])


    return (
        <div className="experience_container">
            <div className="experience_header d-flex justify-content-between">
                <h2>Experience</h2>
                {
                    auth.user._id === id && <button className="btn btn-primary" onClick={() => setOnCreate(true)}>Add Experience</button>
                }
                
            </div>
            
            <hr />
            {
                onCreate &&
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

                <ul className="experience_timeline" style={{display: onCreate ?  'none' : 'block' }}>
                    {
                        experience.experiences.map(experience => 
                            
                            id === experience.userId &&
                            (
                                <li key={experience._id}>
                                    <ExperienceCard auth={auth} experience={experience} dispatch={dispatch}/>
                                </li> 
                                
                            )
                        )
                    }
                </ul>
        </div>
    )
}

export default Experience