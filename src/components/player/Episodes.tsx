import { FC } from 'react';
import axios from 'axios';

interface EpisodesProps {
    animeId: string;
    episodeNumber: number;
}

const Episodes: FC<EpisodesProps> = ({ animeId, episodeNumber }) => {
    const handleDelete = async () => {
        try {
            await axios.delete('/admin/delete-episode', { data: { episodeNumber, animeId } });
            window.location.href = window.location.origin + "/admin";
        } catch (error) {
            console.error("Error deleting episode:", error);
        }
    };

    return (
        <section className="block_area block_area-option" style={{ paddingTop: '100px', display: 'flex', justifyContent: 'flex-end', paddingRight: '100px' }}>
            <button className="btn btn-danger btnDeleted" onClick={handleDelete}>Xóa</button>
        </section>
    );
};

export default Episodes;
