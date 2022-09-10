import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'

import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import { createPost } from '../../redux/actions/postAction'


const CreatePost = () => {
    const { auth, theme }  = useSelector(state => state)
    const dispatch = useDispatch()

    const initialState = {
        title: '', 
        description: '',  
        jobType: 'Part-time Job', 
        skillRequired: '', 
        duration: '',
        salary: '',
        deadlines: '',
        maxApplicants: '', 
        maxPositions: '',
    }

    const [postData, setPostData] = useState(initialState)
    const { title, description, jobType, skillRequired, duration, salary, deadlines, maxApplicants, maxPositions } = postData
    const [images, setImages] = useState([])


    const handleChangeInput = e => {
        const {name, value} = e.target
        setPostData({...postData, [name]: value})
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
    }

    return (
        <div className="createPost">
            <h2 className="text-primary text-center">Tell us what you need done</h2>

            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="title">Choose a name for your work</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="" 
                    onChange={handleChangeInput} value={title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description for this work</label>
                    <textarea className="form-control" id="description" name="description" cols="30" rows ="5" style={{resize: 'none'}}
                    onChange={handleChangeInput} value={description}/>
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
                        <option value="Part-time Job">Part-time Job</option>
                        <option value="Fulltime Job">Fulltime Job</option>
                        <option value="Work From Home">Work From Home</option>
                        <option value="Company">Company</option>
                        <option value="Other">Other</option>
                    </select>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="skillRequired">Skill</label>
                    <input type="text" className="form-control" name="skillRequired" id="skillRequired" placeholder="Enter Skill" 
                    onChange={handleChangeInput} value={skillRequired}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="duration">Duration</label>
                    <select className="form-select" id="duration" name="duration"
                    value={duration} onChange={handleChangeInput}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="salary">Salary/Budget</label>
                    <input type="number" className="form-control" id="salary" name="salary" placeholder="Enter Budget" 
                    value={salary} onChange={handleChangeInput}
                    />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="deadlines">Work Deadlines</label>
                    <input type="date" className="form-control" id="deadlines" name="deadlines"
                    value={deadlines} onChange={handleChangeInput}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="maxApplicants">Maximum Number of Applicants</label>
                    <input type="number" className="form-control" id="maxApplicants" name="maxApplicants" 
                    value={maxApplicants} onChange={handleChangeInput}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="maxPositions">Position Available</label>
                    <input type="number" className="form-control" id="maxPositions" name="maxPositions"
                    value={maxPositions} onChange={handleChangeInput}/>
                    
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
            </form>
        </div>
  )
}

export default CreatePost