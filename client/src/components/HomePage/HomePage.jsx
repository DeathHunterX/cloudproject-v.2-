import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="">
            <section id="home_header">
                <h2>Meet the unemployment killer!</h2>
                <p>Being unemployed is an unpleasant experience. For instance, you will not have enough money to support your children's dream, or statisfy need of your girfriend. Do not be afaird! we got your back!</p>
                <div className="btn">
                    <Link className="blue" to="/" >Learn More</Link>
                    <Link className="yellow" to="/browse" >Explore jobs</Link>
                </div>
            </section>

            <section id="features">
                <h1>Awesome Feature</h1>
                <p>Through those features, we hope that users will have the best experience while discovering our website:</p>
                <div className="fea-base">
                    <div className="fea-box">
                        <h3>Over 1M job opportunities</h3>
                        <p>This application includes over 1 million job opportunities over the world in different industries</p>
                    </div>

                    <div className="fea-box"> 
                        <h3>Fast searching, easy to apply</h3>
                        <p>To optimize the efficiency when finding a job for user, we prioritize the website simplity to decrease the time users spend on adapting to the system.</p>
                    </div>

                    <div className="fea-box">
                        <h3>Authenticated partner</h3>
                        <p>All information will be validated before uploading into the website.</p>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default HomePage