import { useMemo, useState } from 'react'
import JumiaLogo from './components/JumiaLogo'

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 2499,
    oldPrice: 4999,
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85',
    badge: '-50%',
  },
  {
    id: 2,
    name: 'Everyday Classic Sneakers',
    category: 'Fashion',
    price: 3890,
    oldPrice: 5500,
    rating: '4.6',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Minimal Ceramic Table Lamp',
    category: 'Home & Kitchen',
    price: 4250,
    oldPrice: 6200,
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85',
    badge: '-31%',
  },
  {
    id: 4,
    name: 'Daily Glow Skincare Set',
    category: 'Beauty',
    price: 2190,
    oldPrice: 3200,
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85',
    badge: 'New',
  },
  {
    id: 5,
    name: 'Smartphone with All-Day Battery',
    category: 'Phones & tablets',
    price: 18990,
    oldPrice: 22990,
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85',
    badge: '-17%',
  },
  {
    id: 6,
    name: 'Pantry Essentials Gift Box',
    category: 'Groceries',
    price: 1790,
    oldPrice: 2250,
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85',
    badge: 'Fresh',
  },
]

const copyrightYear = new Date().getFullYear()

const categories = [
  { label: 'Phones & tablets', icon: '📱', color: 'bg-orange-50' },
  { label: 'Fashion', icon: '👟', color: 'bg-rose-50' },
  { label: 'Home & kitchen', icon: '🪴', color: 'bg-emerald-50' },
  { label: 'Electronics', icon: '🎧', color: 'bg-blue-50' },
  { label: 'Beauty', icon: '✨', color: 'bg-violet-50' },
  { label: 'Groceries', icon: '🥑', color: 'bg-lime-50' },
]

function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.6 9a2.5 2.5 0 1 1 4.5 1.5c-1.1 1.2-2.1 1.5-2.1 3" />
        <path d="M12 17.5h.01" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All picks')
  const [cartCount, setCartCount] = useState(0)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All picks' || product.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const addToCart = (productName) => {
    setCartCount((count) => count + 1)
    setNotice(`${productName} added to your cart`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const selectCategory = (category) => {
    const matchingCategory = products.find(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    )
    if (matchingCategory) {
      setActiveCategory(matchingCategory.category)
      setQuery('')
      document.getElementById('top-picks')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#252525]">
      <div className="bg-[#f68b1e] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
        <span className="mr-2">✦</span>
        BIG DEALS, LITTLE PRICES — Shop the finds you&apos;ll love
        <span className="ml-2">✦</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-black/5 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:gap-8">
          <a aria-label="Jumia home" className="shrink-0" href="#">
            <JumiaLogo className="h-6 w-[138px]" />
          </a>

          <form
            className="ml-auto hidden max-w-xl flex-1 items-center rounded-lg border border-gray-200 bg-[#fafafa] px-3 transition focus-within:border-[#f68b1e] focus-within:bg-white md:flex"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <Icon className="h-5 w-5 shrink-0 text-gray-400" name="search" />
            <input
              aria-label="Search products"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-gray-400"
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveCategory('All picks')
              }}
              placeholder="Search products, brands and categories"
              type="search"
              value={query}
            />
            <button
              className="rounded-md bg-[#f68b1e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#df7410]"
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="ml-auto flex items-center gap-4 sm:gap-6 md:ml-0">
            <a className="hidden items-center gap-2 text-sm font-semibold hover:text-[#e77a11] sm:flex" href="#footer">
              <Icon className="h-5 w-5" name="user" />
              <span>Account</span>
            </a>
            <a className="hidden items-center gap-2 text-sm font-semibold hover:text-[#e77a11] lg:flex" href="#footer">
              <Icon className="h-5 w-5" name="help" />
              <span>Help</span>
            </a>
            <button
              aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative flex items-center gap-2 text-sm font-semibold hover:text-[#e77a11]"
              onClick={() => document.getElementById('cart-summary')?.scrollIntoView({ behavior: 'smooth' })}
              type="button"
            >
              <span className="relative">
                <Icon className="h-6 w-6" name="cart" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f68b1e] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        <form
          className="flex items-center gap-2 border-t border-gray-100 px-4 py-3 md:hidden"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <Icon className="h-5 w-5 shrink-0 text-gray-400" name="search" />
          <input
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveCategory('All picks')
            }}
            placeholder="Search products and brands"
            type="search"
            value={query}
          />
          <button
            aria-label="Submit search"
            className="rounded-md bg-[#f68b1e] p-2 text-white"
            type="submit"
          >
            <Icon className="h-4 w-4" name="search" />
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <section className="grid overflow-hidden rounded-2xl bg-[#163d34] text-white lg:grid-cols-[1.03fr_0.97fr]">
          <div className="relative z-10 flex flex-col items-start justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.6px] text-[#ffca83]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f68b1e]" />
              Good finds. Great prices.
            </span>
            <h1 className="max-w-lg text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">
              A little joy in
              <br />
              <span className="text-[#ffae52]">every delivery.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base">
              Your next favorite thing is closer than you think. Explore fresh
              picks for every corner of your life.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#f68b1e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#df7410]"
              href="#top-picks"
            >
              Explore today&apos;s picks
              <Icon className="h-4 w-4" name="arrow" />
            </a>
            <div className="mt-9 flex items-center gap-3 text-xs text-white/65">
              <span className="flex -space-x-2">
                {['🧡', '⭐', '🛍️'].map((emoji) => (
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#163d34] bg-white text-sm"
                    key={emoji}
                  >
                    {emoji}
                  </span>
                ))}
              </span>
              <span>
                <strong className="text-white">Made for your everyday</strong>
                <br />
                Great stuff, happy prices
              </span>
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[350px] lg:min-h-[450px]">
            <img
              alt="A curated collection of home and lifestyle favorites"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#163d34] via-[#163d34]/35 to-transparent lg:from-[#163d34]/25 lg:via-transparent" />
            <div className="absolute bottom-5 right-5 rounded-xl bg-white px-4 py-3 text-[#252525] shadow-xl sm:bottom-8 sm:right-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                The good life edit
              </p>
              <p className="mt-1 text-lg font-black">
                From <span className="text-[#f68b1e]">KSh 999</span>
              </p>
            </div>
            <div className="absolute right-5 top-5 flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full bg-[#f68b1e] text-white shadow-lg sm:right-8 sm:top-8">
              <span className="text-xs font-medium">UP TO</span>
              <span className="text-xl font-black leading-5">50%</span>
              <span className="text-[9px] font-bold uppercase">off</span>
            </div>
          </div>
        </section>

        <section aria-label="Shop by category" className="mt-10 sm:mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.8px] text-[#f68b1e]">
                A good place to start
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
                Shop by category
              </h2>
            </div>
            <span className="hidden text-sm text-gray-500 sm:block">A little something for everyone</span>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {categories.map((category) => (
              <button
                className="group flex flex-col items-center gap-2.5 rounded-xl bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:gap-3 sm:p-5"
                key={category.label}
                onClick={() => selectCategory(category.label)}
                type="button"
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl transition group-hover:scale-105 sm:h-[68px] sm:w-[68px] sm:text-3xl ${category.color}`}>
                  {category.icon}
                </span>
                <span className="text-[11px] font-bold leading-tight sm:text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12" id="top-picks">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.8px] text-[#f68b1e]">
                Picked with you in mind
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
                {query ? `Results for “${query}”` : activeCategory === 'All picks' ? 'Today’s top picks' : activeCategory}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All picks', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'].map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={`rounded-full px-3 py-2 text-[11px] font-bold transition sm:px-4 sm:text-xs ${activeCategory === category ? 'bg-[#252525] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <article
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  key={product.id}
                >
                  <div className="relative aspect-[1.2/1] overflow-hidden bg-gray-100">
                    <img
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      src={product.image}
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-[#fff1e2] px-2 py-1 text-[10px] font-extrabold text-[#d66b06]">
                      {product.badge}
                    </span>
                    <button
                      aria-label={`Add ${product.name} to cart`}
                      className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-medium text-[#252525] shadow-md transition hover:bg-[#f68b1e] hover:text-white"
                      onClick={() => addToCart(product.name)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      {product.category}
                    </p>
                    <h3 className="mt-1.5 min-h-10 text-sm font-semibold leading-5 text-[#333]">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-xs text-[#e99118]">
                      <span aria-label={`${product.rating} out of 5 stars`}>★</span>
                      <span className="font-semibold text-gray-500">{product.rating}</span>
                      <span className="ml-auto text-gray-400">({product.id * 12 + 8})</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-base font-extrabold sm:text-lg">
                        KSh {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        KSh {product.oldPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white px-6 py-14 text-center shadow-sm">
              <span className="text-4xl">🔎</span>
              <h3 className="mt-4 text-lg font-bold">No finds just yet</h3>
              <p className="mt-1 text-sm text-gray-500">Try another search or browse all of today&apos;s picks.</p>
              <button
                className="mt-5 rounded-lg bg-[#f68b1e] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#df7410]"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All picks')
                }}
                type="button"
              >
                Show all picks
              </button>
            </div>
          )}
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4" id="cart-info">
          {[
            { icon: '🚚', title: 'Delivery that works for you', copy: 'Convenient delivery, right to your door.' },
            { icon: '🔒', title: 'Shop with confidence', copy: 'Secure checkout for peace of mind.' },
            { icon: '💬', title: 'Here when you need us', copy: 'Friendly help for your shopping questions.' },
          ].map((item) => (
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm sm:p-5" key={item.title}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3e5] text-xl">
                {item.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">{item.copy}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-[#202b28] text-white" id="footer">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] md:py-12">
          <div>
            <a aria-label="Jumia home" className="inline-block" href="#">
              <JumiaLogo className="h-6 w-[138px]" light />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
              Good finds for real life. Discover something lovely, useful, or just a little bit you.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold">Your shopping, sorted</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li><a className="hover:text-white" href="#top-picks">Today&apos;s top picks</a></li>
              <li><a className="hover:text-white" href="#top-picks">Browse categories</a></li>
              <li id="cart-summary">Your cart: {cartCount} {cartCount === 1 ? 'item' : 'items'}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold">Stay in the know</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              New finds, lovely prices, and a little inspiration — all in one place.
            </p>
            <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ffad58] hover:text-white" href="#top-picks">
              Find your next favorite <Icon className="h-4 w-4" name="arrow" />
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/45">
          © {copyrightYear} Jumia. Happy finding.
        </div>
      </footer>

      <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
        {notice && (
          <p className="flex items-center gap-2 rounded-lg bg-[#202b28] px-4 py-3 text-sm font-semibold text-white shadow-xl">
            <Icon className="h-4 w-4 text-[#ffad58]" name="check" />
            {notice}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
