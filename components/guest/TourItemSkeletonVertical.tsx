import { Skeleton } from "antd";
type ViewedParam = {
    isShowBtn?: boolean,
    col?: string
}
const TourItemSkeletonVertical = (props: ViewedParam) => {
    let ishowBtn = props.isShowBtn ?? true;
    return (
        <div className={`${props.col ? props.col : 'col-span-4'} search_result_list rounded-lg bg-white shadow`}>
            <div className='search_result_item grid grid-cols-12'>
                <div className='search_result_item_image aspect-[3/2] col-span-12
                    rounded-tl-lg rounded-tr-lg 
                    overflow-hidden'
                >
                    <div className='relative w-full h-full'>
                        <Skeleton.Image
                            className='!w-full !h-full object-cover'
                            active
                        />
                    </div>
                </div>
                <div className='search_result_item_detail col-span-12 flex flex-col justify-between gap-4 p-2.5'>
                    <div className='search_result_item_detail flex flex-col gap-0.5'>
                        <Skeleton
                            loading={true}
                            title={false}
                            paragraph={{
                                rows: 2,
                            }}
                            active
                        />
                    </div>
                    <div className='flex flex-row justify-between items-end'>
                        <div className='search_result_item_detail text-xs font-normal w-1/2'>
                            <Skeleton
                                title={false}
                                paragraph={{
                                    rows: 3,
                                    width: [100, 100, 150]
                                }}
                                active
                            />
                        </div>
                        {
                            !ishowBtn ? null :
                                <div className='pb-2 pr-0.5'>
                                    <Skeleton.Button className='rounded-lg' active />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourItemSkeletonVertical;