import Button from '../components/Button';
import plantImg from '../assets/plant.jpg';
import potImg from '../assets/pot.jpg';
import readImg from '../assets/read.jpg';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 pt-20 bg-[#FDFCF7]">
      
      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              The Botanical Journal
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-[#4A5D3A] sm:text-6xl">
              A Space to <span className="text-[#8A9A73]">Breath</span> &Grow.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#6B7C5C] sm:text-base">
              Exploring the quiet connection between our living spaces and the 
              natural world. Discover rituals for a greener, slower, and more 
              intentional lifestyle.
            </p>
            <div className="mt-6">
              <Button to="/about" className="bg-[#4A5D3A] text-white hover:bg-[#3d4d30] px-8 py-3 rounded-full shadow-md transition">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-[#C5D9A4] bg-white p-6">
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[1.25rem] bg-[#FDFCF7] p-8 text-center">
              <p className="text-xl italic text-[#4A5D3A] font-serif">
                "A home that breathes is a home that heals. We don't just grow plants; we grow the quiet spaces where we finally learn to slow down."
              </p>
              <div className="mt-6 h-1 w-12 bg-[#8A9A73]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              Community Impact
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#4A5D3A]">The Journal in Numbers</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { val: '150+', label: 'Green Guides' },
              { val: '08', label: 'Categories' },
              { val: '24k', label: 'Monthly Readers' },
              { val: '04', label: 'Annual Issues' },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-5 shadow-sm">
                <p className="text-2xl font-black text-[#4A5D3A]">{stat.val}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#4A5D3A]">Latest from the archive</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={plantImg} alt="Plant care" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#4A5D3A]">Indoor Foresting</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                How to choose and maintain plants that thrive in modern city apartments.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">View More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={potImg} alt="Ceramics" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#4A5D3A]">The Ceramic Guide</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                Why handcrafted stoneware is the essential focal point for a minimalist home.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">View More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-4 shadow-sm group">
              <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#FDFCF7]">
                <img src={readImg} alt="Slow reading" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#4A5D3A]">Morning Rituals</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7C5C]">
                Building a design library that inspires your daily creative practice.
              </p>
              <Button className="mt-4 w-full bg-[#8A9A73] text-white py-2 rounded-xl" variant="primary">View More</Button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;