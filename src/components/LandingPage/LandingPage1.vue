<template>
<div class="mainCont">

     <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
     <div class="container">
         <a class="navbar-brand" href="" onclick="window.location.reload();return false">
                <img  class="logo" src="../../assets/images/logo-white.png">
            </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
         <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto" style="width: 90%; justify-content: space-between">
            <a class="nav-item nav-link override-nav" href="#">HOME</a>
            <a class="nav-item nav-link override-nav" href="#about_section">ABOUT</a>
            <a class="nav-item nav-link override-nav" href="#about_section">SERVICE</a>
            <a class="nav-item nav-link override-nav" href="#impact_section">IMPACT</a>
            <a class="nav-item nav-link override-nav" href="#impact_section">FAQ</a>
            </div>
        </div>
        </div>
    </nav>

    <div class="header">
        <div class="header-left">
            <img src="../../assets/images/Rectangle.png" alt="" style="width: 120%"/>
            <img class="white-wave" src="../../assets/images/ghsg1.png" alt=""/>
            <div class="recText">
                <p  class="big">Learn Anything</p>
                <p class="small">Prepclass is a social enterprise that helps learners easily hire the services of qualified tutors.</p>
            </div>
        </div>
        <div class="header-right">
            <img class="headphone" src="../../assets/images/MainPage.svg" alt=""/>
            <img class="dotdot" src="../../assets/images/dotdot.png" alt=""/>
            <div class="curve">
            <div class="imghod">
                <img class="right-curve" src="../../assets/images/dhh.png" alt=""/>
                <img class="left-curve" src="../../assets/images/dhh1.png" alt=""/>
            </div>
            </div>
        </div>
    </div>
    
            <div class="trust-us">
                <div class="partners">
                    <div class="trust-img"><img src="../../assets/images/forbes.png" alt=""></div>
                    <div class="trust-img"><img src="../../assets/images/mit.png" alt="" ></div>
                   <div class="trust-img"> <img src="../../assets/images/tribune.png" alt="" ></div>
                   <div class="trust-img"> <img src="../../assets/images/fast_company.png" alt="" ></div>
                   <div class="trust-img"> <img src="../../assets/images/bella.png" alt="" ></div>
                   <div class="trust-img"> <img src="../../assets/images/humanipo.png" alt="" ></div>
                </div>
                <div class="trust-dot"><img class="dotdotdot" src="../../assets/images/ggd2.png" alt="" ></div>
            </div>

            <a id="about_section">
            <div class="about1">
                <h3 class="about-left-header">Who We Are </h3>
                <div class="container">
                    <p class="about-text">
                         Prepclass is a social enterprise that uses technology to make education accessible, interactive and engaging for all categories of learners.
                         As an educational technology business, our primary focus is aggregating professional tutors and connecting them with learners that need academic support or 
                         bespoke learning programs that are specifically crafted to help the learners achieve their goals.
                    </p>
                </div>
                   <div class="abt-btn-div">
                        <button type="submit" class="about-button"><a href="https://prepclass.com.ng/about" style="color:#ffffff">Learn More</a></button>
                    </div>
            </div>
            </a>

                <!-- Service We Offer -->
        <a id="service_section">
        <div class="class-group-container">
            <h3 class="popular">Services We Offer</h3>

            <div class="cards-container">
                <!-- Single card -->
                <div class="card-with-text">
                    <div class="single-card-wrapper single-card-one">                    
                        <div class="card-content">
                            <p class="card-text">Academy</p>
                            <p class="card-more"><a href="https://prepclass.com.ng/academy">Learn More</a>
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>
                            <p  class="single-text">
                                With 3 physical learning centers in Lagos Nigeria, Prepclass
                                Academy helps learners prepare for standardized tests and 
                                exams. Learners can easily walk into any of our centers for 
                                exams like IELTS, GMAT, GRE, SAT, TOEFL, etc.
                            </p>
                </div>
                <!-- Single card -->
                <div class="card-with-text">
                    <div class="single-card-wrapper single-card-two">                    
                        <div class="card-content">
                            <p class="card-text">Tutor Marketplace</p>
                            <p class="card-more"><a href="https://prepclass.com.ng/tmp">Learn More</a>
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>
                            <p  class="single-text">
                                Prepclass Tutor market place is a platform that allows 
                                learners to easily hire the services of a home tutor. 
                                Dubbed as the Uber for tutoring in Africa, learners can 
                                easily request tutoring services from our database of 
                                over 50,000 tutors.
                            </p>
                </div>
                <!-- Single card -->
                <div class="card-with-text">
                    <div class="single-card-wrapper single-card-three">                    
                        <div class="card-content">
                            <p class="card-text">Tutor Grow Initiative</p>
                            <p class="card-more"><a href="https://prepclass.com.ng/ltu">Learn More</a>
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>    
                            <p  class="single-text">
                                With our vast reach of tutors and learners, Prepclass has invested 
                                im several programs that improve the quality of lives of tutors as 
                                well as the outcomes for learners. Projects we are involved in include:
                                tutor training and placement in foreign gigs, free coding classes for teens, 
                                free language learning classes for adults etc.
                            </p>
              </div>
            </div>
        </div>
        </a>

        <a id="impact_section">
        <div class="get-started">
            <h3>Impact</h3>
            <div class="fun">
                <div class="enrol">
                  <span id="count1" class="fir-p"></span>
                  <span class="fir-p">K</span>
                    <p class="sec-p">
                        Teachers<br> Enrolled
                    </p>
                </div>
                <div class="enrol">
                    <span id="count2" class="fir-p"></span>
                    <span class="fir-p">H</span>
                    <p class="sec-p">
                        Tutoring Hours<br> Taught
                    </p>
                </div>
                <div class="enrol">
                     <span id="count3" class="fir-p"></span>
                    <span class="fir-p">B</span>
                    <p class="sec-p">
                        Income<br> Generated
                    </p>
                </div>
                <div class="enrol">
                     <span id="count4" class="fir-p"></span>
                    <span class="fir-p">K</span>
                    <p class="sec-p">
                        Total<br> 
                        Leaners
                    </p>
                </div>
                <div class="enrol">
                    <button>Click Here</button>
                    <p class="sec-p">
                        Impact<br> Assesment
                    </p>
                </div>
            </div>
                <div class="get-dot">
                    <img class="dotdotdot" src="../../assets/images/dot.png" >
                </div>
        </div>
        </a>

        <!-- FAQ -->
       <a>
        <div class="faq">
             <h3>Often asked questions</h3>
            <div id="faq-container">
                <div class="container">
                <div class="row justify-content-between" id="row-data">
                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                        <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> When was Prepclass founded?</h6>
                        <p><strong style="color:#5e9047; font-weight:bold">A</strong>: Prepclass was founded in 2012 by 2 former classmates. </p>
                    </div>
                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                        <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> Is Prepclass a not for profit?</h6>
                        <p><strong style="color:#5e9047; font-weight:bold">A</strong>: Prepclass is a profit driven social enterprise.</p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                         <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> How do I benefit from LTU as a tutor?</h6>
                        <p class="text-center text-md-left"><strong style="color:#5e9047; font-weight:bold">A</strong>:  
                           Prepclass LTU trains Prepclass tutors the necessary skills required for them to effectively administer Prepclass classes. Using a pedagogic
                            approach to learning, Prepclass trains tutors on communication, social skills and subject proficiency. After training, Prepclass tutors can access 
                            the plethora of job opportunities available on the platform
                         </p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                         <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> How does prepclass Academy work?</h6>
                        <p class="text-center text-md-left"><strong style="color:#5e9047; font-weight:bold">A</strong>:  
                           Prepclass Academy helps learners prepare for popular standardized exams like IELTS, GMAT, GRE, etc. A learner can walk into
                            any of our centers, take a diagnostics test to ascertain exam readiness before lectures in accordance to our curriculum tailored lesson
                             plans required to get the candidates desired exam score.
                         </p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                         <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> How do I get tutor for my kids?</h6>
                        <p class="text-center text-md-left"><strong style="color:#5e9047; font-weight:bold">A</strong>:  
                          Parents can visit this <a href="http://prepclass.com.ng/get-a-tutor">link</a>, tell us all the learners' goals. A class manager would reach out to the parent to discuss all the home tutoring options available for the goal. 
                         </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </a>

        <div class="contact-us">
            <h3>Contact Us</h3>
            <p>If you have any questions you can reach out to us</p>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
            <a href="#">
                 09035321117
            </a>
            </span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                 <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
            <a href="mailto:info@prepclass.com.ng"> 
                 info@prepclass.com.ng
            </a>
            </span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
            <a class="" href="https://api.whatsapp.com/send?phone=2349035321117">
                Chat on Whatsapp
              </a>
              </span>
        </div>        
                
        <div class="interest-wrapper">
            <h3>PrepClass Business</h3>
            <div class="interest-content">                
            <p class="interest-text">Do you want to do Business leveraging from our vast database of Quality Tutor?</p>
            <p class="interest-text1">Click on the button below.</p>
            <button type="submit" class="interest-button">Learn More</button>
            </div>
            <img class="interest-image" src="../../assets/images/ggd5.png" alt="">
        </div>        

        <section style="background:#CAE9F0" class="pt-5 footer3">
            <ul class="ulx">
                <a href="/about"><li>ABOUT PREPCLASS</li></a>
                <a href="/privacy-policy"><li>PRIVACY POLICY </li></a>
                <a href="/contact-us"><li>CONTACT US </li></a>
            </ul>
            <div class="foot pt-2 pb-5" style="height:100%">
                <div class="container">
                    <div class="row pt-5 pb-1">
                        <div class="col-sm-12 col-lg-6 mt-5 pt-5">
                        <img src="../../assets/images/logo-white.png" style="width:200px"/>
                         <p class="pt-3" style="color:white; font-size:1.2rem">
                            Prepclass is an edtech (educational technology) company that focuses on connecting potential learners with skilled tutors. Our interest is to break from the norm of formal education by providing tutors for basically anything a client may wish to learn. From English language and grammar structuring to phonetics, sounds and pronunciation, learners from the age of 4 can be easily signed up by their parents or wards online for sessions that will take place physically at the child/learner/tutee’s comfortable home and time.
                            <a href="/about" style="color:white"><b>Read more </b></a>
                        </p>
                    </div>

                <div class="col-sm-12 col-lg-6 pt-5">
                    <div class="row pt-5">
                        <div class="col-sm-12 col-lg-4">
                            <ul class="menux">
                                <a href="/blog"><li class="pt-2">Blog </li></a>
                                <a href="/tutoring-jobs"><li class="pt-2">Tutor Jobs </li></a>
                                <a href=""><li class="pt-2">About Us </li></a>
                                <a href=""><li class="pt-2">Frequently Asked Questions </li></a>
                                <a href="" target="_blank"><li class="pt-2">Join Our IELTS Classes </li></a>
                                <a href="" target="_blank"><li class="pt-2">Join Our SAT Classes </li></a>
                                <a href=""><li class="pt-2">Join Our TOEFL BDT classes</li></a>
                                <a href=""><li class="pt-2">Join Our GMAT classes</li></a>
                                <a href=""><li class="pt-2">Join Our GRE classes</li></a>
                            </ul>
                        </div>

                        <div class="col-sm-12 col-lg-4" style="border-left:1px solid lightgray">
                                <ul class="menux">
                                    <a href=""><li class="pt-2">Get A Home Tutor </li></a>
                                    <a href=""><li class="pt-2">Become A PrepClass Tutor </li></a>
                                    <a href=""><li class="pt-2">Become A Scout Partner </li></a>
                                    <a href="https://play.google.com/store/apps/details?id=com.prepclasspreptest"><li class="pt-2">JAMB Preparation App </li></a>
                                    <a href="https://prepclass.com.ng/tutor-calculator"><li class="pt-2">Tutor Price Calculator</li></a>
                                    
                                </ul>
                        </div>

                        <div class="col-sm-12 col-lg-4">
                                <ul class="menux">
                                    <a href=""><li class="pt-2">Privacy Policy </li></a>
                                    <a href="https://api.whatsapp.com/send?phone=2349035321117"><li class="pt-2">Chat Us on Whatsapp </li></a>
                                    <a href="mailto:info@prepclass.com.ng"><li class="pt-2">Send Us A Mail </li></a>
                                    <a href="#"><li class="pt-2">Call 012913970 or 09035321117 </li></a>
                                </ul>
                        </div> 
                    </div>

                    <div class="row mt-3 ml-2">
                        <div class="col-sm-12 col-lg-12">
                                <span style="color:white; font-weight:600" class="success-msg"></span>
                                <span style="color:black; font-weight:600" class="error-msg"></span>
                        </div>
                        <div class="col-sm-12 col-lg-11">
                            <div class="">
                                <form name="subForm">
                                    <input type="text"  class="form-control pl-3 pt-3 pb-3 btn-xx" name="email" id="email" placeholder="Subscribe to our Newsletter"/>
                                    <button class="float-right btx pt-2 mt-2 pb-2 pl-2  pr-3 mr-1 sub-btn">Subscribe <div class="spinner-border spinner-border-sm" ></div></button>
                                </form>
                                <small style="color:white ">We promise not to spam you. </small>
                            </div>
                        </div>
                        <div class="col-sm-12 mt-1 col-lg-9">
                            <center>
                                <a href="https://facebook.com/prepclass.com.ng"><button class="social"><i class="zmdi zmdi-facebook"></i></button></a>
                                <a href="https://twitter.com/PrepclassNG"><button class="social"><i class="zmdi zmdi-twitter"></i></button></a>
                                <a href="https://www.instagram.com/prepclassng/"><button class="social"><i class="zmdi zmdi-instagram"></i></button></a>
                                <a href="https://ng.linkedin.com/company/prepclass-com-ng"><button class="social"><i class="zmdi zmdi-linkedin"></i></button></a>
                                 <a href="https://youtube.com/prepclassng"><button class="social"><i class="zmdi zmdi-youtube"></i></button></a>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
       </div>
