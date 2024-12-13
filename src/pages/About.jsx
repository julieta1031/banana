import React, { useRef } from 'react';
import './About.css'
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import slide1 from '../images/hayastan.jpg';
import slide2 from '../images/portugal.jpg';
import slide3 from '../images/germania.jpg';
import slide4 from '../images/argetina.jpg';
import ReactPlayer from 'react-player';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
    const swiperRef = useRef(null);

    const handleVideo = () => {
        console.log('Video clicked');
    };

    return (

        <div className="min-h-[75vh]  mx-4">

            {/* CountUp */}
            <div className="countup-container text-center my-4">
                <h1>Football news</h1>
                <CountUp

                    start={-875.039}
                    end={141527.012}
                    duration={9.75}
                    separator=","
                    decimals={3}
                />

            </div>

            <div className={'box'}>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    ref={swiperRef}
                    slidesPerView={1}
                    onSlideChange={() => console.log('Slide changed')}
                    onSwiper={(swiper) => console.log('Swiper instance:', swiper)}
                >
                    <SwiperSlide onClick={handleVideo}>
                        <img className=" " src={slide1} alt="Slide 1"/>
                    </SwiperSlide>
                    <SwiperSlide onClick={handleVideo}>
                        <img className="" src={slide2} alt="Slide 2"/>
                    </SwiperSlide>
                    <SwiperSlide onClick={handleVideo}>
                        <img className=" " src={slide3} alt="Slide 3"/>
                    </SwiperSlide>
                    <SwiperSlide onClick={handleVideo}>
                        <img className=" " src={slide4} alt="Slide 4"/>
                    </SwiperSlide>

                </Swiper>
            </div>
            <SwiperSlide onClick={handleVideo}>
                <ReactPlayer
                    className=""
                    controls
                    url="https://www.youtube.com/shorts/5AQdaBZQwdw"
                />
            </SwiperSlide>
        </div>
    );
};

export default About;
