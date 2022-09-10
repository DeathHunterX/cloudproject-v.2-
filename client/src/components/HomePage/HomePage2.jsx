import React from 'react'
import auction from '../../images/HomePage/auction.png'
import progress from '../../images/HomePage/progress.png'
import quality from '../../images/HomePage/quality.png'
import resume from '../../images/HomePage/resume.png'

const HomePage2 = () => {
    return (
        <div className='best1'>
            <h1>What's great about it?</h1>
            <div className='boxcon1'>
                <div className='img1'>
                    <img className='icon' src={resume} alt="Resume" />
                </div>
                <div className='container1'>
                    <h2>Browse portfolios</h2>
                    <p>Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.</p>
                </div>

                <div className='img1'>
                    <img className='icon' src={auction} alt="Auction" />
                </div>
                <div className='container1'>
                    <h2>Fast bids</h2>              
                    <p>
                        Receive obligation free quotes from our talented helpers fast. 80% of projects get bid on within 60 seconds.
                    </p>
                </div>

                <div className='img1'>
                    <img className='icon' src={quality} alt="Quality" />
                </div>
                <div className='container1'>
                    <h2>Quality work</h2>         
                    <p>
                        LFHelper.com has by far the largest pool of quality helpers globally- over 50 million to choose from.
                    </p>
                </div>
                
                <div className='img1'>
                    <img className='icon' src={progress} alt="Progress" />
                </div>
                <div className='container1'>
                    <h2>Track progress</h2>         
                    <p>
                        Our talented team of recruiters can help you find the best companion for the job and our technical co-pilots can even manage the project for you.
                    </p>
                </div>

            </div>
            <hr/>
        </div>
    )
}

export default HomePage2