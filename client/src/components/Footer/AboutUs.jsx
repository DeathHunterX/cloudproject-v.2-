import React from 'react'

const AboutUsComponent = () => {
    let btnTemp = "btn01";
    const duration = 3000;
    let number_id = ["01", "02", "03", "04", "05", "06"];
    // eslint-disable-next-line
    let i = 0;
  
   
  
    function createElementCard({ number, type, description, duration }) {
        const main = document.getElementById("slides");
        if (main) {
            const bgc_colors = {
                "01": "#e8aa0c",
                "02": "#e8aa0c",
                "03": "#e8aa0c",
                "04": "#e8aa0c",
                "05": "#e8aa0c",
                "06": "#e8aa0c",
            };
            const colors = {
                "01": "#f4d88f",
                "02": "#f4d88f",
                "03": "#f4d88f",
                "04": "#f4d88f",
                "05": "#f4d88f",
                "06": "#f4d88f",
            };
            const urls = {
                "01": "./image/1.png",
                "02": "./image/2.png",
                "03": "./image/3.png",
                "04": "./image/4.png",
                "05": "./image/5.png",
                "06": "./image/6.png",
            };
    
            const left_card_bodys = {
                "01": "1. Coding, I am currently grinding Java and C#, which are my favorite languages</br></br></br>2. Working out 5-7 days a week is necessary for me to recover from COVID-19.</br></br></br>3. After hours of coding, I unwind by playing video games, which has a significant impact on my mental state.",
                "02": "1. I usually fascinated in challenging puzzle and problems. And so is pressure, I can work in overwhelming pressure.</br></br></br>2. Nothing more than connect with people in Boardgames. Only true nature of people shows through Boardgames.3. Coding is my minor objectives due to family issue. But it is my favorite to try to self-learn some programming.",
                "03": "1. Game development, it has always been the torch that light my path. I have learnt to program, to draw, to write so I can make video games.</br></br></br>2. I don’t like gym but I love having nice physics. I am close too the goal.</br></br></br>3. I enjoy playing videogames. But the one that lives me thinking, questioning and not League of Legends! worst game ever",
                "04": "1. Chilling with friends</br></br></br>2. Listening to music</br></br></br>3. Studying cutting-edge technology</br></br></br>4. Career-oriented activities",
                "05": "1. I have already knowledged in MySQL, Python, Java, C languages and basic web programming</br></br></br>2. Proficiency with Windows and relevant Microsoft office applications.</br></br></br>3. Strong communication skill that I can speak 5 languages",
                "06": "1. Chilling with my friends and make things more convenience.</br></br></br>2. Reading books</br></br></br>3. Improve my programming skills in C++, Python</br></br></br>4. Design an inforgraphic",
            };
            const frustrations = {
                "01": "1. Noises because they greatly distract me. I require focus when working.</br></br></br>2. I detest being ill. I want to always be in good health.</br></br></br>3.  Overload of deadlines in a short period of time.",
                "02": "1. I always plan for my life so it is very frustrated when something is goin out of my track.</br></br></br>2. Irresponsible people. This is the worst of people that I want to interact.</br></br></br>3.  The Covid-19 has flipped my whole life upside down. If there is one more, I rather suicide.",
                "03": "1. Pc, software updates and ASSIGNMENT that interfer with my game development.</br></br></br>2. People that take seats in library and leave for hours.</br></br></br>3. Macbook and Iphone, they are expensive but average. I have a $100 phone that do everything an Iphone provide. But I have to develop app for Ios users... for money!!!</br></br></br>4. Meaningless video games like league of legends, they make video games demonized in the public‘s eyes",
                "04": "1. Might be too strict</br></br></br>2. Lost in thought</br></br></br>3. Don’t know where is my limit",
                "05": "1. Noises because they greatly distract me. I require focus and only chilling music when working</br></br></br>2. Long-term deadlines, which makes me always worry about it</br></br></br>3. Nothing to do. I always try to do or learn something when I free",
                "06": "1. Bad at time management</br></br></br>2. Easy to distract</br></br></br>3. Deadline runner</br></br></br>4. Need more develioment in team communication",
            };
            const names = {
                "01": "nguyen phan nam",
                "02": "tran nguyen minh thuan",
                "03": "Phan Thanh Loi",
                "04": "nguyen dang nhat",
                "05": "Nguyen Phuong Nam",
                "06": "Nguyen Xuan Huy",
            };
            const positions = {
                "01": "Front-end Developer",
                "02": "Full-stack Developer",
                "03": "Front-end Developer",
                "04": "Data Analysis",
                "05": "junior data-analyst",
                "06": "Mock-up designer & Front-end assistance",
            };
            const abouts = {
                "01": "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.",
                "02": "Complicated life situations has led me to apply in software Engineer and end up doing in irrelevant family business when graduated. Decisive and fearless minds makes me founded RMIT Boardgames Club in semester 2 of my first year and abandon 4.0 GPA. Never regretted!",
                "03": "I am an introvert and I have trouble making friends. However, I never hate it. I want to claim myself game developer, I have game published on google play but they are small. I want to have a game worthy of all the time I have spent... I am still making one though.  STILL STANDING!!! </br>I want to be a indie, solo game developer... I never to sell my dream and work at a company. ",
                "04": "I am more an introverted person. I like to work with big data and Machine Learning. I am an objective-based person. Besides studying, I am also participating school activities and seek opportunities for myself",
                "05": "A studious, friendly IT student with nearly two year experience in database management, program development. ",
                "06": "I would describe myself as an extrovert person. Usually, I prefer enjoying my life alone. Imagine, take a sip of coffee and enjoy the sunrise at a quite cafe. Those stimulations will motivate me to start another stormy day where I can face with many challenges to improve myself with a peace in my mind. Therefore, chill!!!",
            };
            const needs = {
                "01": "1. Coding, I am currently grinding Java and C#, which are my favorite language</br></br>2. Working out 5-7 days a week is necessary for me to recover from COVID-19.</br></br>3. After hours of coding, I unwind by playing video games, which has a significant impact on my mental state.",
                "02": "1. Meeting people, but not too much. I must have sometime for my self.</br></br>2. Playing Boardgames, even in deadlines, I still play Boardgames > twice a week</br></br>3. Self-learning, I always find it is boring to attend class and only work best by learn by myself.",
                "03": "1. I really wish I have more time, I wanted to complete developing my video games but only find 1-2 hours a day to work on the game</br></br>2. Not wearing mask!!! I have trouble breathing under a mask!!!</br></br>3. Money to publish and market the project I have been developping....",
                "04": "1. Improve managing skills</br></br>2. Improve softskills and hardskills</br></br>3. Climb to a high position someday</br></br>4. Find happiness",
                "05": "1. Music is one of my actractive activity and I can do everything when listening to music</br></br>2. Weeding 5-7 days a week is necessary for me to recover from COVID-19 and a method to focus in working/studying</br></br>3. After hours and days of playing game and weeding, I spend most of my free time learning and coding",
                "06": "1. Spend more time concentrate on improving my personal skills, and team communication</br></br>2. Have more chilling time for myself</br></br>3. Learn new programming languages and more punctual on team dealines</br></br>4. Learn how to manage my personal time wisely",
            };
            const flex_directions = {
                "01": "row",
                "02": "row",
                "03": "row-reverse",
                "04": "row-reverse",
                "05": "row",
                "06": "row",
            };
            let bgc_color = bgc_colors[number];
            let color = colors[number];
            let url = urls[number];
            let name = names[number];
            let position = positions[number];
            let about = abouts[number];
            let need = needs[number];
            let flex_direction = flex_directions[number];
            let left_card_body = left_card_bodys[number];
            let frustration = frustrations[number];
            main.innerHTML = `
            <div
            id="${number}"
                class="slider__item"
            >
            <div class="slider__position">
                <div class="slider__container"
                    style="background-color: ${bgc_color};
                            flex-direction: ${flex_direction};"
                    >
                    <div 
                    class="slider__image"
                    style="background-image: url(${url});"
                    ></div>
                    <div class="slider__card"
                        style="background-color: ${color};"
                        >
                        <div class="slider__card__top">
                            <div class="card__top__title">${name}</div>
                            <div class="card__top__position">${position}</div>
                        </div>
                        <div class="slider__card__mid">
                            <div class="card__mid__left">
                                <div class="mid__left__title">about me</div>
                                <div class="mid__left__text">${about}</div>
                            </div>
                            <div class="card__mid__right">
                                <div class="mid__right__title">Desires</div>
                                <div class="mid__right__text">
                                    ${need}
                                </div>
                            </div>
                        </div>
                        <div class="slider__card__bottom">
                            <div class="bottom__left__card">
                                <div class="left__card__title">
                                    What likes the most
                                </div>
                                <div class="left__card__body">
                                    ${left_card_body}
                                </div>
                            </div>
    
                            <div class="bottom__right__card">
                                <div class="right__card__title">Frustrations</div>
                                <div class="right__card__body">
                                    ${frustration}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            </div>
            `;
        }
    }
    function showSuccess(number, btnId) {
     
      const btnSuccess = document.getElementsByClassName("btn");
      for (let index = 0; index < btnSuccess.length; index++) {
        if(btnSuccess[index].classList === "btn btn__success"){
            btnSuccess[index].classList.remove("btn__success");
        }
        
    }
        for (var k = 0; k < number_id.length; k++) {
            if (number_id[k] === number) i = k;
        }
        let btn_current = document.getElementById(btnId);
        btn_current.classList.add("btn__success");
        if (btnId !== btnTemp) {
            let btn_back = document.getElementById(btnTemp);
            btn_back.classList.remove("btn__success");
        }
        btnTemp = btnId;
        createElementCard({
            number: number,
            type: "succeed",
            description: "phi long",
            duration: duration,
        });
  
    }
    
    return (
      <div className="App">
         <header id="slogan" className="grid wide__1200">
                  <div className="header__title">For Coder, By Coder</div>
                  <div className="header__desc">
                      Meet our teams of IT warriors, ready to harness the Force
                      for the future technology Type a message
                  </div>
              </header>
  
              <main id="main" className="grid__1200 wide">
                  <div className="grid__row no__gutters main__slides">
                      <div className="col s__12 m__12 l__12">
                          <div className="slides" id="slides"></div>
                      </div>
                  </div>
  
                  <div className="grid__row page_navigation">
                      <div className="col s__12 m__12 l__12">
                          <span className="btn btn__success" id="btn01" onClick= {() => showSuccess('01','btn01')}>
                              01
                          </span>
                          <span className="btn" id="btn02" onClick= {() => showSuccess('02','btn02')}>
                              02
                          </span>
                          <span className="btn" id="btn03" onClick= {() => showSuccess('03','btn03')}>
                              03
                          </span>
                          <span className="btn" id="btn04" onClick= {() => showSuccess('04','btn04')}>
                              04
                          </span>
                          <span className="btn" id="btn05" onClick= {() => showSuccess('05','btn05')}>
                              05
                          </span>
                          <span className="btn" id="btn06" onClick= {() => showSuccess('06','btn06')}>
                              06
                          </span>
                      </div>
                  </div>
              </main>
      </div>
      
    );
}

export default AboutUsComponent