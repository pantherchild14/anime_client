import AnimeVideoComponent from '@/components/animeVideo';
import React from 'react';

interface Props {
    params: {
        animeSlug: string;
        episode: number;
    };
}

const AnimeEpisodePage: React.FC<Props> = ({ params }: Props) => {
    const { animeSlug, episode } = params;
    return (
        // <div>{`Anime Slug: ${animeSlug}, Episode: ${episode}`}</div>
        <AnimeVideoComponent slug={animeSlug} episode={episode} />
    );
};

export default AnimeEpisodePage;
