import { Link } from "react-router";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandX,
  TbBrandYoutube,
  TbTruckDelivery,
  TbShieldCheck,
  TbHeadset,
  TbRotateClockwise2,
  TbMapPin,
  TbPhone,
  TbMail,
} from "react-icons/tb";

const LINK_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "CPUs", href: "/category/cpu" },
      { label: "Graphics Cards", href: "/category/gpu" },
      { label: "Memory", href: "/category/ram" },
      { label: "Motherboards", href: "/category/motherboard" },
      { label: "Storage", href: "/category/storage" },
      { label: "Laptops", href: "/category/laptop" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Track Your Order", href: "/orders/track" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Warranty", href: "/warranty" },
      { label: "Financing", href: "/financing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Build Guides", href: "/guides" },
      { label: "Affiliates", href: "/affiliates" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: TbBrandFacebook },
  { label: "Instagram", href: "https://instagram.com", Icon: TbBrandInstagram },
  { label: "X", href: "https://x.com", Icon: TbBrandX },
  { label: "YouTube", href: "https://youtube.com", Icon: TbBrandYoutube },
];

const PERKS = [
  { Icon: TbTruckDelivery, title: "Free shipping", sub: "On orders over $99" },
  { Icon: TbRotateClockwise2, title: "30-day returns", sub: "Hassle-free refunds" },
  { Icon: TbShieldCheck, title: "Secure checkout", sub: "256-bit encryption" },
  { Icon: TbHeadset, title: "Expert support", sub: "Mon–Sat, 9am–8pm" },
];

const Footer = () => (
  <footer className="bg-[#23232e] text-white mt-4">
    {/* ── Perks strip ───────────────────────────────────────────────────────── */}
    <div className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {PERKS.map(({ Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-brand-light">
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight">{title}</p>
              <p className="text-xs text-white/50 font-medium mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Main footer ───────────────────────────────────────────────────────── */}
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
      {/* Brand column */}
      <div className="col-span-2 lg:col-span-2">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-white px-4 py-2.5"
        >
          <img src="/logo.png" alt="Nexus Computers" className="h-10 w-auto" />
        </Link>
        <p className="text-sm text-white/60 font-medium leading-relaxed mt-4 max-w-sm">
          Your trusted source for PC components, custom builds, and laptops.
          Quality hardware, fair prices, and support from people who actually
          build PCs.
        </p>

        <ul className="mt-6 space-y-2.5">
          <li className="flex items-center gap-3 text-sm text-white/60">
            <TbMapPin size={18} className="text-brand-light shrink-0" />
            1200 Silicon Ave, San Jose, CA 95110
          </li>
          <li>
            <a
              href="tel:+18005550199"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-150"
            >
              <TbPhone size={18} className="text-brand-light shrink-0" />
              +1 (800) 555-0199
            </a>
          </li>
          <li>
            <a
              href="mailto:support@nexuscomputers.com"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-150"
            >
              <TbMail size={18} className="text-brand-light shrink-0" />
              support@nexuscomputers.com
            </a>
          </li>
        </ul>

        {/* Socials */}
        <div className="flex items-center gap-2 mt-6">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/70 hover:bg-brand hover:text-white transition-colors duration-150"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
      </div>

      {/* Link columns */}
      {LINK_COLUMNS.map((column) => (
        <nav key={column.heading} aria-label={column.heading}>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-white/40">
            {column.heading}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-white/60 font-medium hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    {/* ── Bottom bar ────────────────────────────────────────────────────────── */}
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/45 font-medium text-center sm:text-left">
          © {new Date().getFullYear()} Nexus Computers. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            to="/privacy"
            className="text-xs text-white/45 font-medium hover:text-white transition-colors duration-150"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-xs text-white/45 font-medium hover:text-white transition-colors duration-150"
          >
            Terms of Service
          </Link>
          <Link
            to="/cookies"
            className="text-xs text-white/45 font-medium hover:text-white transition-colors duration-150"
          >
            Cookie Settings
          </Link>
        </div>

        {/* Payment methods */}
        <div className="flex items-center gap-1.5">
          {["Visa", "MC", "Amex", "PayPal"].map((method) => (
            <span
              key={method}
              className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/55 tracking-wide"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
