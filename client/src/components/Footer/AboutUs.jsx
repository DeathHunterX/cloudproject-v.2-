import React from "react";
import "../../styles/about.css";
import {
  FaCode,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

import { expertInfoMap } from "./AboutUs/expertInfoMap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AboutUsBg from "../../images/AboutUs/bg.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height:700,
  bgcolor: "#e8aa0c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AboutUsComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [detailMember, setDetailMember] = React.useState({});
  const handleOpen = (expert) => {
    console.log(expert)
    setDetailMember(expert);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <section id="experts" className="container">
      <h1>Meet our developers</h1>
      <p>Below is the contact of our developers</p>
      <div className="expert_box row">
        {expertInfoMap.map((expert, idx) => (
          <div
            className={`expert_container col-lg-4 col-md-6 col-sm-12 ${idx}`}
            key={idx}
          >
            <div className="card">
              <div className="bg-img">
                <img src={AboutUsBg} alt="background" />
              </div>

              <div className="picture">
                <img
                  src={require("../../images/AboutUs/Member/" + expert.lastName + ".jpg")} alt={`expert-${idx}`}
                  onClick={() => {
                    handleOpen(expert);
                  }}
                />
              </div>

              <div className="info">
                <h3 onClick={() => { handleOpen(expert); }}>
                  {expert.name}
                </h3>
                <h4>sId: {expert.sId}</h4>
                <span>
                  <FaCode />
                  {expert.job}
                </span>

                <div className="icons">
                  <a href={expert.facebook}>
                    <FaFacebook />
                  </a>
                  <a href={expert.twitter}>
                    <FaTwitter />
                  </a>
                  <a href={expert.instagram}>
                    <FaInstagram />
                  </a>
                  <a href={expert.github}>
                    <FaGithub />
                  </a>
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
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div id="main" className="grid wide__1200">
            <div className="row no__gutters main__slides">
              <div className="col s__12 m__12 l__12">
                <div id="01" className="slider__item">
                  <div className="slider__position">
                    <div
                      className="slider__container"
                      style={{bgcolor: '#e8aa0c', flexDirection: 'row'}}
                    >
                      <div
                        className="slider__image"
                        style={{backgroundImage: detailMember.image}}
                      ></div>
                      <div className="slider__card" style={{bgcolor: '#f4d88f'}} >
                    <div className="slider__card__top">
                        <div className="card__top__title">{detailMember.name}</div>
                        <div className="card__top__position">{detailMember.job}</div>
                    </div>
                    <div className="slider__card__mid">
                        <div className="card__mid__left">
                            <div className="mid__left__title">about me</div>
                            <div className="mid__left__text">{detailMember.abouts}</div>
                        </div>
                        <div className="card__mid__right">
                            <div className="mid__right__title">Desires</div>
                            <div className="mid__right__text">
                                {detailMember.needs}
                            </div>
                        </div>
                    </div>
                    <div className="slider__card__bottom">
                        <div className="bottom__left__card">
                            <div className="left__card__title">
                                What likes the most
                            </div>
                            <div className="left__card__body">
                               {detailMember.left_card_bodys}
                            </div>
                        </div>

                        <div className="bottom__right__card">
                            <div className="right__card__title">Frustrations</div>
                            <div className="right__card__body">
                                {detailMember.frustrations}
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </section>
  );
};

export default AboutUsComponent;
