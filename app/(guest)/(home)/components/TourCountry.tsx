import { INationSummary } from "@/interfaces/nation";
import useFetch from "@/services/api/fetchApi";
import { fakeTourList } from "@/utils/fakeData";
import { transferStringToSlug } from "@/utils/formatString";
import Link from "next/link";

interface ApiDataProps {
    nations: INationSummary[] | null,
};

const TourCountry: React.FC<ApiDataProps> = async (props) => {
    const tourList = fakeTourList;
    const nations: INationSummary[] = props.nations || [];
    const tourString: string = 'Tours';
    return (
        <>
            <section className='tour_country w-full'>
                <div className='pb-8'>
                    {/* Familiar insite*/}
                    < div className='rt_tour_familiar mt-0 space-y-4'>
                        <div className='rt_tour_header_title'>
                            <h1 className="font-bold">Địa điểm du lịch nước ngoài</h1>
                        </div>
                        <div className='rt_tour_familiar_list grid grid-flow-col grid-cols-12 grid-rows-4 gap-4'>
                            {
                                nations.map((item, index) => {
                                    const searchLink = `/search?nation=${transferStringToSlug(item.nation_name)}`
                                    if (index < nations.length - 1) {
                                        return <a href={searchLink} key={index} className='rt_location_tour_custom rt_location_tour_customr2c4 overflow-hidden cursor-pointer relative'>
                                            <div className="w-full h-full rt_tour_left_background"
                                                style={{ backgroundImage: `url(/assets/images/${tourList[index]})` }}></div>
                                            <div className="flex flex-col absolute left-3.5 bottom-3 z-10">
                                                <div className="font-bold text-2xl text-white">{item.nation_name}</div>
                                                <div className="text-lg text-white">{item.total_tour} {tourString}</div>
                                            </div>
                                        </a>
                                    }
                                })
                            }
                            <a href={`/search?nation=${transferStringToSlug(nations[4]?.nation_name)}`} className='rt_location_tour_custom rt_location_tour_customr4c4 overflow-hidden cursor-pointer relative' >
                                <div className="w-full h-full rt_tour_left_background" style={{ backgroundImage: 'url("/assets/images/van-ly-truong-thanh-bia-360x480.jpg")' }}></div>
                                <div className="flex flex-col absolute left-3.5 bottom-3 z-10">
                                    <div className="font-bold text-2xl text-white">{nations[4]?.nation_name}</div>
                                    <div className="text-lg text-white">{nations[4]?.total_tour} {tourString}</div>
                                </div>
                            </a>
                        </div>
                    </div >
                </div>
            </section >
        </>
    );
}

export default TourCountry;