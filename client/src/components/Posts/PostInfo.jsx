import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Carousel from '../Carousel'
import { useNavigate, Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { deletePost } from '../../redux/actions/postAction'


import {FiMoreHorizontal, FiTrash, FiShare} from 'react-icons/fi'
import {MdCreate} from 'react-icons/md'

import {Rating} from '@mui/material'

import EditPost from './EditPost'
import { BASE_URL } from '../../utils/config'
import ApplyJob from '../Job/ApplyJob'
import RightSideBar from './RightSideBar'


const PostInfo = ({post}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [onEdit, setOnEdit] = useState(false)
    const [onApply, setOnApply] = useState(false)

    useEffect(() => {
        if (onEdit) {
          dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true }})
          dispatch({type: GLOBALTYPES.MODAL, payload: true})

        } else {
          dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: false }})
          dispatch({type: GLOBALTYPES.MODAL, payload: false})
        }
    }, [onEdit, dispatch, post])


    
    const handleDeletePost =  () => {
        if(window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({post, auth}))
            return navigate("/lists")
        }
        
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }
    
    // console.log(new Date(Date.now()).toISOString())
    // console.log(new Date(post.deadlines).toISOString())
    
    return (
        <div className="post_info">
            <div className="card">
                <div className="card-content">
                    <div className="card_header">
                        <h4 style={{fontWeight: "bold"}}  className="title">{post.title}</h4>
                        <div className="nav-item dropdown option-item">
                            {
                                auth.user._id === post.userId._id &&
                                <>
                                    <span id="moreLink" data-bs-toggle="dropdown"> <FiMoreHorizontal /> </span>
                                    <div className="dropdown-menu dropdown-menu-start">
                                        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                                            <span><MdCreate /></span> Edit Post
                                        </div>
                                        <div className="dropdown-item" onClick={handleDeletePost}>
                                            <span><FiTrash /></span> Remove Post
                                        </div>
                                    </div>
                                </>
                            }      
                        </div>


                    </div>
                    <div className="card_body">
                        <div className="time" style={{display: "flex"}}>
                            <p >Open: <span style={{fontWeight: "normal"}} className="text-danger">{moment(post.createAt).format('MM/DD/YYYY')}</span></p>
                            <p >Deadlines: <span style={{fontWeight: "normal"}} className="text-danger">{moment(post.deadlines).utc().format('MM/DD/YYYY')}</span></p>
                            <p >Salary: <span style={{fontWeight: "normal"}}>{post.salary}$/Hour</span></p>
                        </div>

                        <div className="post_added d-flex justify-content-between mb-3">
                            {
                                auth.user._id !== post.userId._id && 
                                (
                                    new Date(Date.now()).toISOString() < new Date(post.deadlines).toISOString() ?
                                        (
                                            <button className="btn btn-primary"
                                            onClick={() => setOnApply(true)}>
                                                Applied for this job
                                            </button>
                                        )
                                        :
                                        
                                        (
                                            <button className="btn btn-danger">
                                                Job Applied Closed
                                            </button>
                                        )
                                )
                            }
                            {
                                auth.user._id === post.userId._id && (
                                    <div className="candidate_info">
                                        <Link to={`/job/${post._id}`}>
                                            <button className="btn btn-primary">See candidates</button>  
                                        </Link>

                                        <Link to={`/employees/${post._id}`}>
                                            <button className="btn btn-primary">Employees </button>  
                                        </Link>
                                    </div>
                                )
                            }
                            
                            <button className="btn btn-primary" style={{marginLeft: "50px"}} onClick={handleCopyLink}><span><FiShare /></span> Copy link</button>

                        </div>
                        
                        <div className="d-flex justify-content-start">
                        <Rating name="read-only" value={post.rating} precision={0.5} readOnly/> <span>({post.rating})</span>
                            <p style={{fontWeight: "bold"}} className="ms-3">Skill: <span style={{fontWeight: "normal"}}> {post.skillRequired}</span></p>
                        </div>
                        
                        
                    
                        <p style={{fontWeight: "bold"}}>About the employer: <span style={{fontWeight: "normal"}}>{post.userId.username}</span> </p>
                        {
                            auth.user._id === post.userId._id && (
                                <>
                                    <p style={{fontWeight: "bold"}}>Number of applicants: <span style={{fontWeight: "normal"}}>{post.maxApplicants}</span> </p>
                                    <p style={{fontWeight: "bold"}}>Number of positions: <span style={{fontWeight: "normal"}}>{post.maxPositions}</span> </p>
                                    <p style={{fontWeight: "bold"}}>Number of accepted applicants: <span style={{fontWeight: "normal"}}>{post.acceptedRecruiters}</span></p>
                                </>
                            )
                        }
                        <p style={{fontWeight: "bold"}}>
                            Description: <span style={{fontWeight: "normal"}}>{post.description}</span>
                        </p>
                        <div className="show_images">
                            
                            {
                                post.images.length > 0 &&
                                <>
                                    <h6 style={{marginTop: "50px"}}>Detail Description</h6>
                                    <Carousel images={post.images} id={post._id} />
                                </>
                            }
                        </div>


                        {
                            onEdit && 
                            <EditPost
                            setOnEdit={setOnEdit}
                            />
                        }
                        {
                            onApply && 
                            <ApplyJob
                            setOnApply={setOnApply}
                            />
                        }
                    </div>
                    
                </div>
            </div>
            {auth.user._id !== post.userId._id && (
                <RightSideBar />
            )}
            
        </div>
    )
}

export default PostInfo