</template>

<script>

   document.onreadystatechange = function() {
  let lastScrollPosition = 0;
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function(e) {
    lastScrollPosition = window.scrollY;
    
    if (lastScrollPosition > 100)
      navbar.classList.add('navbar-dark');
    else
      navbar.classList.remove('navbar-dark');
  });
}

document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if(current == end) {
                clearInterval(timer);
            }
        }, step);
    }
    counter("count1", 0, 100, 20000);
    counter("count2", 0, 9000, 20000);
    counter("count3", 0, 50, 20000);
    counter("count4", 0, 900, 20000);
});
</script>

<style lang="scss" scoped>

// .logo-white {
//     display: none;
// }
.navbar {
  background-color: rgba(0, 0, 0, 0) !important;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-function: ease-in-out;
}

.navbar-dark {
  background-color: rgba(256, 256, 256, 256) !important;
  color: #5f9048!important;

    .navbar-brand img{
        content: url('../../assets/images/small-logo.png');
  }

  .navbar-toggler {
    background-color:#000000;
}
}

.override-nav {
color: #000000 !important;
font-weight: bold;
font-size: 10pt;
opacity: 1 !important;
font-family: Ubuntu;
}

nav {
height: 8vh;
}

.dotdotdot {
width:100%;
}

.mainCont{
max-width: 100vw;
overflow-x: hidden;
}

