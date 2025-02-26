import axios from "axios";
import * as cheerio from "cheerio";

/** Types */
import { 
    SearchResult,
    resData
} from "../types/monsnode";

/**
 * Search word.
 * 
 * @param {string} word - Word to search.
 * @returns {object} - Results. 
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
            const url = $(element).find("a").attr("href");
            const imageUrl = $(element).find("img").attr("src");
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
