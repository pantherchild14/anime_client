import AxiosService from "@/lib/commons/axiosService";
import { API_SERVER } from "@/lib/constants/index";
import { AnimeCommentService, CommentResponseService } from "@/lib/services/anime";
import { AxiosResponse } from "axios";

export const ApiPostComment = (data: AnimeCommentService): Promise<AxiosResponse<CommentResponseService>> => {
    return AxiosService.post<CommentResponseService>(`${API_SERVER}/auth/comment`, data);
};

export const ApiGetComment = (post_id: number): Promise<AxiosResponse<AnimeCommentService>> => {
    return AxiosService.get<AnimeCommentService>(`${API_SERVER}/auth/comment/${post_id}`);
};
