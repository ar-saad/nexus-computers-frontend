import type { ProductCategory } from "../../types/product";
import type { ProductFilterState } from "../../data/products";
import { CATEGORY_LABELS } from "../../lib/productMeta";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

interface ProductFiltersProps {
  state: ProductFilterState;
  brands: string[];
  priceBounds: { min: number; max: number };
  activeCount: number;
  onChange: (patch: Partial<ProductFilterState>) => void;
  onClear: () => void;
  /** Hide the title/clear row when the surrounding chrome already provides it
   *  (e.g. the mobile drawer header). Defaults to true. */
  showHeader?: boolean;
}

const toggle = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-border text-brand accent-brand cursor-pointer"
    />
    <span className="text-sm font-medium text-ink-2 group-hover:text-ink transition-colors duration-150">
      {label}
    </span>
  </label>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="py-5 border-b border-border last:border-b-0">
    <h3 className="text-[11px] font-black text-ink-muted uppercase tracking-widest mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const ProductFilters = ({
  state,
  brands,
  priceBounds,
  activeCount,
  onChange,
  onClear,
  showHeader = true,
}: ProductFiltersProps) => {
  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <h2 className="text-ink font-black text-base">Filters</h2>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs font-bold text-brand hover:underline"
            >
              Clear all ({activeCount})
            </button>
          )}
        </div>
      )}

      {/* ── Category ────────────────────────────────────────────────────── */}
      <Section title="Category">
        {ALL_CATEGORIES.map((category) => (
          <Checkbox
            key={category}
            label={CATEGORY_LABELS[category]}
            checked={state.categories.includes(category)}
            onChange={() =>
              onChange({ categories: toggle(state.categories, category) })
            }
          />
        ))}
      </Section>

      {/* ── Brand ───────────────────────────────────────────────────────── */}
      <Section title="Brand">
        {brands.length === 0 ? (
          <p className="text-xs text-ink-muted">No brands available.</p>
        ) : (
          brands.map((brand) => (
            <Checkbox
              key={brand}
              label={brand}
              checked={state.brands.includes(brand)}
              onChange={() => onChange({ brands: toggle(state.brands, brand) })}
            />
          ))
        )}
      </Section>

      {/* ── Price ───────────────────────────────────────────────────────── */}
      <Section title="Price range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder={`$${priceBounds.min}`}
            value={state.minPrice ?? ""}
            onChange={(e) =>
              onChange({
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-lg border border-border bg-surface-2 px-3 h-9 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-light focus:bg-white transition-all duration-150"
          />
          <span className="text-ink-muted text-sm">–</span>
          <input
            type="number"
            inputMode="numeric"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder={`$${priceBounds.max}`}
            value={state.maxPrice ?? ""}
            onChange={(e) =>
              onChange({
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-lg border border-border bg-surface-2 px-3 h-9 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-light focus:bg-white transition-all duration-150"
          />
        </div>
      </Section>

      {/* ── Availability ────────────────────────────────────────────────── */}
      <Section title="Availability">
        <Checkbox
          label="In stock only"
          checked={state.inStockOnly}
          onChange={() => onChange({ inStockOnly: !state.inStockOnly })}
        />
      </Section>
    </div>
  );
};

export default ProductFilters;