.header {
height: 700px;
overflow: hidden;
position: relative;
background: #f7f7f7;
}

.recText {
position: absolute;
top: 20%;
left: 10%;
width: 36rem;
.big {
font-family: Ubuntu;
font-size: 2.5rem;
font-style: normal;
font-weight: 700;
line-height: 6.125rem;
letter-spacing: 0em;
text-align: center;
color: #ffffff;
}

.small {
font-family: Ubuntu;
font-size: 1.5rem;
font-style: normal;
font-weight: 500;
line-height: 2rem;
letter-spacing: 0em;
text-align: center;
color: white;
}
}

.header-left {
position: absolute;
left: 0;
top: 0;
width:50%;

.white-wave {
position: absolute;
left: 0;
top: 55%;
}
}

.header-right {

width: 50%;
.headphone {
position: absolute;
top: 5rem;
right: -10rem;
width: 70%;
height: 100%;
z-index: 9;
}

.dotdot {
width: 20rem;
position: absolute;
top: -1rem;
right: 8rem;
z-index: 1;
}

.curve {
display: flex;
 position: absolute;
 right: 48.6%;
 top: 0;

.imghod {
position: relative;

.left-curve {
    position: absolute;

    width: 172px;
    height: 172.98px;
    right: 0;
    mix-blend-mode: color-dodge;
    transform: rotate(180deg);  
     z-index: 99;

 }

.right-curve {
    position: absolute;

    width: 172.98px;
    height: 172.98px;
    right: -2.4rem;
    mix-blend-mode: difference;
    transform: rotate(180deg);
    z-index: 99;
}
}
}
}

