<template>
<div class="mainCont">

     <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
     <div class="container" >
         <a class="navbar-brand" href="" onclick="window.location.reload();return false">
                <img class="logo" width="150" src="../../assets/images/logo-white.png">
         </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto" style="width: 90%; justify-content: space-between">
                <a class="nav-item nav-link override-nav" href="#">HOME</a>
                <a class="nav-item nav-link override-nav" href="#popular">POPULAR CLASS GROUPS</a>
                <a class="nav-item nav-link override-nav" href="#get-tutor">GET A TUTOR</a>
                <a class="nav-item nav-link override-nav" href="#class-reviews">CLASS REVIEWS</a>
                <a class="nav-item nav-link override-nav" href="#faq-section">FAQ</a>
            </div>
        </div>
        </div>
    </nav>

        <div class="header">
        <div class="header-left">
            <img src="../../assets/images/Rectangle.png" alt=""/>
            <img class="white-wave" src="../../assets/images/ghsg1.png" alt=""/>
            <div class="recText">
                <p  class="big">Get 100% in your Exam Prep</p>
                <p class="small">Prepclass academy helps learners prepare for standardised exams like GMAT, GRE. </p>
                <!-- <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><img src="../../assets/images/logo.png" alt="logo"></span>
                </div> -->
                <!-- <input type="text" class="form-control" placeholder="Tell us what you want to learn today" aria-label="Learn" aria-describedby="basic-addon1">
                    <span class="input-group-text" id="basic-addon1" style="background: #F99746;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                </input> -->
            <!-- </div> -->
            </div>
        </div>
        <div class="header-right">
            <img class="headphone" src="../../assets/images/Academy1.svg" alt=""/>
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

             <!-- Popular Class Group -->
        <a id="popular">
        <div class="class-group-container">
            <h2 class="font-weight-400 font-size: 2.5rem line-height:1.2 text-center mb-2 pt-5 pb-3">Popular Class Groups</h2>
            <div class="cards-container">
                <!-- Single card -->
                <div class="single-card-wrapper single-card-one">     
                    <img class="ielts-img" src="../../assets/images/ielts_logo.png" alt="ielts">                
                    <div class="card-content">
                        <p class="card-text">IELTS</p>
                        <p class="card-more"><a href=" https://prepclass.com.ng/ielts">Learn More</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
                <!-- Single card -->
                <div class="single-card-wrapper single-card-two">   
                     <img class="ielts-img" src="../../assets/images/gmat_logo.png" alt="GMAT">                
                    <div class="card-content">
                        <p class="card-text">GMAT</p>
                        <p class="card-more"><a href=" https://prepclass.com.ng/gmat">Learn More</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
                <!-- Single card -->
                <div class="single-card-wrapper single-card-three">
                    <img class="ielts-img" src="../../assets/images/gre.png" alt="GRE">                
                    <div class="card-content">
                        <p class="card-text">GRE</p>
                        <p class="card-more"><a href=" https://prepclass.com.ng/gre">Learn More</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
                <!-- Single card -->
                <div class="single-card-wrapper single-card-four">  
                     <img class="ielts-img" src="../../assets/images/sat.png" alt="SAT">                
                    <div class="card-content">
                        <p class="card-text">SAT</p>
                        <p class="card-more"><a href=" https://prepclass.com.ng/sat">Learn More</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
                <!-- Single card -->
                <div class="single-card-wrapper single-card-five">         
                    <img class="ielts-img" src="../../assets/images/toefl.png" alt="TOEFL">                
                    <div class="card-content">
                        <p class="card-text">TOEFL</p>
                        <p class="card-more"><a href=" https://prepclass.com.ng/toefl">Learn More</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
            </div>
            <img class="popular-class-dot" src="../../assets/images/dot1.png" />
        </div>
        </a>
            
            <!-- Get Started Section -->
            <a id="get-tutor">
            <section class="bg-light">
                <div class="container bg-light">
                    <div class="container py-5">
                        <div class="text-center mb-5">
                            <h1 class="section-title" style="font-weight: 400; font-size: 2.5rem">
                                Preparing for your exam is easier than you think
                            </h1>
                        </div>
                        <div class="green-line mb-4"></div>
                        <div class="row">
                            <div class="col-md-4 position-relative px-3 px-md-5 mt-4 mt-md-0">
                                <div class="d-flex justify-content-center">
                                    <div class="square">
                                        <h3 class="m-auto">1</h3>
                                    </div>
                                </div>
                                    <h5 class="my-3 font-weight-300 text-center black">Walk into any of our centers </h5>
                                    <p class="text-center">Visit any of our learning centers in Lekki, Yaba or Maryland.</p>
                                    <img data-cfsrc="https://prepclass.com.ng/img/arrow.png" class="mx-5 d-none d-md-block" data-cfstyle="max-width: 50px; position: absolute; top: 30px;
                                     right: -70px;" style="max-width: 50px; position: absolute; top: 30px; right: -70px;" src="../../assets/images/arrow.png">
                            </div>

                            <div class="col-md-4 position-relative px-3 px-md-5 align-items-center flex-column my-4 my-md-0">
                                <div class="d-flex justify-content-center">
                                    <div class="square">
                                        <h3 class="m-auto">2</h3>
                                    </div>
                                </div>
                                    <h5 class="my-3 font-weight-300 text-center black">Write your diagnostic.</h5>
                                    <p class="text-center">Each prospective exam candidate writes a diagnostic test to determine his areas of weakness and strength.</p>
                                    <img data-cfsrc="https://prepclass.com.ng/img/arrow.png" class="mx-5 d-none d-md-block" data-cfstyle="max-width: 50px; position: absolute; top: 30px;
                                     right: -70px;" style="max-width: 50px; position: absolute; top: 30px; right: -70px;" src="../../assets/images/arrow.png">
                            </div>

                            <div class="col-md-4 position-relative px-3 px-md-5 align-items-center flex-column my-4 my-md-0">
                                <div class="d-flex justify-content-center">
                                    <div class=" square">
                                        <h3 class="m-auto">3</h3>
                                    </div>
                                </div>
                                 <h5 class="my-3 font-weight-300 text-center black">Start receiving lectures</h5>
                                <p class="text-center">Using the outcome of the diagnostic test, a lesson plan is tailored to meet the learners needs and achieve desired test score.</p>
                            </div>
                        </div>
                        </div>
                    </div>
            </section>
            </a>

            <a id="class-reviews">
            <div class="reviews">
                <h3 class="font-weight-400 font-size: 2.5rem line-height:1.2 text-center mb-2 pt-5 pb-3">Some of our Class Reviews From Google</h3>
                <div class="dot2">
                     <img class="dotdot" src="../../assets/images/dotdot.png" />
                </div>

                <div class="comments-container">
                    <div class="container" id="review-grid">
                        <div class="single-review">
                        <img class="single-review-image" src="../../assets/images/review1.png" alt="review" />
                        </div>
                        <div class="single-review">
                        <img class="single-review-image" src="../../assets/images/review2.png" alt="review" />
                        </div>
                        <div class="single-review">
                        <img class="single-review-image" src="../../assets/images/review3.png" alt="review" />
                        </div>
                    </div>
                    <div class="foundation-img">
                    <img class="dotdotdot" src="../../assets/images/ggd6.png" alt="">
                </div>
                <div class="foundation-img1">
                    <img src="../../assets/images/Ellipse.png" alt="">
                </div>
                </div>
                    <div class="more"> <button type="submit" class="more-reviews"><a style="color: #ffffff; text-decoration:none" href="https://www.google.com/search?q=prepclass+reviews&oq=prepclass+revi&aqs=chrome.0.69i59j69i57j69i59j69i61j69i60j69i61.6563j0j4&sourceid=chrome&ie=UTF-8#lrd=0x103b8c884b4be38d:0x9a56b9d179680c3,1">see more reviews</a></button></div>
            </div>
            </a>

        <!-- FAQ -->
        <a id="faq-section">
        <div class="faq">
             <h3 class="font-weight-400 font-size: 2.5rem line-height:1.2 text-center mb-2 pt-5 pb-3">Often asked questions</h3>

            <div id="faq-container">
                <div class="container">
                <div class="row justify-content-between" id="row-data">
                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                        <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong>What is the address of Prepclass academy centers ?</h6>
                        <h4><strong style="color:#5e9047; font-weight:bold">A</strong>: We have 3 centers in different parts of Lagos.</h4>

                        <p>1. Lekki Address - No. 71A Prince Ademola Eletu Way, Osapa London Estate, Along carnal west road( circle mall /Shoprite road)Jakande Bus Stop Lekki lagos<br>
                                2. Ikeja - Eagles Hub - No 21 Olatunbosun street,off abiola close,shonibare estate, Maryland.
                                3. Yaba - 13 Hughes Avenue, Alagomeji, Yaba.
                        </p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                        <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong> What is the cost of learning at a Prepclass center?</h6>
                        <h4><strong style="color:#5e9047; font-weight:bold">A</strong>: We offer group online classes.</h4>
                        <p class="text-center text-md-left">Exam preparation costs vary from center to center. On average Please contact each center IElTS Training cost N50k, SAT- N50k , Gre/GMaths (verbal and Quant)- 100k, Checkpoint- N2k per hour, IGSCE- 2.5kper hour, Common Entrance(Math/English)- 1.5k per hour. Loyola Jesuit Entrance Training- 2.5K per hour. </p>
                        <p class="text-center text-md-left">Please contact the center manager to find out the cost of your preferred center. </p>
                        <p class="text-center text-md-left">Maryland Centre:  Jane - <a href="#"  style="color: #5e9047; font-weight:bold">08091088879</a></p>
                        <p class="text-center text-md-left">Lekki Centre:  Nkechi - <a href="#"  style="color: #5e9047; font-weight:bold">09056999392</a></p>
                        <p class="text-center text-md-left">Yaba Centre:  Lanre - <a href="#" style="color: #5e9047; font-weight:bold">09023247268</a></p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                         <h6 class="font-weight-bold text-black text-center text-md-left"><strong>Q:</strong>What are the benefits of learning at a Prepclass center?</h6>
                        <p class="text-center text-md-left"><strong style="color:#5e9047; font-weight:bold">A</strong>:  Prepclass center promises an exciting time learning in groups in a comfortable state of the art serene classroom with experience and qualified tutors.</p>
                    </div>

                    <div class="col-12 col-md-5 mb-3" id="asked-question">
                         <h6 class="font-weight-bold text-black text-center text-md-left"><strong >Q:</strong> What is the benefit and cost of writing an exam diagnostic at a Prepclass center?</h6>
                        <p class="text-center text-md-left"><strong style="color:#5e9047; font-weight:bold">A</strong>:Diagnostic tests are a good way to test candidates' exam readiness. Learners use the outcome of the exam diagnostic to identify their areas of strength and weakness. Diagnostics tests done by Prepclass are free if administered online while we charge N5,000 for physical tests. 
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </a>
    
        <div class="contact-us">
            <h3 class="font-weight-400 font-size: 2.5rem line-height:1.2 text-center mb-2 pt-5 pb-3">Do you have any Question?</h3>
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
</script>
   
