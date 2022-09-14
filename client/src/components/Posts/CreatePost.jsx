import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'

import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import { createPost } from '../../redux/actions/postAction'


const CreatePost = () => {
    const { auth, alert }  = useSelector(state => state)
    const dispatch = useDispatch()

    const initialState = {
        title: '', 
        description: '',  
        jobType: '', 
        skillRequired: '', 
        salary: '',
        deadlines: '',
        maxApplicants: '', 
        maxPositions: '',
    }

    const [postData, setPostData] = useState(initialState)
    const { title, description, jobType, skillRequired, salary, deadlines, maxApplicants, maxPositions } = postData
    const [images, setImages] = useState([])


    const handleChangeInput = e => {
        const {name, value} = e.target
        setPostData({...postData, [name]: value})
    }

    const handleJobInput = () => {
        switch (postData.jobType) {
            case "fullTimeJob":
                return (
                    <>
                        <div className="mb-3">
                            <label htmlFor="skillRequired">Skill required for this job</label>
                            <input type="text" className="form-control" name="skillRequired" id="skillRequired" placeholder="Enter Skill" 
                            onChange={handleChangeInput} value={skillRequired}
                            style={{background: `${alert.skillRequired ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.skillRequired ? alert.skillRequired : ""}
                            </small>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary">Salary/Budget</label>
                            <input type="number" className="form-control" id="salary" name="salary" placeholder="Enter Budget" 
                            value={salary} onChange={handleChangeInput}
                            style={{background: `${alert.salary ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.salary ? alert.salary : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deadlines">Work Deadlines</label>
                            <input type="date" className="form-control" id="deadlines" name="deadlines"
                            value={deadlines} onChange={handleChangeInput}
                            style={{background: `${alert.deadlines ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.deadlines ? alert.deadlines : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxApplicants">Maximum Number of Applicants</label>
                            <input type="number" className="form-control" id="maxApplicants" name="maxApplicants" 
                            value={maxApplicants} onChange={handleChangeInput}
                            style={{background: `${alert.maxApplicants ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxApplicants ? alert.maxApplicants : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxPositions">Position Available</label>
                            <input type="number" className="form-control" id="maxPositions" name="maxPositions"
                            value={maxPositions} onChange={handleChangeInput}
                            style={{background: `${alert.maxPositions ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxPositions ? alert.maxPositions : ""}
                            </small>
                        </div>
                    </>
                )
                
            case "partTimeJob":
                return (
                    <>
                        <div className="mb-3">
                            <label htmlFor="skillRequired">Skill required for this job</label>
                            <input type="text" className="form-control" name="skillRequired" id="skillRequired" placeholder="Enter Skill" 
                            onChange={handleChangeInput} value={skillRequired}
                            style={{background: `${alert.skillRequired ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.skillRequired ? alert.skillRequired : ""}
                            </small>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary">Salary/Budget</label>
                            <input type="number" className="form-control" id="salary" name="salary" placeholder="Enter Budget" 
                            value={salary} onChange={handleChangeInput}
                            style={{background: `${alert.salary ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.salary ? alert.salary : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deadlines">Work Deadlines</label>
                            <input type="date" className="form-control" id="deadlines" name="deadlines"
                            value={deadlines} onChange={handleChangeInput}
                            style={{background: `${alert.deadlines ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.deadlines ? alert.deadlines : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxApplicants">Maximum Number of Applicants</label>
                            <input type="number" className="form-control" id="maxApplicants" name="maxApplicants" 
                            value={maxApplicants} onChange={handleChangeInput}
                            style={{background: `${alert.maxApplicants ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxApplicants ? alert.maxApplicants : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxPositions">Position Available</label>
                            <input type="number" className="form-control" id="maxPositions" name="maxPositions"
                            value={maxPositions} onChange={handleChangeInput}
                            style={{background: `${alert.maxPositions ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxPositions ? alert.maxPositions : ""}
                            </small>
                        </div>
                    </>
                )
                
            case "freelancer":
                return (
                    <>
                        <div className="mb-3">
                            <label htmlFor="skillRequired">Skill required for this job</label>
                            <input type="text" className="form-control" name="skillRequired" id="skillRequired" placeholder="Enter Skill" 
                            onChange={handleChangeInput} value={skillRequired}
                            style={{background: `${alert.skillRequired ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.skillRequired ? alert.skillRequired : ""}
                            </small>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary">Salary/Budget</label>
                            <input type="number" className="form-control" id="salary" name="salary" placeholder="Enter Budget" 
                            value={salary} onChange={handleChangeInput}
                            style={{background: `${alert.salary ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.salary ? alert.salary : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deadlines">Work Deadlines</label>
                            <input type="date" className="form-control" id="deadlines" name="deadlines"
                            value={deadlines} onChange={handleChangeInput}
                            style={{background: `${alert.deadlines ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.deadlines ? alert.deadlines : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxApplicants">Maximum Number of Applicants</label>
                            <input type="number" className="form-control" id="maxApplicants" name="maxApplicants" 
                            value={maxApplicants} onChange={handleChangeInput}
                            style={{background: `${alert.maxApplicants ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxApplicants ? alert.maxApplicants : ""}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxPositions">Position Available</label>
                            <input type="number" className="form-control" id="maxPositions" name="maxPositions"
                            value={maxPositions} onChange={handleChangeInput}
                            style={{background: `${alert.maxPositions ? "#fd2d6a14" : ""}`}}
                            />
                            <small className="form-text text-danger">
                                {alert.maxPositions ? alert.maxPositions : ""}
                            </small>
                        </div>
                    </>
                )
        
            default:
                break;
        }
    }

    const handleUpload = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []
        files.forEach(file => {
            
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })
        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createPost(postData, images, auth))

        setPostData("")
        setImages([])
    }

    return (
        <div className="createPost">
            <h2 className="text-primary text-center">Tell us what you need done</h2>

            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="title">Choose a name for your work</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="e.g: Front-end Development" 
                    onChange={handleChangeInput} value={title}
                    style={{background: `${alert.title ? "#fd2d6a14" : ""}`}}
                    />
                    <small className="form-text text-danger">
                        {alert.title ? alert.title : ""}
                    </small>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description for this work</label>
                    <textarea className="form-control" id="description" name="description" cols="30" rows ="5"
                    onChange={handleChangeInput} value={description}
                    style={{background: `${alert.description ? "#fd2d6a14" : ""}`}}
                    />
                    <small className="form-text text-danger">
                        {alert.description ? alert.description : ""}
                    </small>
                </div>

                <div className="mb-3">
                    <label htmlFor="uploadImage" className="mb-3">Upload Image or File:</label>
                    <input type="file" multiple name="file" id="file_up" className="ms-3" accept="image/*" onChange={handleUpload}></input>
                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img" className="img-fluid img-thumbnail mt-3">
                                    <img src={URL.createObjectURL(img)} alt="images"/>
                                    <span onClick={()  => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>
                        
                    
                </div>

                <div className="mb-3">
                    <label htmlFor="jobType">Job Type</label>
                    <select className="form-select" id="jobType" name="jobType" value={jobType} onChange={handleChangeInput}>
                        <option value="">--Select--</option>
                        <option value="fullTimeJob">Full time Job</option>
                        <option value="partTimeJob">Part time Job</option>
                        <option value="freelancer">Freelancer</option>
                    </select>
                    <small className="form-text text-danger">
                        {alert.jobType ? alert.jobType : ""}
                    </small>
                
                </div>
                
                {handleJobInput()}
                <button type="submit" className="btn btn-primary w-100 mt-3" >Submit</button>
            </form>
        </div>
  )
}

export default CreatePost