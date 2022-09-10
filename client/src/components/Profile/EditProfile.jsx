import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'


import {FaCamera}  from 'react-icons/fa'

import {checkImage} from '../../utils/imgUpload'


const EditProfile = ({setOnEdit}) => {
    const initState = {
        fullname: '', mobile: '', address: '', description: '', gender: ''
    }

    const [userData, setUserData] = useState(initState)
    const { fullname, mobile, address, description, gender } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])




    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err}
        })
        setAvatar(file)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
            onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                    alt="avatar" style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                    <span>
                        <FaCamera />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form_group mb-3">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute" 
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form_group mb-3">
                    <label htmlFor="mobile">Mobile</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="mobile"
                        name="mobile" value={mobile} onChange={handleInput} />
                    </div>
                </div>

                <div className="form_group mb-3">
                    <label htmlFor="address">Address</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="address"
                        name="address" value={address} onChange={handleInput} />
                    </div>
                </div>

                <div className="form_group mb-3">
                    <label htmlFor="description">Description</label>
                    <div className="position-relative">
                        <textarea className="form-control" id="description" cols="30" rows ="10"
                        name="description" value={description} onChange={handleInput} />
                         <small className="text-danger d-block text-right d-flex justify-content-end">
                            {description.length}/5000
                        </small>
                    </div>
                </div>

                
                <div className="input-group-prepend px-0 mb-3">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={gender} className="custom-select text-capitalize ms-3"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <button className="btn btn-info w-100 text-white" type="submit">Save</button>

            </form>

        </div>
    )
}

export default EditProfile