.trust-us {
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #ffffff;
height: 8vh;

.partners{
display: flex;
justify-content: space-between;
align-items: center;
width:96.5%;

img {
width: 80%;
}

}

.trust-dot {
    position: absolute;
    top: -6em;
    right: -1rem;
    width: 180px;
    height: 50vh;
}

}

.card-title {
font: Ubuntu;
 font-weight: 700;
 font-size: 48px;
 line-height: 55.15px;
 color: #ffffff;
}

.card-text {
font: Ubuntu;
 font-weight: 500;
 font-size: 24px;
 line-height: 27.98px;
 color: #ffffff;
}

.imgText{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:  center;
    justify-content: center;
}

@media only screen and (max-width: 768px){
    .recText{
width: 20rem;
top: 7rem;

 .big{
        font-size: 30px !important;
        line-height: 2rem !important;
        }

    .small{
    font-size: 20px !important;
    color: white;
    }
}
    .header {
        height: 400px;
        background-color:#5f9048;
    }
    .header-right{
        top: 5rem;
        right: -5rem;
    }

    .left-curve {
        display:none;
    }

    .right-curve {
        display:none;
    }

    .header-left {
        display: block;
        img {
            display:none;
        }
    }
}

@media only screen and (max-width: 600px) {

.recText{
width: 20rem;
top: 5rem;

 .big{
        font-size: 2rem !important;
        line-height: 4rem !important;
        text-align: center;
        }

    .small{
    font-size: 1.5rem !important;
    color: #ffffff;
    text-align: center;
    }
}

.header-right {
display: none;
width: 30%;

.headphone {
position: absolute;
top: 5rem;
right: 2rem;
width: 90%;
z-index: 9;
}

.header-left {
    display: none;
}
}

.right-curve {
display: none;
}
.left-curve {
display: none;
}

.trust-dot {
display: none !important;
}


.imgText h5{
font-size: 28px;
}
.imgText p{
font-size:18px;
}
#input{
width: 100%;
}

