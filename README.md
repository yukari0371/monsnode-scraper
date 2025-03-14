# monsnode-scraper
Scraper for monsnode
### Usage
```ts
import monsnode from "./dist/index.js";

(async() => {
    const result = await monsnode.getRandom();
    if (result.status === "error") {
        console.error("Error:", result.message);
    } else {
        console.log(result);
    }

    const _result = await monsnode.search("banana");
    if (_result.status === "error") {
        console.error("Error":, _result.message);
    } else {
        console.log(_result)
    }
})();
```
### Result
```
{
    success: true,
    tweetUrl: 'https://x.com/shachikuchan69/status/1871487189118533766',
    videoImage: 'https://pbs.twimg.com/amplify_video_thumb/1871487131337842688/img/8PvstdYSNM2VsnpW.jpg',
    videoUrl: 'https://video.twimg.com/amplify_video/1871487131337842688/vid/avc1/720x1280/hs7f2cTq1C2DAJTo.mp4?tag=16'
}

{
    success: true,
    data: [
        { video: [Object] },
        { video: [Object] },
        { video: [Object] }...
    ]
}
 ```
