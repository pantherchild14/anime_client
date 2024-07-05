import AnimeCategoryComponent from "@/components/animeCategory";

const AnimePage: React.FC = () => {
    const params = { page: 1, limit: 20 };
    return (
        <div>
            <AnimeCategoryComponent params={params} />
        </div>
    );
};

export default AnimePage;
