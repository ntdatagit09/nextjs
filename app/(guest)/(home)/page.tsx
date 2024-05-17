import { ReactElement } from "react";
import { Metadata } from "next";
import TourByTopic from "./components/TourByTopic";
import TourCountry from "./components/TourCountry";
import TourViewed from "@/components/guest/TourViewed";
import BannerSlider from "./components/BannerSlider";
import '@/styles/home.scss';
import StoreProvider from "@/store/StoreProvider";
import fetchApi from '@/services/api/fetchApi';
import Head from "next/head";

export const metadata: Metadata = {
    title: "Đặt tour du lịch trực tuyến tại SaigonTimes Travel",
    description: "Đặt tour du lịch trực tuyến tại SaigonTimes Travel",
};

const viewedList = [
    'bali-360x225.jpg',
    'dao-nam-du-360x225.jpg',
    'canh-dong-quat-gio-360x225.jpg',
    'singapore-360x225.jpg',
    'bali-360x225.jpg',
    'dao-nam-du-360x225.jpg',
    'canh-dong-quat-gio-360x225.jpg',
    'singapore-360x225.jpg',
];

const Home = async () => {
    const topicsIsDisplay = await fetchApi(
        {
            urlPath: `topic/topic-is-display`,
        }
    )
    const toursByNation = await fetchApi(
        {
            urlPath: `nation?sort_by=total_tour:desc&method=paginate&limit=5`,
        }
    )
    return (
        <>
            {/* <Head>
                <link rel='icon' href='/favicon.ico' />
            </Head> */}
            <StoreProvider>
                <BannerSlider></BannerSlider>
                <section id="home_page" className="bg-sgt-bg-primary pt-6">
                    <div className='flex flex-col m-auto width-primary'>
                        <div className="my-4">
                            <TourByTopic topics={topicsIsDisplay} />
                            {/* <TourAbroad /> */}
                            <TourCountry nations={toursByNation} />
                            <TourViewed data={viewedList} />
                        </div>
                    </div>
                </section>
            </StoreProvider>
        </>
    );
}

export default Home