<style lang="scss" scoped>

.navbar {
  background-color: rgba(0, 0, 0, 0) !important;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-function: ease-in-out;
}

.navbar-dark {
  background-color: rgba(256, 256, 256, 256) !important;
  .navbar-brand img{
        content: url('../../assets/images/small-logo.png');
  }

.navbar-toggler {
    background-color:#000000;
}
}

nav {
    height: 8vh;
}

.override-nav {
color: #000000 !important;
font-weight: bold;
font-size: 10pt;
opacity: 1 !important;
font-family: Ubuntu;

}


.mainCont{
max-width: 100vw;
overflow-x: hidden;
font-family: Ubuntu;
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
color: white;
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
width:70%;

.white-wave {
position: absolute;
left: 0;
top: 55%;
}
}

.header-right {

width: 30%;
.headphone {
position: absolute;
top: -2rem;
right: -12rem;
width: 90%;
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
    right: -3rem;
    mix-blend-mode: difference;
    transform: rotate(180deg);
    z-index: 99;
}
}
}
}

@media only screen and (max-width: 768px){
    .recText{
width: 20rem;
top: 10rem;

 .big{
        font-size: 30px !important;
        line-height: 2rem !important;
        top: -2rem;
        right: -12rem;
        // display:none;
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
        width: 30%;
.headphone {
    position: absolute;
    top: 4rem;
    right: -8rem;
    width: 70%;
        // display:  none;
    }
}

.right-curve {
    display: none;
}
.left-curve {
    display: none;
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
        line-height: 2rem !important;
        // display:none;
        }

    .small{
    font-size: 30px !important;
    color: #ffffff;
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


.ggd {
position: absolute;
bottom: 12rem;
left: -13.5rem;
}
.ghsg {
position: absolute;
bottom: -3rem;
right: -5rem;
}

.card-title {
font-family: Ubuntu ;
 font-weight: bold;
 font-size: 2.3rem;
 color: #ffffff;
 margin-bottom: 2px;
}

.card-text {
font-family: Ubuntu ;
 font-weight: 400;
 font-size: 1.5rem;
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
    padding-top: 40px;
}

.reviews {
position: relative;
padding-top: 2rem;
padding-bottom: 2rem;

}

.dotdot {
position: absolute;
top: -3rem;
left: -9rem;
width: 18rem;
}

.comments {
width: 85%;
display: grid;
grid-template-columns: repeat(3, 1fr); 
margin: 0 auto 0 auto;
}

.foundation-img {
position: absolute;
bottom: -9rem;
right: -3rem;
}
.foundation-img1 {
position: absolute;
bottom: -13rem;
right: -3rem;
}

#asked-question {

h2 {
font-size: 1.3rem;
font-weight: 500;
font-family: Ubuntu;
}
 h4 {
font-size: 1.1rem;
font-weight: 400;
font-family: Ubuntu;

}
p {
font-size: 1rem;
font-family: Ubuntu;
font-weight: 300;

}
}

@media only screen and (max-width: 600px) {

.comments {
display: block;
margin-right: 4rem;
}
.circle {
display: none;
}

.circle-image {
display: none;
}

.wave-img {
display: none;
}

.visit {
width: 80%;
}

.avatar {
background-color: red;
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

.cont{
width: 100%;
display: flex;
flex-direction: column;
aligh-items: center;
}

#cont{
width: 100%;
display: flex;
flex-direction: column;
aligh-items: center;
}

#asked-question {

h2 {
font-size: 1rem !important;
font-weight: bold !important;
font-family: Ubuntu;
}
h4 {
font-size:18px;
font-weight:bold;
font-family: Ubuntu;
}
p{
font-size:18px;
font-family: Ubuntu;
}
}

}

.form{
display: flex;
}

.trust-us {
position: relative;
height: 4rem;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #f5f5f5;

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
    top: 2em;
    right: -3rem;
    width: 180px;
    height: 50vh;
}

}

