import AnimeSlug from '@/components/animeSlug';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
    params: {
        animeSlug: string;
    };
}

const AnimeSlugPage = ({ params }: Props) => {
    const { animeSlug } = params;

    return (
        <AnimeSlug slug={animeSlug} />
    );
};

export default AnimeSlugPage;
