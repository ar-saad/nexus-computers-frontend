import { useState, useEffect, useCallback } from "react";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { TbFlame, TbSparkles, TbTag, TbBolt } from "react-icons/tb";
import heroImg from "../../assets/hero.png";

const SLIDES = [
  {
    badge: "New Arrival",
    BadgeIcon: TbSparkles,
    headline: "GeForce RTX 5090",
    subheadline: "The Monster GPU is Here",
    description:
      "Dominate 8K gaming and AI workloads with the most powerful consumer GPU ever built.",
    offer: "Starting from $1,299",
    cta: "Shop Graphics Cards",
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)",
    accent: "#a78bfa",
    badgeBg: "rgba(167,139,250,0.18)",
    badgeColor: "#c4b5fd",
  },
  {
    badge: "Best Seller",
    BadgeIcon: TbFlame,
    headline: "Ryzen 9 9950X",
    subheadline: "Dominate Every Workload",
    description:
      "16 cores, 5.7 GHz boost. The CPU pros trust for content creation and all-day gaming.",
    offer: "30% Off — Now $549",
    cta: "Shop Processors",
    bg: "linear-gradient(135deg, #1c0a00 0%, #7c2d12 50%, #1c1008 100%)",
    accent: "#fb923c",
    badgeBg: "rgba(251,146,60,0.18)",
    badgeColor: "#fdba74",
  },
  {
    badge: "Limited Stock",
    BadgeIcon: TbTag,
    headline: "ROG Zephyrus G16",
    subheadline: "Game Anywhere. Win Everywhere.",
    description:
      "RTX 5080 · 240 Hz OLED · 32 GB DDR5. The ultimate gaming laptop, redefined.",
    offer: "From $1,899",
    cta: "Shop Laptops",
    bg: "linear-gradient(135deg, #020617 0%, #0c4a6e 55%, #020c1b 100%)",
    accent: "#22d3ee",
    badgeBg: "rgba(34,211,238,0.14)",
    badgeColor: "#67e8f9",
  },
];

const SIDE_DEALS = [
  {
    tag: "Flash Deal",
    TagIcon: TbBolt,
    title: "Samsung 990 Pro 2TB",
    subtitle: "NVMe PCIe 4.0 SSD",
    badge: "40% OFF",
    bg: "#fffbeb",
    border: "#fde68a",
    tagBg: "#f59e0b",
    titleColor: "#78350f",
    subtitleColor: "#92400e",
    badgeColor: "#b45309",
    badgeBg: "#fef3c7",
  },
  {
    tag: "Just Dropped",
    TagIcon: TbSparkles,
    title: "Intel Arc B770",
    subtitle: "16 GB Battlemage GPU",
    badge: "In Stock",
    bg: "#eff6ff",
    border: "#bfdbfe",
    tagBg: "#2563eb",
    titleColor: "#1e3a8a",
    subtitleColor: "#1d4ed8",
    badgeColor: "#1d4ed8",
    badgeBg: "#dbeafe",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((index + SLIDES.length) % SLIDES.length);
        setAnimating(false);
      }, 250);
    },
    [animating],
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 4500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = SLIDES[current];

  return (
    <section className="w-full bg-[#f5f5f7] px-4 py-4 lg:px-8 lg:py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
        {/* Main carousel banner */}
        <div
          className="relative rounded-2xl overflow-hidden h-[340px] lg:h-[420px] flex items-center"
          style={{ background: slide.bg, transition: "background 0.5s ease" }}
        >
          {/* Slide content */}
          <div
            className="relative z-10 flex flex-col lg:flex-row items-center w-full h-full px-8 lg:px-12 py-8 gap-6"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {/* Left — text */}
            <div className="flex-1 flex flex-col gap-4">
              <span
                className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: slide.badgeBg,
                  color: slide.badgeColor,
                  border: `1px solid ${slide.badgeColor}40`,
                }}
              >
                <slide.BadgeIcon size={12} />
                {slide.badge}
              </span>

              <div>
                <h2
                  className="text-3xl lg:text-5xl font-black tracking-tight leading-tight"
                  style={{ color: slide.accent }}
                >
                  {slide.headline}
                </h2>
                <p className="text-white/90 text-lg lg:text-xl font-semibold mt-1">
                  {slide.subheadline}
                </p>
              </div>

              <p className="text-white/60 text-sm leading-relaxed max-w-xs hidden lg:block">
                {slide.description}
              </p>

              <div className="flex items-center gap-4 mt-1">
                <span className="text-white font-bold text-base lg:text-lg">
                  {slide.offer}
                </span>
              </div>

              <button
                className="flex items-center gap-2 self-start px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:gap-3"
                style={{ background: slide.accent + "cc" }}
              >
                {slide.cta}
                <HiArrowRight size={16} />
              </button>
            </div>

            {/* Right — product image */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: slide.accent }}
              />
              <img
                src={heroImg}
                alt={slide.headline}
                className="relative w-44 lg:w-64 drop-shadow-2xl"
                style={{ filter: `drop-shadow(0 0 40px ${slide.accent}60)` }}
              />
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          >
            <HiChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          >
            <HiChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  background: i === current ? slide.accent : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Side deal cards */}
        <div className="flex lg:flex-col gap-3">
          {SIDE_DEALS.map(({ tag, TagIcon, title, subtitle, badge, bg, border, tagBg, titleColor, subtitleColor, badgeColor, badgeBg }) => (
            <div
              key={title}
              className="flex-1 rounded-2xl p-5 flex flex-col justify-between cursor-pointer group transition-shadow duration-200 hover:shadow-md"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: tagBg }}
                >
                  <TagIcon size={11} />
                  {tag}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ color: badgeColor, background: badgeBg }}
                >
                  {badge}
                </span>
              </div>

              <div>
                <p className="font-black text-base leading-snug" style={{ color: titleColor }}>
                  {title}
                </p>
                <p className="text-sm mt-0.5" style={{ color: subtitleColor }}>
                  {subtitle}
                </p>
              </div>

              <button
                className="mt-4 flex items-center gap-1 text-xs font-semibold transition-gap duration-200 group-hover:gap-2"
                style={{ color: titleColor }}
              >
                Shop Now <HiArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