.container {
position: relative;
}

.container-fluid {
display: flex;
justify-content: space-between;
width: 50%;
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

.cont{
height: 100%;
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
background-color: #f5f5f5;
}
.info{
height: 100%;
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
margin-top: 40px;
}

/* Start of card section styling */
.class-group-container {
    position: relative;
}

.popular {
    text-align: center;
    margin-top: 0.8rem;
    font: sans-serif;
    font-size: 2.5rem;
    line-height: 2.5rem;
    font-style: normal;
    color: black;
}

.cards-container {
    padding: 0 25rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
}

.single-card-wrapper {
    width: 300px; 
    height: 275px; 
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative; 
    border-radius: 0.5rem;
}
.single-card-one, .single-card-two, .single-card-three, .single-card-five{
    padding-top: 5rem;
}

.single-card-six {
    // background: url("../../assets/images/popular6.png");
}

.card-content {
    width: 100%;
    background-color: #fff; 
    opacity: 0.9; 
    position: absolute; 
    bottom: 0; 
    text-align: center;
    padding-top: 0.5rem;
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
    font-family: Ubuntu ;
    font-weight: 400;
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
    color: #5c5c5c;
}
.card-more {
    /* background-color: #ff0; */
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0;
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
        padding: 0 10rem;
    }
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 9rem;
    }
}
@media(max-width: 1280px) {
    .cards-container {
        padding: 0 7rem;
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
        padding: 0 5rem;
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
    }
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 6rem;
    }
}
@media(max-width: 400px) {
    .popular {
        font-size: 1.5rem;
        line-height: 1.8rem;
    }
    .cards-container {
        padding: 0 0.5rem;
    }
    .popular-class-dot {
        bottom: 0rem;
        left: -1rem;
        width: 5rem;
    }
}
/* End of card section styling */


