export interface YoutubeVideoCollection {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeVideo[];
}


export interface YoutubeVideo {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            'default': VideoThumbnail;
            medium: VideoThumbnail;
            high: VideoThumbnail;
            standard: VideoThumbnail;
            maxres: VideoThumbnail;
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string
        };
        defaultAudioLanguage: string
    };
    contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        projection: string
    };
}

interface VideoThumbnail {
    url: string;
    width: number;
    height: number;
}
