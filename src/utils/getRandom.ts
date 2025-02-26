import axios from "axios";
import cheerio from "cheerio";

/** Types */
import {
    getRandomResult
} from "../types/monsnode";

/**
 * Get random video.
 * 
 * @returns {object} - Results.
 */
export const getRandom = async (): Promise<getRandomResult> => {
    let tweetUrl: string = "";
    let videoImage: string = "";
    let videoUrl: string = "";

    try {
        let url: string = "";
        const response = await axios.get(`https://monsnode.com?page=${Math.floor(Math.random() * 50) + 1}`);

        if (response.status !== 200) {
            if (response.statusText) {
                return {
                    status: "error",
                    message: response.statusText
                }
            }
        }

        const $ = cheerio.load(response.data);
        const urls: string[] = [];
        const imageUrls: string[] = [];                
        $(".listn").each((_, element) => {
            const url = $(element).find("a").attr("href") ?? "";
            urls.push(url as string);
            const imageUrl = $(element).find("img").attr("src") ?? "";
            imageUrls.push(imageUrl as string);
        });
        const randomIndex = Math.floor(Math.random() * urls.length);
        videoImage = imageUrls[randomIndex];
        url = urls[randomIndex];

        const response_2 = await axios.get(url);

        if (response_2.status !== 200) {
            if (response.statusText && typeof response.statusText == "string") {
                return {
                    status: "error",
                    message: response.statusText || undefined
                }
            }
        }

        const $_2 = cheerio.load(response_2.data);
        $("a").each((_, element) => {
            const url = $_2(element).attr("href");
            if (url?.startsWith("https://x.com/")) {
                tweetUrl = url;
            } else if (url?.startsWith("https://video.twimg.com/")) {
                videoUrl = url;
            }
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
        tweetUrl: tweetUrl || undefined,
        videoImage: videoImage || undefined,
        videoUrl: videoUrl || undefined
    }
}
