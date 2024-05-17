
'use client'
import { INationSummary } from '@/interfaces/nation';
import { ITopicSummary } from '@/interfaces/topic';
import { useGetNationsQuery } from '@/services/api/nation';
import { useGetTopicQuery, useGetTopicsQuery } from '@/services/api/topics';
import { useAppDispatch } from '@/store/hooks';
import { setDefaultPage, setFilterSearchParam, setLocationParam, setTopicName, setTopicParam, setUrlWithParam } from '@/store/searchSlice';
import { Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { VI_DATE_FORMAT } from '@/constants/ui';
import { useEffect, useState } from 'react';
import { transferStringToSlug } from '@/utils/formatString';

type SearchSideBarParam = {
  data: number[],
};

function SearchSideBar(props: SearchSideBarParam) {
  const dateTime = new Date();
  const currentDateTime = dayjs(dateTime).format(VI_DATE_FORMAT);
  const flightDateParam = `&flight_date=${currentDateTime}&sort_by=day_number:asc,night_number:asc`;
  const nationParam = "?sort_by=sort_order:asc"

  /** Use Hook */
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [topicParamUrl, setTopicParamUrl] = useState<string | null>(searchParams.get('topic_slug'));

  const { data: responseNation, isLoading: nationLoading } = useGetNationsQuery(nationParam);
  const { data: responseTopic, isLoading: topicLoading } = useGetTopicsQuery('');
  const { data: topicData, isLoading: topicDetailLoading, isFetching } = useGetTopicQuery(topicParamUrl || '');

  useEffect(() => {
    if (!topicDetailLoading && topicData) {
      dispatch(setTopicName(topicData.data?.name));
    }

  }, [dispatch, topicDetailLoading, topicData]);

  const topics: ITopicSummary[] | undefined = responseTopic?.data;
  const nations: INationSummary[] | undefined = responseNation?.data;

  const sideBarSkeleton = (loading: boolean) => {
    return (
      <Skeleton
        className='pl-5 py-1\.5'
        title={false}
        paragraph={
          {
            rows: 5,
            width: [200, 200, 150, 200]
          }
        }
        loading={loading}
        active
      />
    );
  }

  const setFilterTourSearchPageStatus = (
    nationParam: any,
    topicParam: any,
    filterSearchParam: any,
    pathUrl: string
  ) => {
    dispatch(setLocationParam(nationParam));
    dispatch(setTopicParam(topicParam));
    dispatch(setFilterSearchParam(filterSearchParam));
    dispatch(setUrlWithParam(pathUrl));
    dispatch(setDefaultPage(1));
  }

  const changePath = (nation: INationSummary) => {
    const nationSlug = transferStringToSlug(nation.nation_name);
    const param = "nation=" + nationSlug;
    const pathUrl = param + flightDateParam;
    router.push(
      `search?${pathUrl}`,
      { shallow: true } as any
    );
    setFilterTourSearchPageStatus(param, null, null, pathUrl);
  }

  const changeTopicPath = (topic: ITopicSummary) => {
    setTopicParamUrl(topic.slug)
    dispatch(setTopicName(topic.name))
    const param = "topic_slug=" + topic.slug;
    const pathUrl = param + flightDateParam;
    router.push(
      `search?${pathUrl}`,
      { shallow: true } as any
    );
    setFilterTourSearchPageStatus(null, param, null, pathUrl);
  }

  return (
    <>
      {/* {sideBar.map(item => */}
      <div className='side_bar bg-white rounded-md mb-4 py-2'>
        <div className='side_bar_title py-2 pl-3 font-extrabold text-sgt-secondary-dark'>Địa điểm phổ biến nước ngoài</div>
        {
          nationLoading
            ?
            sideBarSkeleton(nationLoading)
            :
            nations?.map((nation) => {
              return (
                <div key={nation.nation_id} className='side_bar_item py-1.5 pl-5 font-medium cursor-pointer'
                  onClick={() => changePath(nation)}
                >{nation.nation_name}</div>
              );
            })
        }
      </div>

      <div className='side_bar bg-white rounded-md mb-4 py-2'>
        <div className='side_bar_title py-2 pl-3 font-extrabold text-sgt-secondary-dark'>Tours theo chủ đề</div>
        {
          topicLoading
            ?
            sideBarSkeleton(topicLoading)
            :
            topics?.map((topic) => {
              return (
                <div key={topic.topic_id} className='side_bar_item py-1.5 pl-5 font-medium cursor-pointer'
                  onClick={() => changeTopicPath(topic)}
                >{topic.name}</div>
              );
            })
        }
      </div>
      {/* )} */}
    </>
  )
}

export default SearchSideBar