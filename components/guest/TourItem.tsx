import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";

interface FecthDataProp {
    loading: boolean,
    tour: any,
    fakeImage: string,
    imageIndex: number
}

const TourSlickItem: React.FC<FecthDataProp> = ({
    loading,
    tour,
    fakeImage,
    imageIndex
}) => {
    return (
        <>
            {
                !loading
                    ?
                    tour !== null
                        ?
                        <div key={tour.tour_id} className="rt-carousel-item drop-shadow-lg p-2 h-full">
                            <Link href={"/search"}>
                                <div className="bg-white rt-carousel-background rounded-lg h-full w-full">
                                    <div className="aspect-[3/2]">
                                        <div className="rt-carousel-image h-full w-full relative">
                                            <Image
                                                src={`/assets/images/canh-dong-quat-gio-360x225.jpg`}
                                                alt="Vercel Logo"
                                                className="photo"
                                                layout="fill"
                                            />
                                        </div>
                                    </div>

                                    <div className="rt-carourel-item-content p-4 flex flex-col space-y-2">
                                        <div className="rt-carousel-item-title text-base font-bold lg:text-lg md:text-lg">
                                            <span>
                                                {tour.market_name + '-' + tour.tour_name}
                                            </span>
                                        </div>
                                        <div className="">
                                            <div className="rt-carousel-item-date font-bold text-xs">
                                                <span><i className="fas fa-clock text-sgt-primary-dark"></i> {tour.day_number} ngày {tour.night_number} đêm</span>
                                            </div>
                                            <div className="rt-carousel-item-price text-red-600 text-lg font-medium">
                                                <span>VND {formatPrice(`${tour.price_adl_off}`)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        :

                        <div key={imageIndex} className="rt-carousel-item drop-shadow-lg p-2 h-full">
                            <Link href={"/search"}>
                                <div className="bg-white rt-carousel-background rounded-lg h-full w-full">
                                    <div className="aspect-[3/2]">
                                        <div className="rt-carousel-image relative w-full h-full">
                                            <Image
                                                src={`/assets/images/${fakeImage}`}
                                                alt="Vercel Logo"
                                                className="photo"
                                                layout="fill"
                                            />
                                        </div>
                                    </div>

                                    <div className="rt-carourel-item-content p-4 flex flex-col space-y-2">
                                        <div className="rt-carousel-item-title text-base font-bold lg:text-lg md:text-lg">
                                            <span>
                                                Tour for fun, travel around the world! Contact now for futher infomation
                                            </span>
                                        </div>
                                        <div className="">
                                            <div className="rt-carousel-item-date font-bold text-xs pt-1">
                                                <span><i className="fas fa-clock text-sgt-primary-dark"></i> 5 ngày 4 đêm</span>
                                            </div>
                                            <div className="rt-carousel-item-price text-red-600 text-lg font-medium">
                                                <span>VND {formatPrice("1999999")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    :
                    <div key={imageIndex} className="rt-carousel-item drop-shadow-lg p-2 h-full">
                        <Link href={"/search"}>
                            <div className="bg-white rt-carousel-background rounded-lg h-full w-full">
                                <div className="aspect-[3/2]">
                                    <div className="rt-carousel-image relative w-full h-full">
                                        <Image
                                            src={`/assets/images/image-holder.jpg`}
                                            alt="Vercel Logo"
                                            className="photo"
                                            layout="fill"
                                        />
                                    </div>
                                </div>

                                <div className="rt-carourel-item-content rt-carousel_item_holder p-4 flex flex-col space-y-2">
                                    <div className="rt-carousel-item-title text-base font-bold lg:text-lg md:text-lg text-gray-400">
                                        <span>
                                            Loading...
                                        </span>
                                    </div>
                                    <div className="">
                                        <div className="rt-carousel-item-date font-bold text-xs pt-1 text-gray-400">
                                            <span>Loading...</span>
                                        </div>
                                        <div className="rt-carousel-item-price text-lg font-medium text-gray-400">
                                            <span>Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
            }
        </>
    );
}

export default TourSlickItem;