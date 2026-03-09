/**
 * NTX OVERLAND LANDING PAGE
 * Design: Rugged Field Journal — Military Field Manual meets Adventure Cartography
 * Colors: Deep charcoal-olive bg, olive drab primary, burnt sienna accent, parchment text
 * Fonts: Bebas Neue (display), Source Serif 4 (body), Space Mono (labels)
 * Layout: Diagonal clip-path sections, staggered cards, asymmetric hero split
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Asset URLs ──────────────────────────────────────────────────────────────
const ASSETS = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400533471/iAMtXRJP6hGcAt7tGcjdmq/ntx_hero_bg-nejVxwk8AjjTWrakw65oMy.webp",
  trailRun: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400533471/iAMtXRJP6hGcAt7tGcjdmq/ntx_trail_run-5cwhEEeoJ9R4nog7w5tjbT.webp",
  campFire: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400533471/iAMtXRJP6hGcAt7tGcjdmq/ntx_camp_fire-8tWPMiM933R5kuuBJrJ9rY.webp",
  recovery: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400533471/iAMtXRJP6hGcAt7tGcjdmq/ntx_recovery-DbrBtbLKM32N3NebgKtYNd.webp",
  topoTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400533471/iAMtXRJP6hGcAt7tGcjdmq/ntx_topo_texture-EywS5b5m9jAKgU3at3Zofy.webp",
  logoWhite: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/DYhJLQtOisbkzcCA.png?Expires=1804105019&Signature=EDqCFK-rc7jzUFa5q9UwFKaFe6j7yqJeMgLXhsP~qjqoEByFDE1uhmFQ8Xzu2WjOiOLWO43415p9qBPAJ4QpM-ZqWoZl3064Ldg5lnBFotMdVxOoBGJ-z3Q~uaTbgtVz3tw4YU05kd6nO2Cj7oikFp7OwbUhoLTcdrzzPK22f86fQG~nqOR--jmQz4jIvsQqJbWlpesXgj~QcjqyHo2F4ZmKgdRZjaEau-c80xhuvbrHxSx~E9ScwQMeuXGipNCxQ2WdkZWS0lOsYkpyKo2LP~R9H8Ko9imeKlCgzYvpimpD0sHAL1BZuDbCD6K~Dl36RHceNfr77WhZjLzyEW59Ng__&Key-Pair-Id=K2HSFNDJXOU9YS",
  aerialTrail: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/ZHdAMZFQHqrTIRiH.jpeg?Expires=1804105020&Signature=puKQGBggVrklUu~TqHd3Fgxg4~iEaaLXgaW-8sn7BgZQCY9nQvkMftDZsf7U2ovycL5-cC81NVJgnI~KW9Cl7TV0RioJWmdH5i5qRrsW5v1o1mBkDIVDU5oOk~OYvlfUqFTh~CUGdQhodBz0MzwjJk1R6O1~f-YMvNls~c1q~CqGFAVyO80NBLH-SQ-2Qy5AomxzYy-DWCRGwOnOohzIa~Kq5LtwL7lQbDJBIpltPiLaM1VEtofePihxWDBMVvxBOezZ56IaxDGrhswwZx4kELFD4gPsQx-sC-foC6WkLmCIiDwTgoOsfHno4Qd5Rv~bskkVL31kE04hviQhTkhjPA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  groupTrail: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/HxWVZqsrhRakalhV.jpeg?Expires=1804105019&Signature=FwTZncl3Q6jnohWiMfBRLjlpSpLjrU8gX8X-7o1qpeOS-pyaxzPGRb7j6HUUoG7t4TPLjPo7pLbbMza0MvIN83DkfyhZbqDHrym2HBVrKd23rFDuxEF9npzIXHiC7fTSjpeVud4rku4agNbaN3SpqG45d69YIWD3kDfKUcnceFaPDDyXqobCDOT9bgLhBMvnljvJq65qaF1FiWEL10vjwYCYgW9q-PR7HyVCK2Em-la~x4V4YAm~K9ql4bgKMYGItp~R839vsbeX96m7KbID8GENVd9LS50tpECB4OYgQ2-CW-RpGMJeAoeuI3z9ftBzZW5o1NrO0x7hTjy-TvnHdQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  blackFriday: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/uivriocdKyXxtxgq.webp?Expires=1804105019&Signature=RBTelOIn5jgqMZwReRjYugaWZpe49X~fK5DP1XSuHvDDEvn8uzMxa9m1zRdsC-YMIOUnbd5SppjwVmP53Ddf-mJ-y5kdtqG~h0ipeLpGkycgnLcqkHLI5ZW028bCPLZKJbtJi9wmzo8u8S8VjkdmOPkf-7Pz7qnQhs~DtGUzTqVFCbJ4OK0luB5R-6MADDyUeLTViFOxhdvD5dJWvH0gKJUvYB6tWlo5oEcM7nPPqyoYUyd7WQUwpJVA2xtnRfOt0lxRCpw2H-lRIgMpEV6ilZNY1MoCv-DTbcpzjIcbdm1SaQnPQAveoygKvXs3uZqEwPVmF0FjHKCPLALA88TuCg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  eaglesNest: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/VytWuKkxXJeEnGuo.webp?Expires=1804105426&Signature=auzJwJhmnqg02~UB4xodP0E5SWQz0LmpKue2YqXiVsRJgyRqA9A7FWumoKSdLLetmx0VAAjBT31AQXGlZ~2nuleTcCWhVCL8r0SHUHJ3sxhtgkKPj-J0jrFYfRNSynlG4UUOAAL~0CUHyEt~R6IGYbIVYjymTLIfTqa5WN5M3~12duXbiqnNLnSFJFQhfauHHEUah5zu5qLw1tcIDg7QutwfIOB4I0Cb6tTdrmCxXv6WmBhnyA-Nb69DodIMGRP4hBPO6dtAcZx2mq7FPasdDMjUYibHSYtP4VHbgsBiLKDEKWE7NyyRpHDbVSL-ywCPCmeUFH9wmMFrBIKa3~W82g__&Key-Pair-Id=K2HSFNDJXOU9YS",
  offroadRocky: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/pJGRCXDDvqLWJYMn.webp?Expires=1804105019&Signature=PUg2RLbWPamCfgD1Zg1d3iKeaIChyjZSOyu0PirjELMgg2uxatBIH0hsvao0M2PHrLp6xy91TbatZnXbs95JK7tEdFpuTjL9Kt8lP-oqgvvMIDnMqD9nKmP--~QgBa8zV6zi4Vk2ggVZnSJls3xDnZ24GAyy4ptMO7T9dUXokXf~I1yE2jJG8i7tfdrJ9MeJDaX7uaKlG~Zl2JUMMkrrNh-1oSibDmrxACKxyCMT3Acttsfjn8GRr5xhXcrThk0wJvW5f-WGzt3Uk031iBr6JJHva907ipnLPC4x9tMyPYafbKHxg4-WhusFdxiLXx-9WdKSbVHZSahSoHka5XBL7w__&Key-Pair-Id=K2HSFNDJXOU9YS",
  brokenBow: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663400533471/ZuOaVZeaMpndblIO.webp?Expires=1804105019&Signature=lYbCidJ2rggXCnNvYKaKfv4fngIdMycJ5NbonVE1OMdP3j2-iukL7nfq19kHgKdITSHye84JHwyR2IKJDVOQ9qS6ZyPyZOKZgbrdKvcKUaVkxaYOBnq4s-EnL-JT8gU5Fn503CG0uWfdBf0gJxteXxi9GVpvgluJ69-8akCEjBVZ95CTsaWiRG-OC906g13IKOPBNvFB~rR2bBDPDS8x1o3bB~0l5QqrsEQ3atS0cUuyD3VqKD-Gv3s3n37dSVyCnqCFSlyQfBY01WaDkh07CirUXcvtOMIdJd26D9hphy860kC4U~pmwJjSCRfD7pkn8j-CYT4jngkAcKJJacJWSg__&Key-Pair-Id=K2HSFNDJXOU9YS",
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "What We Do", href: "#services" },
    { label: "Adventures", href: "#gallery" },
    { label: "Community", href: "#community" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.10 0.015 85 / 0.97)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.28 0.02 85)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={ASSETS.logoWhite} alt="NTX Overland" className="h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono-ntx text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "oklch(0.75 0.02 80)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.55 0.14 45)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.75 0.02 80)")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-amber px-5 py-2 text-sm font-display tracking-widest"
          >
            Join Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 transition-all" style={{ background: "oklch(0.92 0.02 80)" }} />
          <span className="block w-6 h-0.5 transition-all" style={{ background: "oklch(0.92 0.02 80)" }} />
          <span className="block w-4 h-0.5 transition-all" style={{ background: "oklch(0.92 0.02 80)" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "oklch(0.10 0.015 85 / 0.98)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono-ntx text-xs tracking-widest uppercase py-2 border-b"
              style={{ color: "oklch(0.75 0.02 80)", borderColor: "oklch(0.28 0.02 85)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-amber px-5 py-3 text-sm font-display tracking-widest text-center mt-2">
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.heroBg}
          alt="Texas hill country overlanding at sunset"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.65) contrast(1.1)" }}
        />
        {/* Gradient overlay — dark at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.12 0.015 85 / 0.3) 0%, oklch(0.12 0.015 85 / 0.1) 30%, oklch(0.12 0.015 85 / 0.7) 70%, oklch(0.12 0.015 85 / 0.95) 100%)",
          }}
        />
        {/* Topographic texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ASSETS.topoTexture})`,
            backgroundSize: "500px",
            opacity: 0.05,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container pb-20 pt-32">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className={`font-mono-ntx text-xs tracking-widest uppercase mb-6 flex items-center gap-3 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ color: "oklch(0.55 0.14 45)", transitionDelay: "0.1s" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
            North Texas Overlanding Community
            <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
          </div>

          {/* Main headline */}
          <h1
            className={`font-display text-7xl md:text-9xl leading-none mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ color: "oklch(0.95 0.02 80)", transitionDelay: "0.2s" }}
          >
            NTX
            <br />
            <span style={{ color: "oklch(0.55 0.14 45)" }}>OVERLAND</span>
          </h1>

          {/* Tagline */}
          <p
            className={`font-display text-2xl md:text-3xl tracking-widest mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ color: "oklch(0.75 0.02 80)", transitionDelay: "0.35s" }}
          >
            EXPLORE. CONNECT. DISCOVER.
          </p>

          {/* Description */}
          <p
            className={`font-body text-lg max-w-xl mb-10 leading-relaxed transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ color: "oklch(0.80 0.02 80)", transitionDelay: "0.45s" }}
          >
            Texas's premier overlanding community — built by adventurers, for adventurers. 
            Monthly trail runs, camping expeditions, recovery training, and a brotherhood 
            that has your back on every trail.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.55s" }}
          >
            <a href="#contact" className="btn-amber px-8 py-4 text-base font-display tracking-widest">
              Join the Community
            </a>
            <a href="#story" className="btn-olive px-8 py-4 text-base font-display tracking-widest">
              Our Story
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-16 flex flex-wrap gap-8 md:gap-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.65s" }}
        >
          {[
            { value: "3,300+", label: "Members" },
            { value: "50+", label: "Trail Runs" },
            { value: "12+", label: "States Explored" },
            { value: "2024", label: "Founded" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display text-4xl"
                style={{ color: "oklch(0.55 0.14 45)" }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono-ntx text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.60 0.02 80)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "oklch(0.12 0.015 85)",
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
        }}
      />
    </section>
  );
}

// ─── Brand Story Section ──────────────────────────────────────────────────────
function BrandStory() {
  return (
    <section id="story" className="relative py-24 overflow-hidden">
      {/* Topo background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.topoTexture})`,
          backgroundSize: "400px",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <div className="reveal font-mono-ntx text-xs tracking-widest uppercase mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.55 0.14 45)" }}>
              <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
              Field Notes — Our Origin
            </div>

            <h2 className="reveal font-display text-6xl md:text-7xl leading-none mb-8"
              style={{ color: "oklch(0.92 0.02 80)" }}>
              BORN FROM
              <br />
              <span style={{ color: "oklch(0.55 0.14 45)" }}>THE TRAIL</span>
            </h2>

            <div className="reveal reveal-delay-1 space-y-5 font-body text-base leading-relaxed"
              style={{ color: "oklch(0.75 0.02 80)" }}
            >
              <p>
                NTX Overland was founded in 2024 with a simple mission: to build a community 
                of passionate overlanders across North Texas who share a love for exploration, 
                self-reliance, and the great outdoors.
              </p>
              <p>
                What started as a small group of friends hitting local trails has grown into 
                a thriving community of 3,300+ members — from weekend warriors to seasoned 
                expedition veterans. We believe the best adventures are shared ones.
              </p>
              <p>
                From the red clay trails of East Texas to the rocky canyons of the Hill Country, 
                from Black Friday campouts to Eagles Nest snow runs — every mile is a memory, 
                every member a family.
              </p>
            </div>

            {/* Partner badges */}
            <div className="reveal reveal-delay-2 mt-10">
              <p className="font-mono-ntx text-xs tracking-widest uppercase mb-4"
                style={{ color: "oklch(0.50 0.02 80)" }}>
                Proud Partners
              </p>
              <div className="flex flex-wrap gap-3">
                {["NTX Bronco Club", "4 Wheel Parts — Coppell", "TrailsOffroad"].map((partner) => (
                  <span
                    key={partner}
                    className="font-mono-ntx text-xs tracking-wider px-3 py-1.5 border"
                    style={{
                      color: "oklch(0.65 0.02 80)",
                      borderColor: "oklch(0.28 0.02 85)",
                    }}
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — photo collage */}
          <div className="reveal reveal-delay-1 relative">
            {/* Main photo */}
            <div className="relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 94% 100%, 0 100%)" }}>
              <img
                src={ASSETS.aerialTrail}
                alt="Aerial view of NTX Overland trail run in North Texas"
                className="w-full h-80 object-cover photo-worn"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: "linear-gradient(to top, oklch(0.12 0.015 85 / 0.9), transparent)" }}
              >
                <span className="font-mono-ntx text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.55 0.14 45)" }}>
                  North Texas Hill Country
                </span>
              </div>
            </div>

            {/* Secondary photo — offset */}
            <div
              className="absolute -bottom-8 -right-4 w-48 h-36 overflow-hidden border-4"
              style={{ borderColor: "oklch(0.12 0.015 85)", clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)" }}
            >
              <img
                src={ASSETS.blackFriday}
                alt="Black Friday camp gathering"
                className="w-full h-full object-cover photo-worn"
              />
            </div>

            {/* Hex badge overlay */}
            <div
              className="absolute -top-4 -left-4 w-20 h-20 flex items-center justify-center"
              style={{ background: "oklch(0.55 0.14 45)" }}
            >
              <div className="text-center">
                <div className="font-display text-lg leading-none" style={{ color: "oklch(0.10 0.015 85)" }}>
                  EST
                </div>
                <div className="font-display text-2xl leading-none" style={{ color: "oklch(0.10 0.015 85)" }}>
                  2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const services = [
  {
    icon: "🗺️",
    title: "Trail Runs",
    subtitle: "Monthly Expeditions",
    description:
      "Guided group trail runs across Texas and surrounding states. All skill levels welcome — from beginner-friendly dirt roads to technical rock crawling. We scout every route so you can focus on the adventure.",
    image: ASSETS.trailRun,
    tag: "Monthly Events",
  },
  {
    icon: "⛺",
    title: "Overland Camps",
    subtitle: "Multi-Day Adventures",
    description:
      "Immersive multi-day camping expeditions deep in the Texas wilderness. Rooftop tents, campfires, star-gazing, and the kind of conversations that only happen miles from civilization.",
    image: ASSETS.campFire,
    tag: "Quarterly Trips",
  },
  {
    icon: "🔧",
    title: "Recovery Training",
    subtitle: "Skills & Education",
    description:
      "Hands-on recovery and self-rescue workshops. Learn kinetic rope recovery, hi-lift jack techniques, winching, and vehicle extraction — skills that could save your rig and your crew.",
    image: ASSETS.recovery,
    tag: "Workshops",
  },
  {
    icon: "🏥",
    title: "Medical Education",
    subtitle: "Wilderness First Aid",
    description:
      "Trail-specific first aid and wilderness medical training. Because when you're 30 miles from the nearest paved road, preparation isn't optional — it's survival.",
    image: ASSETS.eaglesNest,
    tag: "Safety Training",
  },
  {
    icon: "🤝",
    title: "Community Events",
    subtitle: "Festivals & Meetups",
    description:
      "From the 4 Wheel Parts Truck & Jeep Fest to local meetups and swap meets — we show up together. Build friendships, swap gear knowledge, and grow your overland network.",
    image: ASSETS.groupTrail,
    tag: "Year-Round",
  },
  {
    icon: "👕",
    title: "NTX Merch",
    subtitle: "Gear & Apparel",
    description:
      "Rep the community on and off the trail. T-shirts, hats, stickers, and patches — all featuring the iconic NTX Overland badge. Wear the brand that earned its stripes on real terrain.",
    image: ASSETS.offroadRocky,
    tag: "Shop",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden diagonal-top"
      style={{ background: "oklch(0.14 0.015 85)" }}
    >
      {/* Topo bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.topoTexture})`,
          backgroundSize: "400px",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="mb-16">
          <div className="reveal font-mono-ntx text-xs tracking-widest uppercase mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.55 0.14 45)" }}>
            <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
            Mission Briefing
          </div>
          <h2 className="reveal font-display text-6xl md:text-7xl leading-none"
            style={{ color: "oklch(0.92 0.02 80)" }}>
            WHAT WE DO
          </h2>
          <p className="reveal reveal-delay-1 font-body text-lg mt-4 max-w-xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 80)" }}>
            More than a club — a full-spectrum overlanding community offering everything 
            you need to explore further, safer, and with better company.
          </p>
        </div>

        {/* Cards — staggered brick layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${(i % 4) + 1} field-card group overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
              style={{ marginTop: i % 2 === 1 ? "1.5rem" : "0" }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 photo-worn"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, oklch(0.16 0.015 85 / 0.9))" }}
                />
                {/* Tag */}
                <span
                  className="absolute top-3 right-3 font-mono-ntx text-xs tracking-wider px-2 py-1"
                  style={{
                    background: "oklch(0.55 0.14 45)",
                    color: "oklch(0.10 0.015 85)",
                  }}
                >
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-none"
                      style={{ color: "oklch(0.92 0.02 80)" }}>
                      {service.title}
                    </h3>
                    <p className="font-mono-ntx text-xs tracking-wider mt-1"
                      style={{ color: "oklch(0.55 0.14 45)" }}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.02 80)" }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery / Adventures Section ─────────────────────────────────────────────
const galleryItems = [
  { src: ASSETS.heroBg, caption: "Texas Hill Country", sub: "Sunset Trail Run" },
  { src: ASSETS.eaglesNest, caption: "Broken Bow  snow", sub: "Winter Snow Run" },
  { src: ASSETS.blackFriday, caption: "Black Friday Camp", sub: "Annual Tradition" },
  { src: ASSETS.brokenBow, caption: "Broken Bow Lake", sub: "Oklahoma Expedition" },
  { src: ASSETS.groupTrail, caption: "Oklahoma Fun", sub: "Group Trail Day" },
  { src: ASSETS.offroadRocky, caption: "Lakeside retreat", sub: "Technical Run" },
];

function Gallery() {
  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <div className="reveal font-mono-ntx text-xs tracking-widest uppercase mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.55 0.14 45)" }}>
            <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
            Field Dispatches
          </div>
          <h2 className="reveal font-display text-6xl md:text-7xl leading-none"
            style={{ color: "oklch(0.92 0.02 80)" }}>
            ADVENTURES
            <br />
            <span style={{ color: "oklch(0.55 0.14 45)" }}>IN THE FIELD</span>
          </h2>
        </div>

        {/* Asymmetric photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={item.caption}
              className={`reveal reveal-delay-${(i % 4) + 1} relative overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ height: i === 0 ? "420px" : "200px" }}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 photo-worn"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "oklch(0.12 0.015 85 / 0.6)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "linear-gradient(to top, oklch(0.12 0.015 85 / 0.9), transparent)" }}
              >
                <p className="font-display text-xl leading-none"
                  style={{ color: "oklch(0.92 0.02 80)" }}>
                  {item.caption}
                </p>
                <p className="font-mono-ntx text-xs tracking-wider mt-1"
                  style={{ color: "oklch(0.55 0.14 45)" }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-10 text-center">
          <a
            href="https://ntxoverland.com/our-gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-olive inline-block px-8 py-4 font-display text-base tracking-widest"
          >
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof / Community Section ────────────────────────────────────────
const testimonials = [
  {
    name: "Michael R.",
    handle: "@miker_overland",
    avatar: "MR",
    text: "NTX Overland completely changed how I approach off-roading. The recovery training alone saved my Tacoma on a trail in the Hill Country. These guys know their stuff and they look out for everyone in the group.",
    stars: 5,
    trip: "Hill Country Trail Run",
  },
  {
    name: "Sarah K.",
    handle: "@sarahk_adventures",
    avatar: "SK",
    text: "As a solo female overlander, finding this community was a game changer. Everyone is welcoming, knowledgeable, and genuinely looks out for each other. The Black Friday camp was one of the best weekends of my life.",
    stars: 5,
    trip: "Black Friday Camp",
  },
  {
    name: "Dave T.",
    handle: "@texasjeeplife",
    avatar: "DT",
    text: "Been overlanding for 10 years and NTX Overland is the most organized, safety-conscious community I've been part of. Kevin and the team run tight, fun events. Already signed up for the next three runs!",
    stars: 5,
    trip: "Eagles Nest Snow Run",
  },
  {
    name: "Carlos M.",
    handle: "@cm_offroad",
    avatar: "CM",
    text: "The Broken Bow Lake trip was absolutely epic. Woke up to mist over the water with the rigs lined up — felt like a movie. The community vibe is unmatched. Highly recommend to anyone with a 4x4.",
    stars: 5,
    trip: "Broken Bow Lake Expedition",
  },
];

function Community() {
  return (
    <section
      id="community"
      className="relative py-24 overflow-hidden diagonal-top"
      style={{ background: "oklch(0.10 0.015 85)" }}
    >
      {/* Topo bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.topoTexture})`,
          backgroundSize: "400px",
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="mb-16">
          <div className="reveal font-mono-ntx text-xs tracking-widest uppercase mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.55 0.14 45)" }}>
            <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
            From the Field
          </div>
          <h2 className="reveal font-display text-6xl md:text-7xl leading-none"
            style={{ color: "oklch(0.92 0.02 80)" }}>
            WHAT THE
            <br />
            <span style={{ color: "oklch(0.55 0.14 45)" }}>CREW SAYS</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${(i % 4) + 1} field-card p-6 group`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} style={{ color: "oklch(0.55 0.14 45)" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-base leading-relaxed mb-6 italic"
                style={{ color: "oklch(0.78 0.02 80)" }}>
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t"
                style={{ borderColor: "oklch(0.28 0.02 85)" }}>
                <div
                  className="w-10 h-10 flex items-center justify-center font-display text-sm"
                  style={{
                    background: "oklch(0.42 0.09 125)",
                    color: "oklch(0.92 0.02 80)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display text-base leading-none"
                    style={{ color: "oklch(0.92 0.02 80)" }}>
                    {t.name}
                  </p>
                  <p className="font-mono-ntx text-xs tracking-wider mt-1"
                    style={{ color: "oklch(0.55 0.14 45)" }}>
                    {t.trip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook CTA */}
        <div className="reveal mt-12 flex flex-col sm:flex-row items-center gap-6 p-8 border"
          style={{ borderColor: "oklch(0.28 0.02 85)", background: "oklch(0.14 0.015 85)" }}>
          <div className="flex-1">
            <h3 className="font-display text-3xl mb-2" style={{ color: "oklch(0.92 0.02 80)" }}>
              JOIN 3,300+ MEMBERS ON FACEBOOK
            </h3>
            <p className="font-body text-sm" style={{ color: "oklch(0.65 0.02 80)" }}>
              Stay updated on upcoming trail runs, events, and community news. Follow us for daily adventure content.
            </p>
          </div>
          <a
            href="https://www.facebook.com/profile.php?id=61571192656038"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber px-8 py-4 font-display text-base tracking-widest whitespace-nowrap"
          >
            Follow on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", vehicle: "", message: "", interest: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", vehicle: "", message: "", interest: "" });
      toast.success("Message sent! We'll get back to you from the trail. 🏕️", {
        duration: 5000,
      });
    }, 1500);
  };

  const inputStyle = {
    background: "oklch(0.16 0.015 85)",
    border: "1px solid oklch(0.28 0.02 85)",
    color: "oklch(0.92 0.02 80)",
    fontFamily: "var(--font-body)",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "oklch(0.60 0.02 80)",
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "oklch(0.12 0.015 85)" }}
    >
      {/* Topo bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.topoTexture})`,
          backgroundSize: "400px",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 container">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <div className="reveal font-mono-ntx text-xs tracking-widest uppercase mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.55 0.14 45)" }}>
              <span className="inline-block w-8 h-px" style={{ background: "oklch(0.55 0.14 45)" }} />
              Make Contact
            </div>

            <h2 className="reveal font-display text-6xl md:text-7xl leading-none mb-8"
              style={{ color: "oklch(0.92 0.02 80)" }}>
              READY TO
              <br />
              <span style={{ color: "oklch(0.55 0.14 45)" }}>HIT THE TRAIL?</span>
            </h2>

            <p className="reveal font-body text-base leading-relaxed mb-10"
              style={{ color: "oklch(0.65 0.02 80)" }}>
              Whether you're a seasoned overlander or just got your first 4x4, 
              we want to hear from you. Drop us a message and we'll connect you 
              with the right run for your rig and skill level.
            </p>

            {/* Contact details */}
            <div className="reveal reveal-delay-1 space-y-6">
              {[
                {
                  icon: "📍",
                  label: "Base Camp",
                  value: "North Texas (DFW Area)",
                },
                {
                  icon: "📘",
                  label: "Facebook",
                  value: "NTX Overland Community",
                  link: "https://www.facebook.com/profile.php?id=61571192656038",
                },
                {
                  icon: "🌐",
                  label: "Website",
                  value: "ntxoverland.com",
                  link: "https://ntxoverland.com",
                },
                {
                  icon: "⚠️",
                  label: "Response Time",
                  value: "Our travels take us to remote places — allow up to a week",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-mono-ntx text-xs tracking-widest uppercase"
                      style={{ color: "oklch(0.50 0.02 80)" }}>
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm transition-colors duration-200"
                        style={{ color: "oklch(0.55 0.14 45)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm" style={{ color: "oklch(0.75 0.02 80)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: "oklch(0.09 0.015 85)",
        borderColor: "oklch(0.22 0.02 85)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src={ASSETS.logoWhite} alt="NTX Overland" className="h-16 w-auto" />
            <div>
              <p className="font-display text-xl" style={{ color: "oklch(0.92 0.02 80)" }}>
                NTX OVERLAND
              </p>
              <p className="font-mono-ntx text-xs tracking-widest" style={{ color: "oklch(0.55 0.14 45)" }}>
                EXPLORE. CONNECT. DISCOVER.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 justify-center">
              {[
              { label: "Our Story", href: "#story" },
              { label: "What We Do", href: "#services" },
              { label: "Adventures", href: "#gallery" },
              { label: "Community", href: "#community" },
              { label: "Contact", href: "#contact" },
              { label: "Facebook", href: "https://www.facebook.com/groups/ntxoverland", external: true },
              { label: "Website", href: "https://ntxoverland.com", external: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-mono-ntx text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "oklch(0.55 0.02 80)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.55 0.14 45)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.02 80)")}
              >
                {link.label}
              </a>
            ))}
            </div>
        </div>

        <div
          className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "oklch(0.22 0.02 85)" }}
        >
          <p className="font-mono-ntx text-xs" style={{ color: "oklch(0.40 0.02 80)" }}>
            © 2024 NTX Overland. All rights reserved.
          </p>
          <p className="font-mono-ntx text-xs" style={{ color: "oklch(0.35 0.02 80)" }}>
            North Texas · Overlanding · Community
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.015 85)" }}>
      <Navbar />
      <Hero />
      <BrandStory />
      <Services />
      <Gallery />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}
