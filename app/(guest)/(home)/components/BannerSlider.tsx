'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchBarVertical from '@/components/guest/SearchBarVertical';
const BannerSlider = () => {
    const settings = {
        fade: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const bannerSliderList = [
        'https://cdn1.ivivu.com/images/2024/03/27/14/cr_riviera-t_x2zgum_.webp',
        'https://cdn2.ivivu.com/2024/04/12/17/tour-20240412-2c.png'
    ]
    let keyByTime = new Date().getTime();
    return (
        <>
            <div className='pt-3 w-full fex flex-row relative'>
                <div className="slider-container" style={{ height: 500 }}>
                    <Slider key={keyByTime + 10} {...settings}>
                        {
                            bannerSliderList.map(item =>
                                <>
                                    <div key={item} style={{ height: 500 }}>
                                        <div className='relative w-full h-full bg-no-repeat'
                                            style={{ backgroundImage: `url(${item})` }}>
                                        </div>
                                    </div >
                                </>
                            )
                        }
                    </Slider>
                </div>
                <div id="searchBarVerticalComponent" className='m-auto width-primary absolute inset-0 flex flex-row'>
                    <div className='w-full flex flex-row items-center m-0'>
                        <div className='w-full grid grid-cols-12'>
                            <div className='col-span-6 bg-black bg-opacity-50 rounded-lg'>
                                <div className='p-4'>
                                    <h1 className='text-sgt-primary-default text-2xl font-bold'>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
                                </div>
                                <SearchBarVertical></SearchBarVertical>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerSlider