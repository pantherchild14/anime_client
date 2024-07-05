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

export interface AnimeCategoryService {
    anime_id: number;
    title: string;
    paramHref: string;
    alias: string;
    description: string;
    poster: string;
    meta: string;
    update_time: string;
}


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

export interface AnimeVideoService {
    anime: AnimeSlugService
    animeVideoTV: string
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


export interface AnimeRecentlyStateService {
    data: AnimeService[] | null
    error: string | null
}

export interface animeCategoryStateService {
    data: AnimeCategoryService[] | null;
    error: string | null;
    total_anime: number;
}

export interface AnimeSlugStateService {
    data: AnimeSlugService | null
    error: string | null
}

export interface AnimeVideoStateService {
    data: AnimeVideoService | null
    error: string | null
}

export interface AnimeVideoTVStateService {
    data: AnimeVideoTVService | null
    error: string | null
}

export interface AnimeRecentlyResponseService {
    data: string
}

export interface AnimeCategoryResponseService {
    anime: AnimeCategoryService[];
    countAnime: { total_anime: number };
}


export interface AnimeSlugResponseService {
    data: string
}

export interface AnimeVideoResponseService {
    data: string
}

// hook

export interface AnimeSlugPayloadService {
    slug: string
}

export interface AnimeCategoryPayloadService {
    params: {
        page: number,
        limit: number
    }
}

export interface AnimeVideoPayloadService {
    episode: number
    slug: string
}