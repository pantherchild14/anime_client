import AxiosService from "@/lib/commons/axiosService";
import { API_SERVER } from "@/lib/constants/index";
import { AnimeCategoryResponseService, AnimeRecentlyResponseService, AnimeSlugResponseService, AnimeVideoResponseService } from "@/lib/services/anime";
import { AxiosResponse } from "axios";


export const ApiAnimeRecently = (): Promise<AxiosResponse<AnimeRecentlyResponseService>> => {
    return AxiosService.get<AnimeRecentlyResponseService>(`${API_SERVER}/schedule/anime`);
};

export const ApiAnimeCategory = (params: { page: number; limit: number }): Promise<AxiosResponse<AnimeCategoryResponseService>> => {
    const { page, limit } = params;
    return AxiosService.get<AnimeCategoryResponseService>(`${API_SERVER}/schedule/category`, {
        params: { page, limit }
    });
};

export const ApiAnimeSlug = (slug: string): Promise<AxiosResponse<AnimeSlugResponseService>> => {
    return AxiosService.get<AnimeSlugResponseService>(`${API_SERVER}/player/${slug}`);
};

export const ApiAnimeVideo = async (slug: string, episode: number): Promise<AxiosResponse<AnimeVideoResponseService>> => {
    return AxiosService.get<AnimeVideoResponseService>(`${API_SERVER}/player/${slug}/${episode}`);
};
