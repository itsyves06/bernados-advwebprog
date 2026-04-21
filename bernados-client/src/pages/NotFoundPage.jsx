import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-[#ffb800] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/70">
            Error
          </p>
          <h1 className="text-6xl font-bold leading-tight text-black sm:text-7xl">
            404
          </h1>
          <p className="mt-4 text-lg leading-7 text-black">
            Page not found. The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6 flex gap-3">
            <Button to="/" className="bg-black text-[#ffb800] hover:bg-[#ffe082]">Back Home</Button>
            <Button to="/products" className="bg-black text-[#ffb800] hover:bg-[#ffe082]">View Products</Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-[#ffb800] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00000]">
            Quick Links
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Explore the site</h2>
          
          <div className="mt-6 space-y-3">
            <div className="rounded-3xl border-2 border-zinc-900 bg-[#1e009f] p-4">
              <h3 className="font-semibold text-white">Home</h3>
              <p className="mt-1 text-sm text-zinc-200">Return to the homepage</p>
              <Button 
                to="/" 
                className="mt-3 bg-[#ffb800] text-black hover:bg-[#ffe082] transition-colors border-none"
              >
                Go Home
              </Button>
            </div>
            
            <div className="rounded-3xl border-2 border-zinc-900 bg-[#1e009f] p-4">
              <h3 className="font-semibold text-white">Products</h3>
              <p className="mt-1 text-sm text-zinc-200">Browse all featured store items</p>
              <Button 
                to="/products" 
                className="mt-3 bg-[#ffb800] text-black hover:bg-[#ffe082] transition-colors border-none"
              >
                View Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Yellow Background */}
      <section className="border-y-2 border-zinc-900 bg-[#ffb800] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
         <div className="max-w-3xl">
            <p className="text-sm font-medium text-black">Bulldog Exchange &copy; 2026</p>
         </div>
      </section>
    </div>
  )
}

export default NotFoundPage;