#cont{
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
}

#asked-question {
h2 {
font-size: 20px;
}
h4 {
font-size:1rem;
font-weight:bold;
}
p{
font-size:18px;
}
}

}

#cont {
display: flex;
justify-content: space-between;
width: 100%;
}

h3 {
font-family: Ubuntu;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 41px;
letter-spacing: 0em;
text-align: center;
margin-top: 30px;
}

#want-to-learn {
margin-left: 10px;
background: #5F9048;
color: #FFFFFF;
font-size: 28px;

}

#input {
font-size: 18px;
font: Ubuntu;
font-style: normal;
line-height: 20.68px;
font-weight: 500;
}

.wrapp {
display: flex;
height: 40vh;
}

#text {
top: 50;
}

.imgClass1{
height: 32vh;
width: 22vw;
background-size: cover;
background-repeat: no-repeat;
color: white;
display: flex;
justify-content: flex-end;
align-items: center;
flex-direction: column;
margin: 30px 10px 0px 10px;
border-radius: 5px;
}

.card-footer {
display: flex;
flex-direction: column;
align-items: center;

p {
font: Ubuntu;
font-size: 22px;
font-weight: 700;
line-height: 25.28px;
font-style: normal;
color: black;
}

a {
font-family: Ubuntu;
font-size: 10px;
font-style: normal;
font-weight: 700;
line-height: 25px;
letter-spacing: 0em;
text-align: left;
color: #011120;
}

i{
color: black;
}
}

.card-footer:hover {
background: rgba(95, 144, 72, 0.69);
}


