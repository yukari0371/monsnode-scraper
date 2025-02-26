export type getRandomResult =
| {
    status: "success",
    tweetUrl: string | undefined;
    videoImage: string | undefined;
    videoUrl: string | undefined;
} | {
    status: "error";
    message: string;
}

export type resData = {
    video: {
        url: string | undefined;
        imageUrl: string | undefined;
    }
}

export type SearchResult =
| {
    status: "success";
    data: resData[] | undefined;
} | {
    status: "error";
    message: string
}