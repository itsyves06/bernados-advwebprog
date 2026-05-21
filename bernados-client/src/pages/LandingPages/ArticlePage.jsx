import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';

function ArticlePage() {
    const { name } = useParams();
    const location = useLocation();
    
    // Safely reads the database record passed directly from the browser memory history object
    const article = location.state?.article;

    // Safety fallback for handling bookmarked URLs or direct link addresses cleanly
    if (!article) {
        return (
            <div className="flex w-full flex-col bg-[#F6F0D7] min-h-screen justify-center items-center p-6 text-center">
                <h1 className="text-3xl font-bold text-[#80956B]">Please browse from the collection directory</h1>
                <p className="text-[#90A87F] mt-2 mb-6">Articles must be initialized from our main archive timeline to read.</p>
                <Button to="/articles" className="bg-[#80956B] text-white">Back to Articles</Button>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6 bg-[#F6F0D7] min-h-screen">
            <section className="border-y-2 border-[#80956B] bg-[#BDD29F]/20 px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#90A87F]">Article Publication</p>
                    <h1 className="text-3xl font-bold leading-tight text-[#80956B] sm:text-4xl">{article.title}</h1>
                </div>
            </section>

            <section className="px-4 py-6 sm:px-6 lg:px-8 flex-grow">
                <div className="mx-auto max-w-3xl">
                    <div className="aspect-video overflow-hidden rounded-[2rem] border-2 border-[#80956B] mb-8 shadow-sm">
                        <img src={article.thumbnail} alt={article.title} className="h-full w-full object-cover" />
                    </div>

                    <div className="space-y-6 text-[#80956B]">
                        {Array.isArray(article.content) ? (
                            article.content.map((paragraph, index) => (
                                <p key={index} className="text-lg leading-relaxed text-[#80956B] whitespace-pre-wrap">
                                    {paragraph}
                                </p>
                            ))
                        ) : (
                            <p className="text-lg leading-relaxed text-[#80956B] whitespace-pre-wrap">{article.content}</p>
                        )}
                    </div>

                    <div className="mt-12 border-t-2 border-[#80956B] pt-6">
                        <Button to="/articles">Back to Directory List</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;