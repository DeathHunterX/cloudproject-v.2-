import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='hero'>
            <div className='content'>
                <h1>Find the perfect helper</h1>
                <p className='search-text'> Search the largest selection of jobs or freelancer that is professional and responsive. </p>
                <div className='homeBtn'>
                    <Link to="/createPost">
                        <button className='btn1'>Find a support</button>
                    </Link>
                    <Link to="/browseJobs">
                        <button className='btn2'>Find  suitable job for you</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage