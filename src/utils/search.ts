import axios from "axios";
import * as cheerio from "cheerio";

/** Types */
import { 
    SearchResult,
    resData
} from "../types/monsnode";

/**
* Searches for videos related to the specified keyword.
* @param {string} word - The keyword to search for.
* @returns {Promise<object>} The result containing an array of videos.
*
* Response format:
* {
*   success: true,
*   data: [
*     { video: { tweetUrl, videoImage, videoUrl } },
*     { video: { tweetUrl, videoImage, videoUrl } },
*     ...
*   ]
* }
* If `data` is undefined, there were no matching results.
*/
export const search = async (word: string): Promise<SearchResult> => {
    const data: resData[] = [];

    try {
        const response = await axios.get(`https://monsnode.com/search.php?search=${word}`);

        if (response.status !== 200) {
            if (response.statusText && typeof response.statusText == "string") {
                return {
                    status: "error",
                    message: response.statusText || undefined
                }
            }
        }

        const $ = cheerio.load(response.data);
        $(".listn").each((_, element) => {
            const url = $(element).find("a").attr("href") ?? "";
            const imageUrl = $(element).find("img").attr("src") ?? "";
            data.push({
                video: {
                    url: url,
                    imageUrl: imageUrl 
                }
            });
        });

    } catch (e) {
        if (e instanceof Error && typeof e.message == "string") {
            return {
                status: "error",
                message: e.message || undefined
            }
        }
    }
    return {
        status: "success",
        data: data || undefined
    }
}
