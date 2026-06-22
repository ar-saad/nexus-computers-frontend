import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import {
  TbFlame,
  TbSparkles,
  TbTag,
  TbBolt,
  TbStarFilled,
} from "react-icons/tb";
import { products } from "../../data/products";
import type { Product, ProductBadge } from "../../types/product";

/**
 * Merchandising is the only hand-picked part: a buyer chooses which products
 * headline the grid. Everything rendered — pricing, savings, social proof, the
 * one-line spec — is derived from the product data so the cards never drift.
 */
const HIGHLIGHT_IDS = [
  "gpu-nvidia-rtx5090",
  "cpu-amd-ryzen9-9950x",
  "laptop-asus-rog-zephyrus-g16",
  "storage-samsung-990-pro-2tb",
  "mobo-asus-rog-crosshair-x870e",
  "gpu-amd-rx9070xt",
  "cpu-intel-i9-14900k",
  "ram-gskill-tridentz5-32gb",
  "mobo-msi-mag-b650-tomahawk",
  "laptop-lenovo-legion-7i",
];

// ── Derivation helpers ───────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const BADGE_META: Record<ProductBadge, { label: string; Icon: IconComponent }> =
  {
    new: { label: "New", Icon: TbSparkles },
    bestseller: { label: "Best Seller", Icon: TbFlame },
    deal: { label: "Hot Deal", Icon: TbTag },
    limited: { label: "Limited", Icon: TbBolt },
    sale: { label: "On Sale", Icon: TbTag },
  };

const byId = (id: string) => products.find((p) => p.id === id)!;

const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

const savingsPct = (price: number, original?: number) =>
  original ? Math.round((1 - price / original) * 100) : null;

/** A single headline spec line, pulled straight from the typed specs. */
const headlineSpec = (product: Product): string => {
  switch (product.category) {
    case "cpu":
      return `${product.specs.cores} Cores · ${product.specs.boostClock} Boost`;
    case "gpu":
      return `${product.specs.vram} · ${product.specs.boostClock} Boost`;
    case "ram":
      return `${product.specs.capacity} ${product.specs.type} · ${product.specs.speed}`;
    case "motherboard":
      return `${product.specs.chipset} · ${product.specs.socket} Socket`;
    case "storage":
      return `${product.specs.capacity} ${product.specs.type} · ${product.specs.readSpeed} Read`;
    case "laptop":
      return `${product.specs.cpu} · ${product.specs.gpu}`;
  }
};

// ── Card ─────────────────────────────────────────────────────────────────────

const HighlightCard = ({ product }: { product: Product }) => {
  const pct = savingsPct(product.price, product.originalPrice);
  const badge = product.badge ? BADGE_META[product.badge] : null;
  const image = product.images?.[0];

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl bg-white border border-border overflow-hidden hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* ── Image ─────────────────────────────────────────────────────── */}
      <div className="relative bg-surface-2 aspect-square flex items-center justify-center p-5">
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-brand bg-brand-light">
              <badge.Icon size={11} />
              {badge.label}
            </span>
          )}
          {pct && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-black text-red-600 bg-red-50">
              Save {pct}%
            </span>
          )}
        </div>

        {image && (
          <img
            src={image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-ink-muted text-[11px] font-bold uppercase tracking-[0.14em]">
          {product.brand}
        </p>
        <h3 className="text-ink font-bold text-sm leading-snug mt-0.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-ink-muted text-xs font-medium mt-1.5 line-clamp-1">
          {headlineSpec(product)}
        </p>

        <div className="flex items-center gap-1.5 mt-2">
          <TbStarFilled size={13} className="text-amber-400" />
          <span className="text-xs font-bold text-ink-2">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-ink-muted">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-auto pt-3">
          <span className="text-ink font-black text-lg tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-ink-muted text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────

const HighlightProducts = () => {
  const highlights = HIGHLIGHT_IDS.map(byId);

  return (
    <section className="w-full px-4 py-10 lg:px-8 lg:py-14">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-ink text-2xl lg:text-3xl font-black tracking-tight">
              Top Products
            </h2>
            <p className="text-ink-muted text-sm font-medium mt-1.5">
              Our highest-rated gear, picked by the people who build with it.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5 transition-all duration-200 shrink-0"
          >
            View all
            <HiArrowRight size={15} />
          </Link>
        </div>

        {/* ── Product cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {highlights.map((product) => (
            <HighlightCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightProducts;
