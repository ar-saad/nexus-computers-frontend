import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import { TbMoodEmpty } from "react-icons/tb";
import type { ProductCategory } from "../types/product";
import {
  DEFAULT_FILTERS,
  filterAndSort,
  getBrands,
  getPriceBounds,
  type ProductFilterState,
  type SortOption,
} from "../data/products";
import { CATEGORY_LABELS } from "../lib/productMeta";
import ProductCard from "../components/products/ProductCard";
import ProductFilters from "../components/products/ProductFilters";

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "name-asc", label: "Name: A–Z" },
];

const isCategory = (v: string): v is ProductCategory =>
  (VALID_CATEGORIES as string[]).includes(v);

const isSort = (v: string | null): v is SortOption =>
  SORT_OPTIONS.some((o) => o.value === v);

/** URL search params are the single source of truth for filter state. */
const parseFilters = (params: URLSearchParams): ProductFilterState => {
  const min = params.get("minPrice");
  const max = params.get("maxPrice");
  const sort = params.get("sort");

  return {
    categories: (params.get("category")?.split(",") ?? []).filter(isCategory),
    brands: (params.get("brand")?.split(",") ?? []).filter(Boolean),
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
    inStockOnly: params.get("inStock") === "1",
    sort: isSort(sort) ? sort : "featured",
  };
};

/** Serialise back to params, omitting defaults to keep URLs clean. */
const toParams = (state: ProductFilterState): Record<string, string> => {
  const params: Record<string, string> = {};
  if (state.categories.length) params.category = state.categories.join(",");
  if (state.brands.length) params.brand = state.brands.join(",");
  if (state.minPrice != null) params.minPrice = String(state.minPrice);
  if (state.maxPrice != null) params.maxPrice = String(state.maxPrice);
  if (state.inStockOnly) params.inStock = "1";
  if (state.sort !== "featured") params.sort = state.sort;
  return params;
};

const countActive = (state: ProductFilterState): number =>
  state.categories.length +
  state.brands.length +
  (state.minPrice != null || state.maxPrice != null ? 1 : 0) +
  (state.inStockOnly ? 1 : 0);

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const state = useMemo(() => parseFilters(searchParams), [searchParams]);
  const priceBounds = useMemo(() => getPriceBounds(), []);
  const brands = useMemo(() => getBrands(state.categories), [state.categories]);
  const results = useMemo(() => filterAndSort(state), [state]);
  const activeCount = countActive(state);

  // Lock body scroll while the mobile filter drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const update = (patch: Partial<ProductFilterState>) =>
    setSearchParams(toParams({ ...state, ...patch }), { replace: true });

  const clear = () =>
    setSearchParams(toParams({ ...DEFAULT_FILTERS, sort: state.sort }), {
      replace: true,
    });

  const heading =
    state.categories.length === 1
      ? CATEGORY_LABELS[state.categories[0]]
      : "All Products";

  return (
    <section className="w-full px-4 py-8 lg:px-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="text-ink text-2xl lg:text-3xl font-black tracking-tight">
            {heading}
          </h1>
          <p className="text-ink-muted text-sm font-medium mt-1.5">
            {results.length} {results.length === 1 ? "product" : "products"}{" "}
            available
          </p>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar (desktop) ───────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl bg-white border border-border px-5 py-3">
              <ProductFilters
                state={state}
                brands={brands}
                priceBounds={priceBounds}
                activeCount={activeCount}
                onChange={update}
                onClear={clear}
              />
            </div>
          </aside>

          {/* ── Main column ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-white text-sm font-bold text-ink-2 hover:border-brand transition-colors duration-150"
              >
                <HiAdjustmentsHorizontal size={18} />
                Filters
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-brand text-white text-[11px] font-black">
                    {activeCount}
                  </span>
                )}
              </button>

              <label className="ml-auto flex items-center gap-2 text-sm">
                <span className="hidden sm:inline text-ink-muted font-medium">
                  Sort by
                </span>
                <select
                  value={state.sort}
                  onChange={(e) =>
                    update({ sort: e.target.value as SortOption })
                  }
                  className="h-10 rounded-xl border border-border bg-white px-3 pr-8 text-sm font-semibold text-ink-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand-light cursor-pointer transition-all duration-150"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Grid / empty state */}
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border bg-surface-2 py-20 px-6">
                <TbMoodEmpty size={40} className="text-ink-muted" />
                <p className="text-ink font-bold mt-4">No products match</p>
                <p className="text-ink-muted text-sm font-medium mt-1">
                  Try removing a filter or two to see more.
                </p>
                {activeCount > 0 && (
                  <button
                    onClick={clear}
                    className="mt-5 inline-flex items-center h-10 px-5 rounded-xl bg-brand text-white text-sm font-bold hover:bg-brand-hover transition-colors duration-150"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-white shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <h2 className="text-ink font-black text-base">Filters</h2>
            {activeCount > 0 && (
              <button
                onClick={clear}
                className="text-xs font-bold text-brand hover:underline"
              >
                Clear all ({activeCount})
              </button>
            )}
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:bg-surface-2 transition-colors duration-150"
          >
            <HiXMark size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          <ProductFilters
            state={state}
            brands={brands}
            priceBounds={priceBounds}
            activeCount={activeCount}
            onChange={update}
            onClear={clear}
            showHeader={false}
          />
        </div>

        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full h-11 rounded-xl bg-brand text-white text-sm font-bold hover:bg-brand-hover transition-colors duration-150"
          >
            Show {results.length} {results.length === 1 ? "result" : "results"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
