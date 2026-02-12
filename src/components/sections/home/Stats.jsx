// src/components/home/Stats.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";

// Clean + performant:
// - No iframe until user clicks (better LCP)
// - Count-up runs only when section enters viewport
// - Single IntersectionObserver, cleaned up properly

const formatNumber = (n) => n.toLocaleString("en-US");

const CountUp = ({ value, start, duration = 900 }) => {
  const [current, setCurrent] = useState(start ? 0 : value);

  useEffect(() => {
    if (!start) return;

    let rafId = 0;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setCurrent(Math.round(eased * value));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, value, duration]);

  return <>{formatNumber(current)}</>;
};

const VideoModal = ({ open, onClose, youtubeId }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Video"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto mt-16 max-w-4xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-3">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full overflow-hidden rounded-md border border-white/10 shadow-xl bg-black">
          <div className="pt-[56.25%]" />
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, start, to }) => {
  const card = (
    <div className="group rounded-md border border-black/10 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-2xl md:text-3xl font-semibold text-black">
        <CountUp value={value} start={start} />
        <span className="text-black/70">+</span>
      </div>
      <div className="mt-1 text-[12px] md:text-[13px] font-semibold uppercase tracking-wider text-black/60 group-hover:text-black/75 transition-colors">
        {label}
      </div>
    </div>
  );

  if (!to) return card;

  return (
    <Link to={to} className="block focus:outline-none focus:ring-2 focus:ring-[#2f5d50]/40 rounded-md">
      {card}
    </Link>
  );
};

const Stats = () => {
  // Update these as needed
  const youtubeId = "llygBk0qV4U"; // replace with your real video id
  const thumbnailUrl = useMemo(
    () => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    [youtubeId]
  );

  const stats = useMemo(
    () => [
      { value: 30000, label: "Journals & Periodicals", to: "/catalogue" },
      { value: 10000, label: "Books on Local History", to: "/collections" },
      { value: 5200, label: "Posters & Visual Items", to: "/collections" },
      { value: 3200, label: "Biographical Profiles", to: "/collections" },
    ],
    []
  );

  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-black/60">
            Heritage Archives
          </p>
          <h2 className="mt-2 text-xl md:text-2xl uppercase font-semibold text-black">
            A short introduction
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] leading-7 text-black/70">
            Heritage Archives is an independent depository focused on preserving documents,
            photographs, publications, and digital items related to Bangladesh’s social
            movements and transformations—especially post-1947 materials.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Video thumb */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative w-full overflow-hidden rounded-md border border-black/10 shadow-sm bg-black focus:outline-none focus:ring-2 focus:ring-[#2f5d50]/40"
            aria-label="Play introduction video"
          >
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
              decoding="async"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-transform duration-200 group-hover:scale-105">
                <Play className="w-7 h-7 translate-x-[1px]" />
              </span>
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <p className="text-white/90 text-[11px] font-semibold uppercase tracking-[0.25em]">
                Watch
              </p>
              <p className="mt-1 text-white text-lg md:text-xl font-semibold">
                Inside Heritage Archives
              </p>
              <p className="mt-1 text-white/80 text-[13px]">
                A short introduction to our mission and collections
              </p>
            </div>
          </button>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                value={s.value}
                label={s.label}
                start={startCount}
                to={s.to}
              />
            ))}

            <div className="sm:col-span-2 mt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center h-9 px-5 rounded-sm bg-[#2f5d50] text-white text-[12px] font-semibold uppercase tracking-widest hover:bg-[#244a40] transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <VideoModal open={open} onClose={() => setOpen(false)} youtubeId={youtubeId} />
    </section>
  );
};

export default Stats;
