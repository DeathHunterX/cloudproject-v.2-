import React, {useState, useEffect} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { login } from '../../redux/actions/authAction'
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = { email: '', password: '' }

  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const [typePass, setTypePass] = useState(false)

  //handle the token when refresh page
  useEffect(() => {
    if(auth.token) navigate("/")
  }, [auth.token, navigate])


  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(userData))
  }


  return (
    <div className="auth_page login">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase">Looking For Helpers</h3>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email"
          aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="pass">
            <input type={typePass? "text" :"password"} 
            className="form-control" id="exampleInputPassword1" name="password"
            onChange={handleChangeInput} value={password} />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass  ? 'Hide' : 'Show'}
            </small>
          </div>
          
        </div>

        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-start">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col d-flex justify-content-end">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3"
        disabled={email && password ? false : true}>
          Login
        </button>

        
        <p className="my-2 mt-4">You don't have an account? <Link to="/register">Register Now</Link></p>
      </form>      
    </div>
  )
}

export default Login