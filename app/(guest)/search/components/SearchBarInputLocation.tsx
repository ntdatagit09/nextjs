'use client'
import { AutoComplete } from "antd";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSearchParams } from "next/navigation";
import { useGetNationQuery, useGetNationsQuery } from "@/services/api/nation";
import { setFilterSearchParam, setLocationParam, setTopicParam } from "@/store/searchSlice";
import { useEffect, useState } from "react";
import { useGetTopicQuery } from "@/services/api/topics";
import { useGetMarketFilterQuery, useGetMarketsQuery } from "@/services/api/markets";
import { transferStringToSlug } from "@/utils/formatString";

const MARKET_FILTER = 'market_filter';
const TOPIC_FILTER = 'topic_filter';
const NATION_FILTER = 'nation_filter';
const SEARCHTIMEOUT = 500;
var typingTimer: any;
const renderTitle = (title: string) => (
    <span className='text-sm'>
        {title}
    </span>
);

const SearchBarInputLocation = () => {
    const search = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const filter_search = searchParams.get('filter_search');
    const topic_slug = searchParams.get('topic_slug');
    const nation_slug = searchParams.get('nation');

    const [filterSearch, setFilterSearch] = useState<string>("?sort_by=sort_order:asc");
    const [filterSearchMarket, setFilterSearchMarket] = useState<string>("");
    const { data, isLoading: nationLoading } = useGetNationsQuery(filterSearch);
    const { data: marketData, isLoading: marketLoading } = useGetMarketsQuery(filterSearchMarket)
    const [valueSelect, setValueSelect] = useState<string | null>(search.topicNameSearch)
    const { data: topicData, isLoading: topicDetailLoading } = useGetTopicQuery(topic_slug, {
        skip: !topic_slug
    });
    const { data: nationDetail, isLoading: nationDetailLoading, isFetching } = useGetNationQuery(nation_slug, {
        skip: !nation_slug
    });
    const { data: marketDetail, isLoading: marketDetailLoading } = useGetMarketFilterQuery(filter_search, {
        skip: !filter_search
    });

    useEffect(() => {
        if (!topicDetailLoading && topicData?.data != null && topic_slug != null) {
            const param = "topic_slug=" + transferStringToSlug(topicData.data.name);
            dispatch(setTopicParam(param));
            setValueSelect(topicData.data.name)
        } else
            if (!nationDetailLoading && nationDetail?.data != null && nation_slug != null) {
                const param = "nation=" + transferStringToSlug(nationDetail.data.nation_name);
                dispatch(setLocationParam(param));
                setValueSelect(nationDetail.data.nation_name)
            }
            else if (!marketDetailLoading && marketDetail?.data != null && filter_search != null) {
                const marketTourName = marketDetail.data.market_name + " - " + marketDetail.data.day_number + "N" + marketDetail.data.night_number + "D - " + marketDetail.data.tour_name;
                const param = "filter_search=" + transferStringToSlug(marketTourName);
                dispatch(setFilterSearchParam(param));
                setValueSelect(marketTourName)
            } else {
                setValueSelect(filter_search)
            }
    }, [
        dispatch,
        topicDetailLoading,
        topicData,
        filter_search,
        nationDetail,
        nationDetailLoading,
        marketDetail,
        marketDetailLoading
    ]);

    const setFilterTourSearchPageStatus = (
        nationParam: any = null,
        topicParam: any = null,
        filterSearchParam: any = null
    ) => {
        dispatch(setLocationParam(nationParam));
        dispatch(setTopicParam(topicParam));
        dispatch(setFilterSearchParam(filterSearchParam));
    }

    const handleOnChange = (value: string) => {
        setValueSelect(value);
        dispatch(setTopicParam(null));

    }

    const handleOnSearch = (value: any) => {
        const searchFilter = "?filter_search=" + transferStringToSlug(value)
        setFilterSearch(searchFilter);
        setFilterSearchMarket(searchFilter)

    }

    const handleOnClickNation = (e: any) => {
        setFilterTourSearchPageStatus();
        const valueAttribute = e.target.getAttribute('data-slug');
        const param = "nation=" + valueAttribute;
        setFilterTourSearchPageStatus(param, null, null);
    }

    const handleOnClickMarket = (e: any) => {
        setFilterTourSearchPageStatus();
        const valueAttribute = e.target.getAttribute('data-slug');
        const param = "filter_search=" + valueAttribute;
        setFilterTourSearchPageStatus(null, null, param);
    }

    const HandleOnKeyUP = (value: any) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(
            () => {
                handleOnSearch(value)
            }, SEARCHTIMEOUT);
    }

    const renderItem = (title: string, count: number, icon: string | null) => ({
        value: title,
        label: (
            <div
                id={NATION_FILTER}
                onClick={(e) => handleOnClickNation(e)}
                data-slug={transferStringToSlug(title)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div data-slug={transferStringToSlug(title)} className="flex">
                    <img src={icon ?? ''} alt="" className="w-5 h-5 mr-2" />
                    {title}
                </div>
                <span>
                    {count} tours
                </span>
            </div>
        ),
    });

    const renderMarketItem = (title: string, id: any) => ({
        value: title,
        label: (
            <div onClick={(e) => handleOnClickMarket(e)}
                id={MARKET_FILTER}
                data-slug={transferStringToSlug(title)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div data-slug={transferStringToSlug(title)}>{title}</div>
            </div>
        ),
    });

    let options: any = [
        {
            label: renderTitle('Địa điểm phổ biến nước ngoài'),
            options: [],
        },
        {
            label: renderTitle('Tour du lịch phổ biến'),
            options: [],
        }
    ]

    if (!nationLoading) {
        const nationOptions = (data?.data.map(nation => renderItem(nation.nation_name, nation.total_tour, nation.url_media)));
        options[0].options = nationOptions;
    }

    if (!marketLoading) {
        const marketOptions = (marketData?.data.map(market => renderMarketItem(market.market_name + " - " + market.day_number + "N" + market.night_number + "D - " + market.tour_name, market.market_id)))
        options[1].options = marketOptions;
    }

    if (marketData?.data.length == 0 && data?.data.length == 0) {
        options = [
            {
                label: renderTitle('Không có kết quả tìm kiếm'),
                options: [],
            },
        ]
    }

    return (
        <>
            <AutoComplete
                id="selectTour"
                className='search_bar_vertical_auto_complete'
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={true}
                options={options}
                value={valueSelect}
                onChange={(value) => handleOnChange(value)}
                onSearch={(value) => HandleOnKeyUP(value)}
                listHeight={380}
            >
                <input id="search" type="text" placeholder="Bạn muốn đi đâu?"
                    className='pl-2 w-full bg-transparent placeholder:text-white placeholder:text-opacity-85 search_bar_page_search_tour_vertical_input_auto_complete
                             focus-visible:outline-none' />
            </AutoComplete>
        </>
    );
}

export default SearchBarInputLocation;