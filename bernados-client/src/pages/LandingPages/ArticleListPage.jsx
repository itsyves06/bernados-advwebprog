import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../assets/article-content.js';

const ArticleListPage = () => {
    return (
        <div className="flex w-full flex-col gap-6 bg-[#F6F0D7] min-h-screen">
            <section className="border-y-2 border-[#80956B] bg-[#BDD29F]/30 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#80956B]">
                    Collection
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#80956B] sm:text-4xl">
                    Plantlife & Minimalist Living
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#90A87F] sm:text-base italic">
                    "Bringing the outdoors in, one leaf at a time." 
                    Explore our guides on foresting, ceramics, and daily rituals.
                </p>
                <div className="mt-6">
                    <Button to="/" className="bg-[#80956B] text-[#F6F0D7] hover:bg-[#90A87F]">
                        Back Home
                    </Button>
                </div>
            </section>

            <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#90A87F]">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#80956B]">The Green Library</h2>
                </div>

                <ArticleList articles={articles} />
            </section>
        </div>
    );
}

export default ArticleListPage;