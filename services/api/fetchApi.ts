import { API_PATH, BASE_URL } from "@/constants/api";

const fetchApi = async (
    { urlPath, isNoCache }: { urlPath: string, isNoCache?: boolean }
) => {
    try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
        const baseUrl = `${BASE_URL}${API_PATH}`;
        console.log('url: ', baseUrl + urlPath);
        const response = await fetch(`${baseUrl}${urlPath}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            // cache: isNoCache ? 'no-store' : 'force-cache'
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse response JSON
        const responseData: any = (await response.json()).data;
        console.log({ responseData });
        return responseData;
    } catch (error) {
        // setLoading(false);
        return null;
    }
}

export default fetchApi;