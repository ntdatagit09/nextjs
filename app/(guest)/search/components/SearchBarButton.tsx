'use client'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDefaultPage, setUrlWithParam } from "@/store/searchSlice";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBarButton = () => {
    const search = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const flightDate = search.flightDateParam;
    const nationParam = search.nationParam;
    const topicParam = search.topicParam;
    const filterSearchParam = search.filterSearch;

    const handleOnSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        // delete old nation param
        let pathUrl;
        params.delete('flight_date');
        params.delete('filter_search');
        params.delete('nation');
        params.delete('topic_slug');
        const defaultParam = `&flight_date=${flightDate}&${params.toString()}`;
        if (nationParam != null) {
            pathUrl = `${nationParam}${defaultParam}`;
        } else
            if (topicParam != null) {
                pathUrl = `${topicParam}${defaultParam}`;
            } else {
                pathUrl = `${filterSearchParam}${defaultParam}`;
            }

        router.push(
            `search?${pathUrl}`,
            { shallow: true } as any);
        dispatch(setUrlWithParam(`${pathUrl}`));
        dispatch(setDefaultPage(1));
    };

    return (
        <>
            <div id="search" onClick={handleOnSearch} className=' bg-white p-2 rounded-md font-bold text-sm text-sgt-primary-dark flex flex-row justify-center items-center cursor-pointer'>
                <FontAwesomeIcon className='font-thin text-xs' icon={faSearch} />
                <button className='pl-2' >Tìm tour</button>
            </div>
        </>
    );
}

export default SearchBarButton;