.info{
height: 100%;
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
margin-top: 40px;
}

.abt-btn-div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
}

.about1 {
    position: relative;
    align-items: center;
    padding: 1rem 5%;
    gap: 3rem;
    background-color: #f8f9fa;
    color: #000000;
}

.about-button {
    background-color: #5F9048;
    color: #ffffff;
    border: none;
    font-family: Ubuntu;
    border-radius: .3rem;
    padding: 0.8rem 10rem;
    cursor: pointer;
}

.about-left-header {
    text-align: center;
    margin-top: 0.8rem;
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: black;
}

.about-text {
    font-weight: normal;
    font-size: 1rem;
    color: black;
}

@media(max-width: 1024px) {
   
}
@media(max-width: 725px) {
   .about1 {
        display: block;
            padding: 3rem 10%;
   }

    .about-text {
    font-size: 1rem;
    }
   .about-button {
    // display: none;
    padding: 0.4rem 5rem;
   }
}
/* End of about styling */


/* Start of card section styling */
.class-group-container {
    position: relative;
    padding-bottom: 2rem;
}

.popular {
    text-align: center;
    margin-top: 0.8rem;
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: black;
}

.cards-container {
    padding: 0 15rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    justify-items: space-between;
}

.card-with-text {
    width: 400px;
}

.single-card-wrapper {
    width: 400px; 
    height: 300px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
    margin-top: 30px;
}

.single-text{
    margin-top: 1.5rem;
}
.single-card-one {
    background: url("../../assets/images/academy2.svg");
    background-repeat: no-repeat;
    // width: 400px;
}
.single-card-two {
    background: url("../../assets/images/marketplace.svg");
    background-repeat: no-repeat;
}
.single-card-three {
    background: url("../../assets/images/growth.svg");
    background-repeat: no-repeat;
}

.card-content {
    width: 100%;
    height: 4vh;
    background-color: #fff; 
    opacity: 0.9; 
    position: absolute; 
    bottom: 0; 
    text-align: center;
    padding-top: 2.5rem;
    padding-bottom: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
    
.card-content-odd {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-text {
    font-family: Ubuntu;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-bottom: 0.4rem;
    color: #000000;
}
.card-more {
    /* background-color: #ff0; */
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 1rem;
    font-family: Ubuntu;
}
.card-more > a {
    text-decoration: none;
    color: #5c5c5c;
}
    
.fa-long-arrow-right {
    margin-left: 0.5rem;
    font-size: 0.75rem;
    color: #5c5c5c;
}

.card-content:hover {
    background-color: rgba(95, 144, 72, 0.69);
}
.card-content:hover .card-text {
    color: #ffffff;
}
.card-content:hover .card-more > a {
    color: #ffffff;
}
.card-content:hover .fa-long-arrow-right {
    color: #ffffff;
}

.popular-class-dot {
    position: absolute;
    bottom: 0rem;
    left: -1rem;
    width: 10rem;
}
@media(max-width: 1536px) {
    .popular {
        font-size: 2rem;
        line-height: 2.25rem;
    }
    .cards-container {
        padding: 0 5rem;
    }

    .card-content{
        height: 14vh;
    }
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 9rem;
    }
}

@media(max-width: 1430px) {
     .cards-container {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    justify-items: center;
    }

    .single-card-wrapper {
    width: 400px; 
    height: 300px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
    margin-top: 20px;
}
.card-with-text {
    width: 400px;
}
.card-content{
height: 14vh;
}

    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 8rem;
    }
}
@media(max-width: 1280px) {
    .cards-container {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
    }

    .single-card-wrapper {
    width: 300px; 
    height: 300px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
    margin-top: 20px;
}
.card-with-text {
    width: 350px;
}
.card-content{
height: 14vh;
}

    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 8rem;
    }
}
@media(max-width: 1024px) {
    .popular {
        font-size: 1.75rem;
        line-height: 2rem;
    }
 
    .cards-container {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
    }

    .single-card-wrapper {
    width: 300px; 
    height: 300px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
    margin-top: 20px;
}
.card-with-text {
    width: 300px;
}
.card-content{
height: 14vh;
}
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 7rem;
    }
}
@media(max-width: 768px) {
    .popular {
        font-size: 1.6rem;
        line-height: 1.8rem;
    }
    .cards-container {
        padding: 0 2rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

.single-card-wrapper {
    width: 300px; 
    margin-top: 10px;
}

.card-with-text {
    width: 300px;
}

.card-content{
height: 10vh;
}
   
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 6rem;
    }
}
@media(max-width:425px) {
    .popular {
        font-size: 1.5rem;
        line-height: 1.8rem;
    }
    .cards-container {
        padding: 0 0.5rem;
    }
     .single-card-wrapper {
    width: 300px; 
    height: 300px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
    margin-top: 10px;
}

.card-content{
height: 25vh;
}
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 5rem;
    }
}
/* End of card section styling */


