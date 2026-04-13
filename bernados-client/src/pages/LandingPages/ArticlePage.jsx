import plantImg from '../../assets/plant.jpg';
import potImg from '../../assets/pot.jpg';
import readImg from '../../assets/read.jpg';
import wateringImg from '../../assets/watering.jpg';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import articles from '../../assets/article-content.js';

function ArticlePage() {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);

    if (!article) {
        return (
            <div className="flex w-full flex-col gap-6 bg-[#F6F0D7] min-h-screen">
                <section className="border-y-2 border-[#80956B] bg-[#BDD29F]/20 px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl font-bold text-[#80956B]">Article not found</h1>
                        <Button to="/articles" className="mt-6 bg-[#80956B] text-[#F6F0D7]">Back to Articles</Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6 bg-[#F6F0D7] min-h-screen">
            <section className="border-y-2 border-[#80956B] bg-[#BDD29F]/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-4">
                        <Button to="/articles" className="text-[#80956B] border-[#80956B]">← Back to Articles</Button>
                    </div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#90A87F]">
                        Article
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-[#80956B] sm:text-4xl">
                        {article.title}
                    </h1>
                </div>
            </section>

            <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    
                    <div className="aspect-4/3 overflow-hidden rounded-[2rem] border-2 border-[#80956B] mb-8 shadow-sm">
                        <img 
                            src={article.thumbnail} 
                            alt={article.title} 
                            className="h-full w-full object-cover" 
                        />
                    </div>

                    <div className="prose prose-sm max-w-none space-y-6 text-[#80956B]">
                        {article.content.map((paragraph, index) => (
                            <p key={index} className="text-lg leading-relaxed text-[#80956B] whitespace-pre-wrap">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12 border-t-2 border-[#80956B] pt-8">
                        <Button to="/articles" className="bg-[#80956B] text-[#F6F0D7] hover:bg-[#90A87F]">
                            Back to Articles
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;