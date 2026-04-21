const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div>
              <p className="text-xl font-bold text-[#1e009f] uppercase tracking-tight">
                Bulldog<span className="text-[#ffb800]">ExShop</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                The official National University Manila merchandise and uniform store. 
                Providing quality campus essentials for every Bulldog.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
              Store Information
            </p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>📍 NU Manila Campus, Sampaloc</li>
              <li>⏰ Mon - Fri: 8:00 AM - 5:00 PM</li>
              <li>📧 bulldogexshop@nu-manila.edu.ph</li>
            </ul>
          </div>

          <div className="space-y-4 lg:text-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2 text-sm font-medium text-zinc-400">
              <a href="/products" className="hover:text-white transition">Shop Uniforms</a>
              <a href="/products?category=merch" className="hover:text-white transition">NU Merchandise</a>
              <a href="/cart" className="hover:text-white transition">Your Basket</a>
              <a href="/pickup-details" className="hover:text-white transition">Pickup Guide</a>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} National University Manila. All rights reserved.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            Education That Works
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;