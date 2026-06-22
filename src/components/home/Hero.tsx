import { useState, useEffect, useCallback } from "react";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {
  TbFlame,
  TbSparkles,
  TbTag,
  TbBolt,
  TbCheck,
  TbStarFilled,
  TbTruck,
  TbCreditCard,
  TbShieldCheck,
  TbHeadset,
} from "react-icons/tb";
import { products } from "../../data/products";
import type {
  Product,
  ProductBadge,
  ProductCategory,
} from "../../types/product";

/**
 * Merchandising is the only thing curated by hand here: a buyer picks which
 * products headline the homepage. Everything shown about them — copy, specs,
 * pricing, savings, social proof — is derived from the product data itself.
 */
const FEATURED_IDS = [
  "gpu-nvidia-rtx5090",
  "cpu-amd-ryzen9-9950x",
  "laptop-asus-rog-zephyrus-g16",
];
const PROMO_IDS = ["storage-samsung-990-pro-2tb", "gpu-amd-rx9070xt"];

// ── Derivation helpers ───────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  cpu: "Processors",
  gpu: "Graphics Cards",
  ram: "Memory",
  motherboard: "Motherboards",
  storage: "Storage",
  laptop: "Laptops",
};

const BADGE_META: Record<ProductBadge, { label: string; Icon: IconComponent }> =
  {
    new: { label: "New Arrival", Icon: TbSparkles },
    bestseller: { label: "Best Seller", Icon: TbFlame },
    deal: { label: "Hot Deal", Icon: TbTag },
    limited: { label: "Limited Stock", Icon: TbBolt },
    sale: { label: "On Sale", Icon: TbTag },
  };

const byId = (id: string) => products.find((p) => p.id === id)!;

const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

const savingsPct = (price: number, original?: number) =>
  original ? Math.round((1 - price / original) * 100) : null;

/** Pull the three headline specs for a product straight from its typed specs. */
const specHighlights = (product: Product): string[] => {
  switch (product.category) {
    case "cpu": {
      const s = product.specs;
      return [
        `${s.cores} Cores / ${s.threads} Threads`,
        `${s.boostClock} Boost`,
        `${s.socket} · ${s.architecture}`,
      ];
    }
    case "gpu": {
      const s = product.specs;
      const shaders = s.cudaCores
        ? `${s.cudaCores.toLocaleString()} CUDA Cores`
        : `${(s.streamProcessors ?? 0).toLocaleString()} Stream Processors`;
      return [s.vram, shaders, s.pciSlot];
    }
    case "ram": {
      const s = product.specs;
      return [`${s.capacity} ${s.type}`, s.speed, `${s.latency} Latency`];
    }
    case "motherboard": {
      const s = product.specs;
      return [`${s.chipset} Chipset`, `${s.socket} Socket`, s.formFactor];
    }
    case "storage": {
      const s = product.specs;
      return [`${s.capacity} ${s.type}`, `${s.readSpeed} Read`, s.interface];
    }
    case "laptop": {
      const s = product.specs;
      return [s.display, s.gpu, s.ram];
    }
  }
};

const TRUST = [
  { Icon: TbTruck, label: "Free 2-Day Shipping", sub: "On orders over $99" },
  { Icon: TbCreditCard, label: "0% APR Financing", sub: "Up to 24 months" },
  { Icon: TbShieldCheck, label: "2-Year Warranty", sub: "On all components" },
  { Icon: TbHeadset, label: "Expert Support", sub: "7 days a week" },
];

// ── Small presentational pieces ──────────────────────────────────────────────

