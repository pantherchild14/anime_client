

export interface AnimeService {
    anime_id: number
    title: string
    paramHref: string
    alias: string
    description: string
    poster: string
    meta: string
    update_time: string
}

// Recently 
export interface AnimeRecentlyStateService {
    data: AnimeService[] | null
    error: string | null
}

export interface AnimeRecentlyResponseService {
    data: string
}

// category
export interface AnimeCategoryService {
    anime_id: number;
    title: string;
    paramHref: string;
    alias: string;
    description: string;
    poster: string;
    meta: string;
    update_time: string;
    total_views: number
}


export interface animeCategoryStateService {
    data: AnimeCategoryService[] | null;
    error: string | null;
    total_anime: number;
}

export interface AnimeCategoryResponseService {
    anime: AnimeCategoryService[];
    countAnime: { total_anime: number };
}

export interface AnimeCategoryPayloadService {
    params: {
        page: number,
        limit: number
    }
}

// slug
export interface AnimeSlugService {
    anime_id: number
    title: string
    paramHref: string
    alias: string
    description: string
    poster: string
    meta: string
    episode_number: string
    update_time: string
}

export interface AnimeSlugStateService {
    data: AnimeSlugService | null
    error: string | null
}

export interface AnimeSlugResponseService {
    data: string
}

export interface AnimeSlugPayloadService {
    slug: string
}


// video

export interface AnimeVideoService {
    anime: AnimeSlugService
    animeVideoTV: string
    anime_drive_id: number
    hlsServer: string
    lh3Server: string
    tiktokServer: string
    episodeNumber: string
    totalVideoHLS: string
    totalVideoTiktok: string
    totalVideoLh3Docs: string
}

export interface AnimeVideoTVService {
    HYDRAX: string
    VPRO: string
    HLS: string
    TIK: string
    AHS: string
    // AHS: string
    // EMB: string

    // TIK: string

}

export interface AnimeVideoStateService {
    data: AnimeVideoService | null
    error: string | null
}

export interface AnimeVideoTVStateService {
    data: AnimeVideoTVService | null
    error: string | null
}

export interface AnimeVideoPayloadService {
    episode: number
    slug: string
}

export interface AnimeVideoResponseService {
    data: string
}

export interface AnimeVideoResponseService {
    data: string
}

// comment 

export interface AnimeComment {
    comment_post_id: number;
    comment_author: string;
    comment_content: string;
    comment_type: string;
    user_id: number | null;
}

export interface AnimeCommentService {
    comments: AnimeComment[];
    commentTotal: number;
}

export interface AnimeCommentState {
    data: AnimeCommentService | null;
    error: string | null;
}

export interface AnimeCommentPayloadService {
    formDataPost: AnimeCommentService;
}

export interface CommentResponseService {
    formDataPost: AnimeComment
}