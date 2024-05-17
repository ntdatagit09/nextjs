'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ITourSummary } from "@/interfaces/tour";
import { fakeListTour } from "@/utils/fakeTours";
import TourItemVertical from "@/components/guest/TourItemVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SlickCarouselArrows from "../../../../components/guest/SlickCarouselArrows";
import TourItemSkeletonVertical from "@/components/guest/TourItemSkeletonVertical";
import { ITopicSummary } from "@/interfaces/topic";

interface FecthDataProp {
    fetchTopicTour: any,
    topic: ITopicSummary
}

const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {

                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 460,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
    // prevArrow: <SlickArrowLeft currentSlide={undefined} slideCount={undefined} />,
    // nextArrow: <SlickArrowRight currentSlide={undefined} slideCount={undefined} />,
};

const SlickTour: React.FC<FecthDataProp> = ({ topic, fetchTopicTour }) => {

    const [tours, setTours] = useState<ITourSummary[] | null>([]);
    let sliderRef = useRef<Slider | null>(null);

    let keyByTime = Math.floor(Math.random() * 10000);
    const skeletonTourData: number[] = [1, 2, 3, 4];
    const next = () => {
        sliderRef.current?.slickNext();
    };

    const previous = () => {
        sliderRef.current?.slickPrev();
    };


    useEffect(() => {
        const fectTour = async () => {
            try {
                const data: ITourSummary[] | null = fetchTopicTour;
                setTimeout(() => {
                    setTours(data)
                });
            } catch (error) { }
        };

        fectTour();
    }, [fetchTopicTour]);

    return (
        <>
            <div className="rt-tour-header flex justify-between">
                <div className="rt-tour-header-title">
                    <h1 className="font-bold">{topic.name}</h1>
                </div>
                {
                    <>
                        <a href={`/search?topic_slug=${topic.slug}`} className="rt_tour_load_more">Tất cả&nbsp;
                            <FontAwesomeIcon className="ml-1" size="sm" icon={faArrowRight}></FontAwesomeIcon>
                        </a>
                    </>

                }
            </div>
            <div className="py-4">
                {
                    tours?.length == 0 ?
                        <>
                            <div className='grid grid-cols-12 gap-4'>
                                {
                                    skeletonTourData.map((sk, index) =>
                                        <>
                                            <TourItemSkeletonVertical key={index + 10} isShowBtn={false} col="col-span-3"></TourItemSkeletonVertical>
                                        </>
                                    )
                                }
                            </div>
                        </> :
                        tours && tours?.length > 5 ? <div className="relative">
                            <Slider key={keyByTime} className="rt-carousel-block w-full" {...settings} ref={sliderRef}>
                                {
                                    tours?.map((tour, index) =>
                                        <>
                                            <TourItemVertical key={keyByTime} item={tour} isShowBtn={false}></TourItemVertical>
                                        </>
                                    )
                                }
                            </Slider>
                            <SlickCarouselArrows
                                slickNext={next}
                                slickPrevious={previous}
                                slickPreviousClass='!-left-3.5 !shadow-lg !bg-opacity-65 hover:!bg-opacity-100'
                                slickNextClass='!-right-3.5 !shadow-lg !bg-opacity-65 hover:!bg-opacity-100'
                            />
                        </div> :
                            <>
                                <div className='grid grid-cols-12 gap-4'> {
                                    tours?.map((tour, index) =>
                                        <TourItemVertical key={keyByTime} item={tour} isShowBtn={false} col="col-span-3"></TourItemVertical>
                                    )
                                }
                                </div>
                            </>
                }
            </div >
        </>
    );
}

export default SlickTour;