.get-started{
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
background-color: rgb(30, 30, 30);

h3 {
 color: #ffffff;
 text-align: center;
font-family: Ubuntu;
font-size: 2.5rem;
font-weight: 400;
line-height: 2.75rem;
}

.get-dot {
    position: absolute;
    top: 1rem;
    right: -1rem;
    width: 200px;
}

.fun{
display: flex;
justify-content: space-around;
align-items: center;
width:93%;
// padding-top: 1rem;
// padding-bottom: 2rem;
img {
width: 80%;
}

}


.fir-p {
font-family: Ubuntu;
font-size: 2.5rem;
font-weight: 600;
line-height: 3.7rem;
letter-spacing: 0em;
text-align: left;
color: #5F9048;
}

.sec-p {
font-family: Ubuntu;
font-size: 1.5rem;
font-weight: 400;
line-height: 2.4rem;
letter-spacing: 0em;
text-align: left;
color: #ffffff;
}

button {
border-radius: 10px;
background: #EF6A30;
;
border: none;
color: #ffffff;
padding: 1rem 1rem 1rem 1rem;
margin-bottom: 2rem;
font-size: 1.2rem;
font-family: Ubuntu;
cursor: pointer;
}


@media only screen and (max-width: 768px) {

.recText{
width: 20rem;
}

.big{
font-size: 2rem;
line-height: 4rem !important;
}
.small{
font-size: 30px !important;
}


.dotdotdot {
display: none !important;
}
.get-dot{
display: none !important;
}

.fun {
display: flex;
flex-direction:column;
justify-content: center;

.fir-p {
text-align: center;
font-size: 1.5rem;
line-height: 2.4rem;

}

.sec-p {
text-align: center;
font-size: 1rem;
line-height: 1.7rem;

}

.enrol {
margin-top: .5rem;
margin-bottom: 2rem;
}

}

button {
    text-align: center;
}
}
}


.row {
h2 {
font-weight: 700;
font-style: normal;
font-size: 24px;
line-height: 30px;
}

p{
font-weight: 500;
font-style: normal;
font-size: 24px;
line-height: 30px;
}
}

/* Get start section styling */
.faq {
background-color: #f8f9fa !important;
align-items: center;
justify-content: center;
font-family: Ubuntu;

h3 {
    color: #000000;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 400;
}

#faq-container {
width: 100vw;
padding: 4px 8px 4rem 8px;

.tutor{
    display: flex;
    align-items: center;
    justify-content: center;
    button {
    background-color: #5f9048;
    color: #ffffff;
    text-transform: capitalize;
    padding: 0.8rem 10rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Ubuntu;
    font-weight: bold;
     justify-content: center;
    }
}

}

#asked-question {
width: 50%;
h2 {
font-weight: 500;
font-size: 1rem ;
font-family: Ubuntu;
}
p{
font-weight: 200;
font-style: normal;
font-size: 1rem !important;
font-family: Ubuntu;
}
}

#row-data {
padding: 2px 2px 2px 10px;
}
}
/* End of get started styling */

/* Start of contact us styling */
.interest-wrapper {
    position: relative;
    text-align: center;
    padding: 2rem 10% 4rem 10%;

     h3 {
    font-family: Ubuntu;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    }
}
.interest-header {
    color: #000000;
    padding: 0;
    font-size: 2.25rem;
    font-weight: 400;
    line-height: 2.4rem;
}
.interest-text {
    font-weight: 300;
    font-family: Ubuntu;
    font-size: 1.3rem;
}

