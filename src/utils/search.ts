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
 * @returns {Promise<object>} - Results. 
 */
export const search = async (word: string): Promise<SearchResult> => {
    return new Promise(async (resolve, reject) => {
        const data: resData[] = [];

        try {
            const response = await axios.get(`https://monsnode.com/search.php?search=${word}`);
    
            if (response.status !== 200) {
                reject({
                    status: "error",
                    message: response.statusText
                });
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
                reject({
                    status: "error",
                    message: e.message
                });
            }
        }
        resolve({
            status: "success",
            data: data
        });
    });
}
