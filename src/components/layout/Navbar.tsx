import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import {
  HiMagnifyingGlass,
  HiShoppingCart,
  HiUser,
  HiBars3,
  HiXMark,
  HiChevronDown,
} from "react-icons/hi2";
import { TbFlame } from "react-icons/tb";

const NAV_LINKS = [
  { label: "CPUs", href: "/products?category=cpu" },
  { label: "GPUs", href: "/products?category=gpu" },
  { label: "Memory", href: "/products?category=ram" },
  { label: "Motherboards", href: "/products?category=motherboard" },
  { label: "Storage", href: "/products?category=storage" },
  { label: "Laptops", href: "/products?category=laptop" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* ── Top strip ─────────────────────────────────────────────────────── */}
        <div className="bg-brand text-white text-[11px] font-semibold text-center py-1.5 tracking-wide">
          Free shipping on orders over $99 &nbsp;·&nbsp; Up to 24-month
          financing available
        </div>

        {/* ── Main navbar ───────────────────────────────────────────────────── */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/logo.png"
                alt="Nexus Computers"
                className="hidden sm:block h-12 w-auto"
              />
              <img
                src="/icon.png"
                alt="Nexus Computers"
                className="sm:hidden h-9 w-auto"
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? "text-brand bg-[#ede9fe]"
                        : "text-ink-2 hover:text-brand hover:bg-surface-2"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/deals"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-150 ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  }`
                }
              >
                <TbFlame size={15} />
                Deals
              </NavLink>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search bar — desktop */}
            <div
              className={`hidden lg:flex items-center gap-2 border rounded-xl px-3 h-10 transition-all duration-200 bg-surface-2 ${
                searchOpen
                  ? "w-72 border-brand ring-2 ring-[#ede9fe] bg-white"
                  : "w-48 border-border hover:border-ink-muted"
              }`}
            >
              <HiMagnifyingGlass
                size={16}
                className="text-ink-muted shrink-0"
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products…"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none min-w-0"
              />
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-1">
              {/* Mobile search toggle */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 transition-colors duration-150"
                aria-label="Search"
              >
                <HiMagnifyingGlass size={20} />
              </button>

              {/* Account */}
              <button
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 transition-colors duration-150"
                aria-label="Account"
              >
                <HiUser size={20} />
              </button>

              {/* Cart */}
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 transition-colors duration-150"
                aria-label="Cart"
              >
                <HiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 transition-colors duration-150"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Category sub-bar (desktop only) — optional second row ─────────── */}
        {/* Intentionally omitted to keep things clean; links are in the nav above */}
      </header>

      {/* ── Mobile menu overlay ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Nexus Computers" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:bg-surface-2 transition-colors duration-150"
          >
            <HiXMark size={18} />
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 h-10 bg-surface-2 focus-within:border-brand focus-within:ring-2 focus-within:ring-[#ede9fe] focus-within:bg-white transition-all duration-200">
            <HiMagnifyingGlass size={16} className="text-ink-muted shrink-0" />
            <input
              type="text"
              placeholder="Search products…"
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
            />
          </div>
        </div>

        {/* Mobile nav links */}
        <nav className="flex-1 overflow-y-auto py-2">
          <p className="px-5 py-2 text-[10px] font-black text-ink-muted uppercase tracking-widest">
            Categories
          </p>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "text-brand bg-[#ede9fe]"
                    : "text-ink hover:bg-surface-2"
                }`
              }
            >
              {link.label}
              <HiChevronDown size={14} className="text-ink-muted -rotate-90" />
            </NavLink>
          ))}
          <NavLink
            to="/deals"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors duration-150 ${
                isActive
                  ? "text-orange-600 bg-orange-50"
                  : "text-orange-500 hover:bg-orange-50"
              }`
            }
          >
            <TbFlame size={16} />
            Deals
          </NavLink>

          <div className="mt-3 mx-4 border-t border-border pt-3">
            <button className="flex items-center gap-3 w-full px-1 py-2.5 text-sm font-semibold text-ink-2 hover:text-brand transition-colors duration-150">
              <HiUser size={18} />
              My Account
            </button>
            <button className="flex items-center gap-3 w-full px-1 py-2.5 text-sm font-semibold text-ink-2 hover:text-brand transition-colors duration-150">
              <HiShoppingCart size={18} />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-brand text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu footer */}
        <div className="px-5 py-4 border-t border-border bg-surface-2">
          <p className="text-[11px] text-ink-muted font-medium text-center">
            Free shipping on orders over $99
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