const Rating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1.5">
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <TbStarFilled
          key={i}
          size={14}
          className={i < Math.round(rating) ? "text-amber-400" : "text-border"}
        />
      ))}
    </span>
    <span className="text-sm font-bold text-ink-2">{rating.toFixed(1)}</span>
    <span className="text-sm text-ink-muted">
      ({count.toLocaleString()} reviews)
    </span>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  const featured = FEATURED_IDS.map(byId);
  const promos = PROMO_IDS.map(byId);

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((index + featured.length) % featured.length);
        setAnimating(false);
      }, 250);
    },
    [animating, featured.length],
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const product = featured[current];
  const pct = savingsPct(product.price, product.originalPrice);
  const badge = product.badge ? BADGE_META[product.badge] : null;
  const heroImage = product.images?.[0];

  return (
    <section className="w-full bg-surface-2 px-4 py-4 lg:px-8 lg:py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
        {/* ── Featured carousel ─────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden bg-white border border-border min-h-95 lg:min-h-110">
          {/* Brand-tinted wash behind the product shot */}
          <div
            className="absolute right-0 top-0 h-full w-2/3 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 75% 45%, var(--color-brand-light) 0%, transparent 70%)",
            }}
          />

          <div
            className="relative z-10 flex items-center h-full px-7 lg:px-15 gap-6 lg:gap-10"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {/* Left — copy */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              {badge && (
                <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-light text-brand">
                  <badge.Icon size={12} />
                  {badge.label}
                </span>
              )}

              <div>
                <p className="text-ink-muted text-xs font-bold uppercase tracking-[0.18em]">
                  {product.brand}
                </p>
                <h2 className="text-ink text-3xl lg:text-[2.6rem] font-black tracking-tight leading-[1.05] mt-1">
                  {product.name}
                </h2>
                <p className="text-ink-2 text-sm lg:text-base font-medium leading-snug mt-2 max-w-md">
                  {product.description}
                </p>
              </div>

              {/* Spec highlights, straight from product.specs */}
              <div className="hidden lg:flex flex-wrap gap-2">
                {specHighlights(product).map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-2 text-ink-2 border border-border"
                  >
                    <TbCheck size={12} className="text-brand" />
                    {h}
                  </span>
                ))}
              </div>

              <Rating rating={product.rating} count={product.reviewCount} />

              {/* Price + savings */}
              <div className="flex items-center gap-3">
                <span className="text-ink font-black text-3xl tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-ink-muted text-base line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {pct && (
                  <span className="text-xs font-black px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100">
                    Save {pct}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-1">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-brand hover:bg-brand-hover hover:gap-3 active:scale-95 transition-all duration-200">
                  Shop {CATEGORY_LABEL[product.category]}
                  <HiArrowRight size={16} />
                </button>
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                  <TbTruck size={15} />
                  Free 2-day shipping
                </span>
              </div>
            </div>

            {/* Right — product shot */}
            <div className="hidden lg:flex w-64 xl:w-72 shrink-0 items-center justify-center">
              {heroImage && (
                <img
                  src={heroImage}
                  alt={product.name}
                  className="w-full object-contain"
                  style={{
                    maxHeight: "340px",
                    filter: "drop-shadow(0 18px 40px rgba(109,40,217,0.18))",
                  }}
                />
              )}
            </div>
          </div>

          {/* Prev / Next */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-border flex items-center justify-center text-ink-2 hover:text-brand transition-colors duration-200"
          >
            <HiChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-border flex items-center justify-center text-ink-2 hover:text-brand transition-colors duration-200"
          >
            <HiChevronRight size={18} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {featured.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 6,
                  background: i === current ? "var(--color-brand)" : "#cbcbd6",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Promo tiles ───────────────────────────────────────────────── */}
        <div className="flex lg:flex-col gap-3">
          {promos.map((p) => {
            const s = savingsPct(p.price, p.originalPrice);
            const meta = p.badge ? BADGE_META[p.badge] : null;
            const thumb = p.images?.[0];

            return (
              <div
                key={p.id}
                className="flex-1 rounded-2xl bg-white border border-border p-4 flex flex-col cursor-pointer group hover:border-brand hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {meta && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-brand bg-brand-light">
                      <meta.Icon size={11} />
                      {meta.label}
                    </span>
                  )}
                  {s && (
                    <span className="text-[11px] font-black px-2 py-0.5 rounded bg-red-50 text-red-600">
                      Save {s}%
                    </span>
                  )}
                </div>

                {thumb && (
                  <div className="flex justify-center items-center my-3 h-20">
                    <img
                      src={thumb}
                      alt={p.name}
                      className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <p className="font-bold text-sm text-ink leading-snug line-clamp-2">
                  {p.name}
                </p>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-black text-base text-ink">
                    {formatPrice(p.price)}
                  </span>
                  {p.originalPrice && (
                    <span className="text-xs line-through text-ink-muted">
                      {formatPrice(p.originalPrice)}
                    </span>
                  )}
                </div>

                <button className="mt-auto pt-3 flex items-center gap-1 text-xs font-bold text-brand group-hover:gap-2 transition-all duration-200">
                  Shop now <HiArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Trust / service strip ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TRUST.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3"
          >
            <t.Icon size={22} className="text-brand shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-ink leading-tight">
                {t.label}
              </p>
              <p className="text-[11px] text-ink-muted leading-tight">
                {t.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
