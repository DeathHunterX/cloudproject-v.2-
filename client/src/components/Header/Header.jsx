import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Avatar from '../Avatar'

import { logout } from '../../redux/actions/authAction'
import Search from './Search'

const Header = () => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const navLinks = [
        {id: 'home_header', label: 'Home', path: '/'},
        {id: 'browse_header', label: 'Browse', path: '/browse'},
        {id: 'about_header', label: 'About', path: '/about'},
        {id: 'create_header', label: 'Create Post', path: '/createPost'},


    ]

  return (
    <div className="header bg-light">
        <nav className="navbar container navbar-light bg-light">
            <div className="logo">
                <Link to="/" className="d-flex">
                    <h1 className="navbar-brand mt-2">Logo</h1>
                </Link>
            </div>
            <div className="navbar-nav ms-5">
                <Search />
            </div>
            <ul className="navbar-nav flex-row ms-auto">
                {navLinks.map((link, idx) => {
                    return (
                        <li className={`nav-item px-2 ${link.id}`} key={idx}>
                            <Link className="nav-link" to={link.path}>
                                {link.label}
                            </Link>
                        </li>
                    )
                })}

                {auth.token ?  
                <li className="nav-item px-2 dropdown">
                    <span className="nav-link" id="navbarDropdown" 
                    role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar"/>
                    </span>
                    
                    <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown">
                        <span className="text-muted ms-2">Account</span>
                        <Link className="dropdown-item" to={`/dashboard/${auth.user._id}`}>Dashboard</Link>
                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>My Profile</Link>
                        <Link className="dropdown-item" to={`/enrolled/${auth.user._id}`}>Enrolled Course</Link>
                        <hr className="dropdown-divider"/>
                        <span className="text-muted ms-2">Instructor</span>
                        <Link className="dropdown-item" to={`/myCourses/${auth.user._id}`}>My Course</Link>
                        <hr className="dropdown-divider"/>
                        <Link className="dropdown-item" to={`/settings/`}>Settings</Link>
                        <Link className="dropdown-item" to="/"
                        onClick={() => dispatch(logout())}
                        >
                            Log Out
                        </Link>
                    </div>
                </li>
                :
                <li className="nav-item px-2 loginRegister">
                <Link className="nav-link" to={"/login"}>
                    Sign In/Sign up
                </Link>
                </li> }
                
            </ul>
        </nav>
    </div>
  )
}

export default Header