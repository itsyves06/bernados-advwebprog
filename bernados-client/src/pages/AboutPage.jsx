import Button from '../components/Button';
import profileImg from '../assets/read.jpg';
import plantImg from '../assets/plant.jpg';
import potImg from '../assets/pot.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 pt-20 bg-[#FDFCF7]">
      
      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center">
        
          <div className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-3 shadow-xl overflow-hidden">
            <img 
              src={profileImg} 
              alt="The Editor" 
              className="aspect-square w-full rounded-2xl object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              Meet the Curator
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-[#4A5D3A] sm:text-5xl">
              Finding the pulse of the <span className="text-[#8A9A73]">Modern Sanctuary.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#6B7C5C] sm:text-base">
              I founded The Botanical Journal to let people see that there's a connection in nature and also to learn about plants and planting with connections of their lifestyle.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" className="bg-[#4A5D3A] text-white hover:bg-[#3d4d30] px-6 py-2 rounded-full shadow-md transition">
                Back Home
              </Button>
              <Button to="/articles" className="border-2 border-[#4A5D3A] text-[#4A5D3A] hover:bg-[#4A5D3A] hover:text-white px-6 py-2 rounded-full transition">
                Read Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              Professional Background
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#4A5D3A]">The Journey So Far</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { val: '08', label: 'Design Years' },
              { val: '150+', label: 'Interiors Styled' },
              { val: '40+', label: 'Plant Species' },
              { val: '03', label: 'Design Awards' },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-5 shadow-sm text-center">
                <p className="text-2xl font-black text-[#4A5D3A]">{stat.val}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A9A73]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#4A5D3A] bg-[#F6F0D7] px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73]">
              The Process
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#4A5D3A]">How I Create the Journal</h2>
            
            <div className="mt-8 space-y-6">
              <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-xl font-bold text-[#4A5D3A]">01. Intentional Sourcing</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7C5C]">
                  Every feature card and article starts with a physical exploration. Whether it's a ceramic studio or a hidden greenhouse, I source inspiration from tactile experiences.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-xl font-bold text-[#4A5D3A]">02. Biophilic Balance</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7C5C]">
                  I believe a space is incomplete without life. I focus on how air, light, and plants interact with rigid architectural lines to create harmony.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#4A5D3A] bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-xl font-bold text-[#4A5D3A]">03. Sustainable Legacy</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7C5C]">
                  Fast furniture is the enemy of slow living. I advocate for pieces that age with you—stone, wood, and linen—curated to last a lifetime.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-[2.5rem] border-2 border-[#4A5D3A] bg-white p-6 flex flex-col h-fit">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8A9A73] mb-6">
              Studio Inspiration
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <img src={plantImg} alt="Inspiration 1" className="aspect-square rounded-2xl object-cover border border-[#C5D9A4]" />
              <img src={potImg} alt="Inspiration 2" className="aspect-square rounded-2xl object-cover border border-[#C5D9A4]" />
              <img src={profileImg} alt="Inspiration 3" className="aspect-square rounded-2xl object-cover border border-[#C5D9A4]" />
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F6F0D7] border border-[#C5D9A4]">
                <span className="text-xs font-bold text-[#8A9A73] uppercase tracking-tighter">More to come</span>
              </div>
            </div>
            <Button className="mt-8 bg-[#8A9A73] text-white hover:bg-[#4A5D3A] w-full py-3 rounded-2xl transition shadow-sm">
              View Instagram Feed
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;