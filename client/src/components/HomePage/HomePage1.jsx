import React from "react"
import research from '../../images/HomePage/research.png'
import choosing from '../../images/HomePage/choosing.png'
import pay from '../../images/HomePage/pay.png'
import help from '../../images/HomePage/help.png'

const HomeHeader = () => {
    return (
        <div className='best1'>
            <hr/>
            <h1>Need something done?</h1>
            <div className='boxcon1'>
                <div className='img1'>
                    <img className='icon' src={research} alt="Research" />
                </div>
                <div className='container1'>
                    <h2>Post a job</h2>
                    <p>It's free and easy to post a job.Simply fill in a tittle,description and budget and competitive bids come within minute</p>
                </div>
                <div className='img1'>
                    <img className='icon' src={choosing} alt="Choosing" />
                </div>
            <div className='container1'>
                <h2>Choose helpers</h2>
                <p>
                    No job is too big or too small. We've got helpers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!
                </p>
            </div>
                <div className='img1'>
                    <img className='icon' src={pay} alt="Pay" />
                </div>
            <div className='container1'>
                <h2>Pay safely</h2>
                <p>
                    Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.
                </p>
            </div>
                <div className='img1'>
                    <img className='icon' src={help} alt="Help" />
                </div>
            <div className='container1'>
                <h2>We're here to help</h2>
                <p>
                    Our talented team of recruiters can help you find the best helper for the job and our technical co-pilots can even manage the project for you.
                </p>
            </div>
            </div>
            <hr/>
        </div>
    )
}

export default HomeHeader