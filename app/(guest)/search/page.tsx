
import React, { Suspense } from 'react'
import SearchSideBar from './components/SearchSideBar';
import SearchArrangeNavBar from './components/SearchArrangeNavBar';
import SearchResult from './components/SearchResult';
import SearchBar from '@/components/guest/SearchBar';
import TourViewed from '@/components/guest/TourViewed';
import "@/styles/search.scss";
import StoreProvider from '@/store/StoreProvider';
import { Metadata, ResolvingMetadata } from 'next';
import fetchApi from '@/services/api/fetchApi';

type Props = {
  params: {
    detail: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    nation,
    topic_slug,
    filter_search,
    flight_date

  } = searchParams;
  let urlPath = '';
  let response: any = '';
  let dateFrom = flight_date ? `từ ngày ${flight_date}` : '';
  let title = `Đặt tour du lịch trực tuyến tại SaigonTimes Travel ${dateFrom}`
  if (nation) {
    urlPath = `nation/${nation}`;
  } else if (filter_search) {
    urlPath = `market/filter/${filter_search}`;
  } else if (topic_slug) {
    urlPath = `topic/${topic_slug}`;
  }
  if (urlPath) {
    response = await fetchApi({ urlPath: urlPath });
  }
  if (nation && response?.nation_name) {
    title = `Tour du lịch ${response.nation_name} ${dateFrom}`
  } else if (filter_search && response?.market_name) {
    title = `Tour du lịch ${response.market_name} ${response.day_number}N${response.night_number}D: ${response.tour_name} ${dateFrom}`;
  } else if (topic_slug && response?.name) {
    title = `${response.name} ${dateFrom}`;
  }

  let thumbnailGallery: string[] = [];

  return {
    title: title,
    openGraph: {
      images: [...thumbnailGallery],
    },
  }
}

const Search = () => {
  const resultList = [
    'bali-360x225.jpg',
    'dao-nam-du-360x225.jpg',
    'canh-dong-quat-gio-360x225.jpg',
    'singapore-360x225.jpg',
    'bali-360x225.jpg',
    'dao-nam-du-360x225.jpg',
    'canh-dong-quat-gio-360x225.jpg',
    'singapore-360x225.jpg',
  ];

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

  const sideBarList: number[] = [1, 2, 3];

  const HeightSkeleton = () => {
    return <>
      <div className='h-svh'></div>
    </>
  }


  return (
    <>
      <section id='search_page' className={`search_page bg-sgt-bg-primary`}>
        <Suspense fallback={<HeightSkeleton />}>
          <StoreProvider>
            <SearchBar />
            <div style={{ width: "1160px" }} className='flex flex-col m-auto'>
              <div className='grid grid-cols-12 gap-x-4 my-4'>
                <div className='search_sidebar col-span-3'>
                  <SearchSideBar data={sideBarList} />
                </div>
                <div className='search_content col-span-9'>
                  <SearchArrangeNavBar />
                  <SearchResult data={resultList} />
                </div>
              </div>
              <TourViewed data={viewedList}></TourViewed>
            </div>
          </StoreProvider>
        </Suspense>
      </section>
    </>
  )
}

export default Search