.interest-text1 {
    font-weight: 200;
    font-family: Ubuntu;
    font-size: 1rem;
}
.interest-button {
    background-color: #5f9048;
    color: #ffffff;
    text-transform: capitalize;
    padding: 0.8rem 10rem;
    border: none;
    border-radius: 5px;
    font-family: Ubuntu;
    font-weight: bold;
    cursor: pointer;
}
.interest-image {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 10rem;
}
@media(max-width: 791px) {
    .interest-wrapper {
        padding: 1rem 10% 3rem 10%;

        h3 {
        font-size: 25px;
        }

        p {
        font-size: 16px;
        }
    }
    .interest-header {
        font-size: 1.75rem;
        line-height: 2rem;
    }

    .interest-button {
    background-color: #5f9048;
    color: #ffffff;
    text-transform: capitalize;
    padding: 0.4rem 5rem;
    border: none;
    border-radius: 5px;
    font-family: Ubuntu;
    cursor: pointer;
}
    .interest-image {
        width: 6rem;
        bottom: 2rem;
    }
}
/* End of get started styling */

.contact-us{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-family: Ubuntu;
font-size: 1.5rem;
font-weight: 300;
line-height: 30px;
text-align: center;
background-color: #e5e5e5;
padding: 2rem 20% 2rem 20%;
margin-top: -18px;

h3 {
    font-family: Ubuntu;
    font-weight: 400;
    font-size: 2.5rem;
}

p {
font-weight: 100;
font-family: Ubuntu;
font-size: 1.4rem;
}
a {
text-decoration: none;
font-size: 1rem;
font-weight: bold;
color: #5e9047;
}
}

.foundation{
position: relative;
padding: 6rem 20% 6rem 20%;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #f5f5f5;

.foundation-img {
position: absolute;
top: -7rem;
right: 0;
}
.foundation-img1 {
position: absolute;
top: -13rem;
right: 0;
}

.foundation-text {
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width:93%;
font-family: Ubuntu;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 28px;
letter-spacing: 0em;
text-align: center;

h3 {
font-family: Ubuntu;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 41px;
letter-spacing: 0em;
text-align: left;
color: #000000;
}

button {
background-color: #5F9048;
font-family: Ubuntu;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 23px;
letter-spacing: 0em;
text-align: center;
color: #ffffff;
border: none;
border-radius: 10px;
padding: 1rem;
}
}
}

@media screen and (max-width: 768px) {
.foundation {
padding: 1rem 10% 3rem 10%;

}
.foundation-img{
display: none;
}
.foundation-img1{
display: none;
}

.foundation-text  p{
font-size: 20px;
text-align: center;
}

.font-text {
font-size: 25px !important;
}

}

.ulx {
        list-style-type:none;
        display:inline-flex;
    }
    .ulx > a > li {
        padding-left:30px;
        font-weight: 600;
        color: green;
        text-decoration: none;
    }
    button.social {
        height:40px;
        width:40px;
        border-radius: 40px;
        background:white;
        border:0px;
        margin-top: 20px;
        margin-right:5px;
        cursor: pointer;
    }
    .social:hover {
        background:black;
        color:white;
        transition: background .2s ease-in;
    }
    .btx {
        position: absolute;
    right: 20px;
    top: 0;
    margin-top: 5px;
    margin-left: -20px;
    background:#194867;
    color:white;
    border:0px;
    cursor: pointer;
    box-shadow: 0 2px 2px 0 rgba(40,167,69,.14), 0 3px 1px -2px rgba(40,167,69,.12), 0 1px 5px 0 rgba(40,167,69,.2);
    }
    .menux {
        color:white;
        list-style-type: none;
        font-size: 14px;
        /* text-transform: uppercase; */
    }
    .menux > a {
        color:white;
    }
    .main-content {
        padding-bottom: 50px !important;
    }
    .menux > a:hover {
        font-weight: bold;
        transition: font-weight .5s ease-out;
    }
    .btn-xx {
        border-radius: 0px;
        
    }
    .foot {
        background: url("../../assets/images/footer_bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
   }

</style>