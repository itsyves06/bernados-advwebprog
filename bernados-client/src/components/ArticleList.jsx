import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article, index) => (
                <article 
                    key={article.name} 
                    className="rounded-[2rem] border-2 border-[#80956B] bg-[#F6F0D7] p-3 transition-all hover:shadow-lg"
                >
                    <div className="aspect-4/3 overflow-hidden rounded-[1.5rem] border border-[#BDD29F]">
                        <img 
                            src={article.thumbnail} 
                            alt={article.title} 
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="px-2 pb-2">
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#90A87F]">
                            Article {String(index + 1).padStart(2, '0')}
                        </p>
                        
                        <h3 className="mt-2 text-xl font-bold text-[#80956B]">
                            {article.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-[#90A87F] line-clamp-2">
                            {article.content[0]}
                        </p>

                        <Link to={`/articles/${article.name}`}>
                            <Button className="mt-5 w-full bg-[#80956B] text-[#F6F0D7] hover:bg-[#90A87F] rounded-xl py-2">
                                Read More
                            </Button>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;