import { Link } from "react-router";
import { TbStarFilled } from "react-icons/tb";
import type { Product } from "../../types/product";
import {
  BADGE_META,
  formatPrice,
  headlineSpec,
  savingsPct,
} from "../../lib/productMeta";

/**
 * The catalogue card: every field — pricing, savings, social proof, the
 * one-line spec — is derived from the product so cards never drift. Reused by
 * the product listing and the home highlights grid.
 */
const ProductCard = ({ product }: { product: Product }) => {
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

        {!product.inStock && (
          <span className="absolute top-3 right-3 inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold text-ink-muted bg-surface-3">
            Out of stock
          </span>
        )}

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

export default ProductCard;
