import React from 'react';

const Footer = () => {
    return (

        <footer className="bg-[#90A87F] text-black border-t-4 border-[#80956B] mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#2D3A20]">
                        Plantlife Hub
                    </h3>
                    <p className="text-black/80 text-sm leading-relaxed">
                        A clean and simple showcase of knowledge, tutorials, and insights about React development and minimalist living.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-[#2D3A20] mb-4 uppercase tracking-wider">
                        Explore
                    </h4>
                    <ul className="space-y-3">
                        {['Home', 'About', 'Articles'].map(link => (
                            <li key={link}>
                                <a href="#" className="hover:text-white transition-colors duration-150 font-medium">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-[#2D3A20] mb-4 uppercase tracking-wider">
                        Palette
                    </h4>
                    <div className="flex gap-3">
                        {['#F6F0D7', '#BDD29F', '#90A87F', '#80956B'].map(color => (
                            <div key={color} className="text-center">
                                <div 
                                    style={{backgroundColor: color}} 
                                    className="w-10 h-10 rounded-full border border-black/20 mx-auto mb-1 shadow-sm" 
                                />
                                <span className="text-[10px] font-bold uppercase text-black/60">
                                    {color.substring(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-[#80956B] py-6 px-6 border-t border-black/10">
                <p className="text-center text-black font-medium text-sm">
                    &copy; {new Date().getFullYear()} Plantlife. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;