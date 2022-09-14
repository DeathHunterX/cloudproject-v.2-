import React from 'react'

import {FaCode, FaFacebook, FaTwitter, FaInstagram, FaGithub} from 'react-icons/fa'

import { expertInfoMap } from './AboutUs/expertInfoMap'

import AboutUsBg from '../../images/AboutUs/bg.jpg'


const AboutUsComponent = () => {
    
    return (
        <section id="experts" className="container">
            <h1>Meet our developers</h1>
            <p>Below is the contact of our developers</p>
            <div className="expert_box row">
                {
                    expertInfoMap.map((expert, idx) => 
                    (
                    <div className={`expert_container col-lg-4 col-md-6 col-sm-12 ${idx}`}  key={idx}>
                        <div className="card">
                            <div className="bg-img">
                                <img src={AboutUsBg} alt="background" />
                            </div>

                            <div className="picture">
                                <img src={require("../../images/AboutUs/Member/" + expert.lastName + ".jpg")} alt={`expert-${idx}`}  />
                            </div>

                            <div className="info">
                                <h3>{expert.name}</h3>
                                <h4>sId: {expert.sId}</h4>
                                <span><FaCode/>{expert.job}</span>
                                
                                <div className="icons">
                                    <a href={expert.facebook}><FaFacebook/></a>
                                    <a href={expert.twitter}><FaTwitter/></a>
                                    <a href={expert.instagram}><FaInstagram/></a>
                                    <a href={expert.github}><FaGithub/></a>
                                </div>
                            </div>
                        </div>

                        {/* <div className="moreInfo" id="popup-1" style={{display: "none"}}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="close-btn">&times;</div>
                                            
                                <div className="card-1">
                                    <div className="img-box">
                                        <img src="../images/creator-img/Duc Anh.jpg" alt="creator-1" />
                                    </div>
                                    <div className="content">
                                        <h2>------------Web Creator------------</h2>
                                        <p>Full name: Le Duc Anh <br />
                                            Student ID: s3758780 <br />
                                            Gender: Male	<br />
                                            Date of birth: 12/02/2000 <br /> 
                                            Major and minor: Information of Technology- Cloud Technologies Network <br />
                                            Interested: Cloud technology, Data analyze, Web development <br/>
                                            Role: Web developer <br/>
                                            Something about myself: I am an active and dynamic person who love to make friend with other people, I also love to join school clubs and extracurricular activities. In my free time, I love to hang out with my friends and watching movies. In this project, I play a role as one of Full-stacks Web developer and have joined from front-end tasks to back-ends. Even that I had a web project in Building IT Project before, this project has given for me a lot of experience in web project and it also help me improve a lot of team working skills.  
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    ))
                }
            </div>
        </section>
    )
}

export default AboutUsComponent