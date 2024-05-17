'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "@/styles/slick-arrows-component.scss";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const SlickCarouselArrows = (props: any) => {
    const { slickPrevious, slickNext, slickNextClass, slickPreviousClass } = props;
    return (
        <div style={{ textAlign: "center" }} className="mx-4">
            <button className={`slick-arrow slick-arrow-previous ${slickPreviousClass}`}
                onClick={slickPrevious}>
                <FontAwesomeIcon className="w-full h-full" icon={faChevronLeft}></FontAwesomeIcon>
            </button>
            <button className={`slick-arrow slick-arrow-next ${slickNextClass}`} onClick={slickNext}>
                <FontAwesomeIcon className="w-full h-full" icon={faChevronRight}></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default SlickCarouselArrows