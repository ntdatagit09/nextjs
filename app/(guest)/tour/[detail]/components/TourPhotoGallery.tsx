'use client';
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import SlickCarouselArrows from "../../../../../components/guest/SlickCarouselArrows";

const TourPhotoGallery = (props: any) => {
    const { origin, thumbnail } = props;
    // const resultList = fakeTourList;
    const [nav1, setNav1] = useState<Slider | undefined>(undefined);
    const [nav2, setNav2] = useState<Slider | undefined>(undefined);

    let sliderRef1 = useRef<Slider | null>(null);
    let sliderRef2 = useRef<Slider | null>(null);

    const settingsNav1 = {
        waitForAnimate: false,
        fade: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        arrows: false,
        asNavFor: nav2
    };

    const settingsNav2 = {
        variableWidth: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        centerMode: true,
        speed: 1000,
        arrows: false,
        asNavFor: nav1
    }

    useEffect(() => {
        setNav1(sliderRef1.current as Slider);
        setNav2(sliderRef2.current as Slider);
    }, []);

    const next = () => {
        sliderRef1.current?.slickNext();
    };
    const previous = () => {
        sliderRef1.current?.slickPrev();
    };

    return (
        <>
            <div className='detail_content_photo_gallery pb-4'>
                <div className="slider-container">
                    <div className="relative">
                        <Slider {...settingsNav1} ref={sliderRef1}>
                            {
                                origin.map((item: string) =>
                                    <div key={item} className='detail_content_big_thumbnail rounded-lg shadow mb-1.5 overflow-hidden aspect-[2/1]'>
                                        <div className='relative w-full h-full'>
                                            <Image
                                                src={`${item}`}
                                                // src={`/assets/images/${item}`}
                                                alt="canh-dong-quat-gio"
                                                layout='fill'
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </Slider>
                        <SlickCarouselArrows
                            slickNext={next}
                            slickPrevious={previous}
                            slickPreviousClass=''
                            slickNextClass=''
                        />
                    </div>
                    <div className="pt-0">
                        <Slider {...settingsNav2} ref={sliderRef2}>
                            {
                                thumbnail.map((item: string) =>
                                    <div key={item} style={{ width: 86 }} className='detail_content_small_thumbnail pb-2 px-1'>
                                        <div className='rounded-lg shadow overflow-hidden aspect-square relative'>
                                            <Image
                                                src={`${item}`}
                                                // src={`/assets/images/${item}`}
                                                alt="canh-dong-quat-gio"
                                                layout='fill'
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TourPhotoGallery;