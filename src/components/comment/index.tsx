import { animeCommentAction } from '@/lib/hooks/comment/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { AnimeComment } from '@/lib/services/anime';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

type Props = {
    formData: AnimeComment;
};

const CommentComponent: React.FC<Props> = ({ formData }) => {
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comment.data);
    const [form, setForm] = useState({
        name: '',
        comment: ''
    });
    const [rlData, setRlData] = useState(false);

    useEffect(() => {
        dispatch(animeCommentAction.fetchCommentRequest(formData.comment_post_id));
    }, [dispatch, formData.comment_post_id, rlData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataPost = {
            comment_post_id: formData.comment_post_id,
            comment_author: form.name,
            comment_content: form.comment,
            comment_type: formData.comment_type,
            user_id: null
        };

        dispatch(animeCommentAction.animeCommentRequest({ formDataPost }));
        setRlData(prev => !prev);
    };

    return (
        <section className="w-full">
            <h3 className="font-os text-lg font-bold">Comments</h3>

            {comments?.comments && comments?.comments.length > 0 ? (
                comments?.comments.map((comment, index) => (
                    <div className="flex mt-4" key={index}>
                        <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
                            <img className="h-12 w-12 rounded-full object-cover" src={'https://randomuser.me/api/portraits/men/43.jpg'} alt="" />
                        </div>

                        <div className="ml-3">
                            <div className="font-medium text-purple-800">{comment.comment_author}</div>
                            <div className="text-gray-600">{/* Add postedOn field if available */}</div>
                            <div className="mt-2 text-purple-800">{comment.comment_content}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="mt-4 text-purple-800">No comments yet.</p>
            )}

            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-purple-800 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border-2 border-purple-600 p-2 w-full rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-purple-800 font-medium">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        className="border-2 border-purple-600 p-2 w-full rounded bg-gray-50 placeholder-gray-500"
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-600"
                >
                    Post Comment
                </button>
            </form>
        </section>
    );
};

export default CommentComponent;
