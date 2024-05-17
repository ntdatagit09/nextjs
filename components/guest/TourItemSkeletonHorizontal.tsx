import { Skeleton } from "antd";

const TourItemSkeletonHorizontal = () => {
    return (
        <div className=' col-span-12 search_result_list rounded-lg bg-white shadow'>
            <div className='search_result_item grid grid-cols-12 gap-4'>
                <div className='search_result_item_image aspect-[3/2] col-span-4
                            rounded-tl-lg rounded-bl-lg 
                            overflow-hidden'
                >
                    <div className='relative w-full h-full'>
                        <Skeleton.Image
                            className='!w-full !h-full object-cover'
                            active
                        />
                    </div>
                </div>
                <div className='search_result_item_detail col-span-8 flex flex-col justify-between py-3'>
                    <div className='search_result_item_detail flex flex-col gap-0.5'>
                        <Skeleton
                            loading={true}
                            title={false}
                            paragraph={{
                                rows: 2,
                                width: [500, 200]
                            }}
                            active
                        />
                    </div>
                    <div className='flex flex-row justify-between items-end'>
                        <div className='search_result_item_detail w-1/2'>
                            <Skeleton
                                title={false}
                                paragraph={{
                                    rows: 3,
                                }}
                                active
                            />
                        </div>
                        <div className='pb-0.5'>
                            <Skeleton.Button className='pr-6 pl-24 py-1.5 rounded-lg' active />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourItemSkeletonHorizontal;