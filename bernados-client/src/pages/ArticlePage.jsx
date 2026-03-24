import Button from '../components/Button';
import plantImg from '../assets/plant.jpg';
import potImg from '../assets/pot.jpg';
import readImg from '../assets/read.jpg';
import bookImg from '../assets/book.jpg';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 pt-20 bg-[#FDFCF7]">
      
      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
            The Botanical Archive
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-tight text-[#4A5D3A] sm:text-5xl">
            Our Full <span className="text-[#8A9A73]">Collection</span> of Stories.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#6B7C5C] sm:text-base">
            From botanical guides to the philosophy of slow living, explore the complete archive of the journal.
          </p>
          <div className="mt-6">
            <Button to="/" className="bg-[#4A5D3A] text-white hover:bg-[#3d4d30] px-8 py-3 rounded-full shadow-md transition">
              Back Home
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#4A5D3A]">The Complete Entry Grid</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  
            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={plantImg} alt="Plant care" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">Volume 01</p>
              <h3 className="mt-2 text-lg font-bold text-[#4A5D3A]">Indoor Foresting</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                How to choose and maintain plants that thrive in modern city apartments.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">Read More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={potImg} alt="Ceramics" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">Volume 02</p>
              <h3 className="mt-2 text-lg font-bold text-[#4A5D3A]">The Ceramic Guide</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                Why handcrafted stoneware is the heart of a minimalist home.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">Read More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={readImg} alt="Slow reading" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">Volume 03</p>
              <h3 className="mt-2 text-lg font-bold text-[#4A5D3A]">Morning Rituals</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                Building a design library that inspires your daily creative practice.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">Read More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={bookImg} alt="Design books" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">Volume 04</p>
              <h3 className="mt-2 text-lg font-bold text-[#4A5D3A]">Nature Space</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                Own your space and connect to nature.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">Read More</Button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;