import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../redux/actions/authAction'




const ResetPassword = () => {
  const dispatch = useDispatch()
  const {token} = useParams()

  const initialState = {password: '', cf_password: ''}
  const [userData, setUserData] = useState(initialState)

  const {  password, cf_password } = userData

  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(resetPassword(userData, token))
  }


  return (
    <div className="auth_page fg_pass">
      <form onSubmit={handleSubmit}>
        <h4>Change Password</h4>

        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <div className="pass">
                <input type={typePass? "text" : "password"} 
                className="form-control" id="exampleInputPassword1" name="password"
                onChange={handleChangeInput} value={password} 
                style={{background: `${alert.password ? "#fd2d6a14" : ""}`}} />

                <small onClick={() => setTypePass(!typePass)}>
                    {typePass  ? 'Hide' : 'Show'}
                </small>
            </div>

            <small className="form-text text-danger">
                {alert.password ? alert.password : ""}
            </small>
        </div>

        <div className="mb-3">
            <label htmlFor="retypePassword" className="form-label">Confirm Password</label>
            <div className="pass">
                <input type={typeCfPass? "text" : "password"} 
                className="form-control" id="retypePassword" name="cf_password"
                onChange={handleChangeInput} value={cf_password} 
                style={{background: `${alert.cf_password ? "#fd2d6a14" : ""}`}} />
                
                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                    {typeCfPass  ? 'Hide' : 'Show'}
                </small>
            </div>

            <small className="form-text text-danger">
                {alert.cf_password ? alert.cf_password : ""}
            </small>
            
            <button type="submit" className="btn btn-primary w-100 mt-3">Reset Password</button>
        </div>


      </form>
    </div>
  )
}

export default ResetPassword