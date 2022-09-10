import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../redux/actions/authAction'

const ForgotPassword = () => {

  const dispatch = useDispatch()
  const initialState = {email: ''}
  const [userData, setUserData] = useState(initialState)
  const { email } = userData
  


  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(forgotPassword(userData))
  }

  return (
    <div className="auth_page fg_pass">
      <form onSubmit={handleSubmit}>
        <h4>Forgot Your Password?</h4>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email"
            aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />
            <button type="submit" className="btn btn-primary w-100 mt-3">Verify your email</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword