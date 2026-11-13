
import { useState } from 'react'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import {
  ArrowUpRight,
  ArrowRight,
  Lightbulb,
  Play,
  Clock3,
  Headphones,
  Video,
  Layers3,
} from 'lucide-react'
import {
  siYoutube,
  siSpotify,
  siTiktok,
  siInstagram,
} from 'simple-icons'

const PLATFORMS = {
  ALL: 'all',
  YOUTUBE: 'youtube',
  SPOTIFY: 'spotify',
  TIKTOK: 'tiktok',
  INSTAGRAM: 'instagram',
}

const platformConfig = {
  youtube: { label: 'YouTube', icon: siYoutube },
  spotify: { label: 'Spotify', icon: siSpotify },
  tiktok: { label: 'TikTok', icon: siTiktok },
  instagram: { label: 'Instagram', icon: siInstagram },
}

const platformUrls = {
  youtube: 'https://youtube.com/@julianaedeonuh',
  spotify: 'https://spotify.com',
  tiktok: 'https://tiktok.com',
  instagram: 'https://instagram.com',
}

const mediaCards = [
  {
    id: 1,
    title: 'Navigating Capital Allocation & Cash Flow in High-Growth Ventures',
    snippet:
      'Strategic frameworks for balancing working capital, maintaining operational liquidity, and driving sustainable enterprise growth.',
    platform: PLATFORMS.YOUTUBE,
    category: 'Financial Strategy',
    metaText: '8 min watch',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    url: platformUrls.youtube,
    ctaText: 'Watch on YouTube',
  },
  {
    id: 2,
    title: 'The CFO Advisory Podcast: Institutional Governance & Risk Mitigation',
    snippet:
      'An audio deep-dive into how aligning corporate profitability with institutional integrity creates long-term enterprise value.',
    platform: PLATFORMS.SPOTIFY,
    category: 'Executive Podcast',
    metaText: '24 min listen',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    url: platformUrls.spotify,
    ctaText: 'Listen on Spotify',
  },
  {
    id: 3,
    title: '3 Executive Rules for Financial Discipline in Startup Scaling',
    snippet:
      'A concise breakdown of working capital mistakes every founder should avoid when preparing for institutional audits.',
    platform: PLATFORMS.TIKTOK,
    category: 'Quick Insights',
    metaText: '60 sec reel',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    url: platformUrls.tiktok,
    ctaText: 'Watch on TikTok',
  },
  {
    id: 4,
    title: 'Behind the Strategy: Boardroom Advisory & Leadership Moments',
    snippet:
      'Visual notes and practical takeaways from executive roundtables and healthcare governance workshops.',
    platform: PLATFORMS.INSTAGRAM,
    category: 'Leadership Notes',
    metaText: 'Carousel post',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    url: platformUrls.instagram,
    ctaText: 'View on Instagram',
  },
]

const BrandIcon = ({ icon, size = 16, className = '' }) => (
  <svg
    role="img"
    aria-label={icon.title}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    focusable="false"
  >
    <path d={icon.path} />
  </svg>
)

const Insights = () => {
  const [activeTab, setActiveTab] = useState(PLATFORMS.ALL)

  const tabs = [
    { id: PLATFORMS.ALL, label: 'All insights' },
    { id: PLATFORMS.YOUTUBE, label: 'YouTube' },
    { id: PLATFORMS.SPOTIFY, label: 'Spotify' },
    { id: PLATFORMS.TIKTOK, label: 'TikTok' },
    { id: PLATFORMS.INSTAGRAM, label: 'Instagram' },
  ]

  const filteredCards =
    activeTab === PLATFORMS.ALL
      ? mediaCards
      : mediaCards.filter((card) => card.platform === activeTab)

  const featuredCard = filteredCards[0]
  const supportingCards = filteredCards.slice(1)

  const renderPlatform = (platform) => {
    const key = Object.keys(PLATFORMS).find(
      (item) => PLATFORMS[item] === platform,
    )
    const config = platformConfig[key?.toLowerCase()]

    if (!config) return null

    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-wide text-[#29221D] shadow-sm backdrop-blur-md">
        <BrandIcon icon={config.icon} size={13} />
        {config.label}
      </span>
    )
  }

  const renderActionIcon = (platform) => {
    if (platform === PLATFORMS.SPOTIFY) return <Headphones size={18} />
    if (platform === PLATFORMS.TIKTOK) return <Video size={18} />
    if (platform === PLATFORMS.INSTAGRAM) return <Layers3 size={18} />
    return <Play size={17} fill="currentColor" />
  }

  const renderCardLink = (card, children, className = '') => (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )

  const renderFeaturedCard = (card) => (
    <article
      key={card.id}
      className="group grid min-w-0 overflow-hidden rounded-[24px] border border-[#E6D9CA] bg-[#FDFBF7] lg:grid-cols-[1.08fr_0.92fr] dark:border-white/10 dark:bg-[#191715]"
    >
      {renderCardLink(
        card,
        <>
          <div className="relative h-full min-h-[280px] overflow-hidden bg-[#E7DCCE] sm:min-h-[360px] lg:min-h-[350px] dark:bg-[#211E1B]">
            <img
              src={card.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C140F]/65 via-[#1C140F]/5 to-[#1C140F]/10" />
            <div className="absolute left-5 top-5">
              {renderPlatform(card.platform)}
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-xs font-medium text-white">
              <Clock3 size={14} />
              {card.metaText}
            </div>
            <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDFBF7] text-[#241B15] shadow-lg transition-colors group-hover:bg-[#A18166] group-hover:text-white dark:bg-[#211E1B] dark:text-[#F5F0E9]">
              {renderActionIcon(card.platform)}
            </span>
          </div>
        </>,
        'block min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8C6D58]',
      )}

      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10 xl:p-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C6D58] dark:text-[#B18B70]">
            Featured perspective
          </span>
          <span className="h-px flex-1 bg-[#E4D6C6] dark:bg-white/10" />
          <span className="font-serif text-sm italic text-[#A18166] dark:text-[#B18B70]">01</span>
        </div>

        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A7B61] dark:text-[#B18B70]">
          {card.category}
        </div>

        <h3 className="font-sans-serif text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#241B15] sm:text-4xl xl:text-[35px] dark:text-[#F5F0E9]">
          {card.title}
        </h3>

        <p className="mt-5 max-w-lg text-sm leading-7 text-[#756457] sm:text-base sm:leading-8 dark:text-[#B8ADA1]">
          {card.snippet}
        </p>

        <div className="mt-8 border-t border-[#E9DFD4] pt-5 dark:border-white/10">
          {renderCardLink(
            card,
            <>
              <span>{card.ctaText}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCCBB9] transition-all group-hover:border-[#241B15] group-hover:bg-[#241B15] group-hover:text-white">
                <ArrowUpRight size={18} />
              </span>
            </>,
            'flex items-center justify-between gap-4 text-sm font-semibold text-[#35271E] dark:text-[#F5F0E9]',
          )}
        </div>
      </div>
    </article>
  )

  const renderSupportingCard = (card) => (
    <article
      key={card.id}
      className="group flex min-w-0 flex-col border-t border-[#DCCDBD] pt-5 dark:border-white/10"
    >
      {renderCardLink(
        card,
        <>
          <div className="relative aspect-[1.65/1] overflow-hidden rounded-[16px] bg-[#E7DCCE] dark:bg-[#211E1B]">
            <img
              src={card.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C140F]/40 to-transparent" />
            <div className="absolute left-3 top-3">
              {renderPlatform(card.platform)}
            </div>
            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#FDFBF7] text-[#241B15] transition-colors group-hover:bg-[#A18166] group-hover:text-white dark:bg-[#211E1B] dark:text-[#F5F0E9]">
              {renderActionIcon(card.platform)}
            </span>
          </div>
        </>,
        'block overflow-hidden rounded-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D58]',
      )}

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94765E] dark:text-[#B18B70]">
            {card.category}
          </span>
          <span className="text-[10px] text-[#8A7868] dark:text-[#B8ADA1]">{card.metaText}</span>
        </div>

        <h3 className="font-sans-serif text-xl leading-snug tracking-[-0.025em] text-[#241B15] transition-colors group-hover:text-[#8C6D58] sm:text-2xl dark:text-[#F5F0E9] dark:group-hover:text-[#B18B70]">
          {renderCardLink(card, card.title, 'outline-none focus-visible:underline')}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-[#756457] dark:text-[#B8ADA1]">
          {card.snippet}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#E7DCCF] pt-4 text-xs font-semibold text-[#35271E] dark:border-white/10 dark:text-[#F5F0E9]">
          <span>{card.ctaText}</span>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </article>
  )

  return (
    <section
      aria-labelledby="insights-title"
      className="relative overflow-hidden border-y border-[#EADFCF] bg-[#F7F4EE] py-20 sm:py-24 lg:py-28 dark:border-white/10 dark:bg-[#11100F]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#D9C7B0]/20 blur-[100px] dark:bg-[#B18B70]/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#B8A18B]/15 blur-[100px] dark:bg-[#8C6D58]/[0.08]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 grid items-end gap-8 lg:mb-16 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C6D58] sm:text-[11px] dark:text-[#B18B70]">
              <Lightbulb size={15} strokeWidth={1.7} />
              <span>Ideas. Perspective. Impact.</span>
              <span className="ml-1 h-px w-8 bg-[#B9A28E] dark:bg-[#B18B70]/50" />
            </div>

            <h2
              id="insights-title"
              className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#201813] sm:text-5xl lg:text-[64px] dark:text-[#F5F0E9]"
            >
              Strategic insights,
              <br />
                <span className="font-serif font-normal italic text-[#98765D] dark:text-[#B18B70]">
                beyond the boardroom.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#6A5A4D] sm:text-base sm:leading-8 dark:text-[#B8ADA1]">
              Perspectives on financial leadership, governance, business growth
              and the decisions that shape resilient organisations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {Object.entries(platformConfig).map(([key, platform]) => (
              <a
                key={key}
                href={platformUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform.label}`}
                title={platform.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D8C9] bg-[#FDFBF7] text-[#59483B] transition-all duration-300 hover:-translate-y-1 hover:border-[#8C6D58] hover:bg-[#211913] hover:text-white dark:border-white/10 dark:bg-[#191715] dark:text-[#B8ADA1] dark:hover:border-[#B18B70]"
              >
                <BrandIcon icon={platform.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-[#E3D8CA] py-4 dark:border-white/10">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter insights by platform"
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id
              const config = Object.keys(PLATFORMS).find(
                (key) => PLATFORMS[key] === tab.id,
              )
              const platform = platformConfig[config?.toLowerCase()]

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
                    selected
                      ? 'border-[#241B15] bg-[#241B15] text-white dark:border-[#B18B70] dark:bg-[#B18B70] dark:text-[#11100F]'
                      : 'border-transparent text-[#746355] hover:border-[#DCCBB9] hover:bg-white/70 hover:text-[#241B15] dark:text-[#B8ADA1] dark:hover:border-white/10 dark:hover:bg-[#191715] dark:hover:text-[#F5F0E9]'
                  }`}
                >
                  {platform && <BrandIcon icon={platform.icon} size={14} />}
                  {tab.label}
                </button>
              )
            })}
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A7868] dark:text-[#B8ADA1]">
            {String(filteredCards.length).padStart(2, '0')} publications
          </span>
        </div>

        {featuredCard && (
          <div className="space-y-12 sm:space-y-14 lg:space-y-16">
            {renderFeaturedCard(featuredCard)}

            {supportingCards.length > 0 && (
              <div>
                <div className="mb-7 flex items-center gap-4">
                  <h3 className="font-serif text-2xl italic text-[#35271E] dark:text-[#F5F0E9]">
                    More perspectives
                  </h3>
                  <span className="h-px flex-1 bg-[#DCCDBD] dark:bg-white/10" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A7868] dark:text-[#B8ADA1]">
                    {String(supportingCards.length).padStart(2, '0')} stories
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                  {supportingCards.map((card, index) =>
                    renderSupportingCard(card, index),
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative mt-16 overflow-hidden rounded-[24px] bg-[#211913] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10 dark:bg-[#191715] dark:border dark:border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-36 h-72 w-72 rounded-full border border-white/[0.07]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-24 h-56 w-56 rounded-full border border-white/[0.07]"
          />

          <div className="relative max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8AD93] dark:text-[#B18B70]">
              <Lightbulb size={14} />
              Stay connected
            </div>

            <h3 className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
              Insight that moves
              <span className="font-serif italic text-[#C8AD93] dark:text-[#B18B70]">
                {' '}business forward.
              </span>
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#D0C3B7] dark:text-[#B8ADA1]">
              Follow the conversation for fresh perspectives on finance,
              leadership and sustainable enterprise growth.
            </p>
          </div>

          <div className="relative mt-6 flex shrink-0 flex-wrap gap-3 lg:mt-0">
            <a
              href={platformUrls.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FDFBF7] px-5 py-3 text-xs font-bold text-[#241B15] transition-colors hover:bg-[#E6D6C4]"
            >
              <BrandIcon icon={siYoutube} size={15} />
              Follow the insights
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Insights