/* Get start section styling */
.square {
    display: flex;
    width:75px;
    height: 75px;
    position: relative;
    border-width: 2px;
    border-style: solid;
    border-color:rgb(95, 144, 72 );
    border-image: initial;
    border-radius: 50%;
    color: rgb(95, 144, 72 );
    font-family: Ubuntu !important;
}

.more{
    display: flex;
    align-items: center;
    justify-content: center;
    button {
    background-color: #5f9048;
    color: #ffffff;
    text-transform: capitalize;
    padding: 0.8rem 5rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-family: Ubuntu;
    font-weight: bold;
     justify-content: center;
    }
}

/* End of avatar in circle styling */


    
       
/* End of get started styling */

.review {
display: flex;
justify-content: space-between;
width: 90%;
}

.review-section {
justify-content: center;
}


.faq {
background-color: #f8f9fa !important;
align-items: center;
justify-content: center;
font-size: Ubuntu;

#faq-container {
width: 100vw;
padding: 2px 8px 2rem 8px;

}


#asked-question {
width: 50%;
h2 {
font-weight: 700;
font-size: 1rem !important;
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

.tutor{
    justify-content: center;
}


.contact-us{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-family: Ubuntu;
font-size: 2.5rem;
font-weight: 700;
line-height: 30px;
text-align: center;
background-color: #f2f2f2;
padding-bottom: 2rem;

p {
font-weight: 100;
font-family: Ubuntu;
font-size: 1.2rem;
}
a {
text-decoration: none;
font-size: 1rem;
font-weight: bold;
color: #5e9047;
}
}

.avatar{
height: 50px;
width: 50px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
 background: #5F9048;

}

.fir{
display: flex;
color: white;
align-items: center;
}

.getStarted{
display: flex;
width: 90%;
justify-content: space-around;
}

.getImg{
display: flex;
align-items: center;
}

.visit{
display: flex;
height: 70vh;
flex-direction: column;
}

.det{
margin-left: 20px;
font-family: Ubuntu;
font-size: 1.5rem !important;
font-weight: 400;
letter-spacing: 0em;
}

.stroke{
height: 130px;
width: 6px;
border: 1px solid black;
 background: #C4C4C4;
 margin-left: 22px;
;
}


.dotdot1{
position:absolute;
top: 155rem;
left: 25rem;
}

.dot1{
position:absolute;
top: 185rem;
left: 80rem;
}

#review-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 99;
}

.single-review-image {
    width: 100%;
}

@media(max-width: 1024px) {
    #review-grid {
        display: block;
    }
    .dotdot {
        display: none;
    }
    .foundation-img {
        display: none;
    }
    .foundation-img1 {
        display: none;
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