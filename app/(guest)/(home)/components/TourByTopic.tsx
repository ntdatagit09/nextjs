import { ITourSummary } from "@/interfaces/tour";
import { fakeTopic } from "@/utils/fakeTours";
import SlickTour from "./SlickTour";
import { ITopicSummary } from "@/interfaces/topic";
import fetchApi from "@/services/api/fetchApi";

interface ApiDataProps {
    topics: ITopicSummary[] | null,
};

const TourByTopic: React.FC<ApiDataProps> = ({ topics }) => {

    return (
        <>
            {
                topics?.map(async (item) => {
                    const tourByTopic = await fetchApi(
                        {
                            urlPath: `tour/tour-by-topic/${item.topic_id}?limit=50`,
                        }
                    );
                    return <>
                        <section key={item.topic_id} className='tour_vacation w-full pb-4'>
                            <SlickTour key={item.topic_id + 1} fetchTopicTour={tourByTopic} topic={item} />
                        </section>
                    </>
                })
            }
        </>
    );
}

export default TourByTopic