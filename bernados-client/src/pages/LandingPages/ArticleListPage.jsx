import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { fetchArticles } from '../../services/articleService.js';

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPublicArticles = async () => {
            try {
                const response = await fetchArticles(true);
                setArticles(response.data || []);
            } catch (error) {
                console.error("Failed to load public directory items:", error);
            } finally {
                setLoading(false);
            }
        };
        getPublicArticles();
    }, []);

    return (
        <div className="flex w-full flex-col gap-6 bg-[#F6F0D7] min-h-screen p-6">
            <header className="border-b-2 border-[#80956B] pb-6">
                <h1 className="text-4xl font-bold text-[#80956B]">The Green Library</h1>
                <p className="text-[#90A87F] italic mt-2">Explore our guides on minimalist gardening and plant care.</p>
                <div className="mt-4"><Button to="/">Back Home</Button></div>
            </header>

            {loading ? (
                <div className="text-center py-10 text-[#80956B]">Gathering documents...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {articles.map((art) => (
                        <div key={art._id} className="bg-white border border-[#BDD29F] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <img src={art.thumbnail} alt={art.title} className="h-48 w-full object-cover" />
                            <div className="p-4 flex-grow">
                                <h3 className="text-xl font-bold text-[#80956B] mb-2">{art.title}</h3>
                                <p className="text-sm text-[#90A87F] line-clamp-3">
                                    {art.content?.[0] || 'No content preview available...'}
                                </p>
                            </div>
                            <div className="p-4 border-t border-[#F6F0D7] bg-[#F6F0D7]/20">
                                {/* CRITICAL STEP: Passes the full data payload inside router state memory */}
                                <Link 
                                    to={`/articles/${art.slug}`} 
                                    state={{ article: art }} 
                                    className="inline-block bg-[#80956B] text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#90A87F] transition-colors"
                                >
                                    Read Full Article →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleListPage;