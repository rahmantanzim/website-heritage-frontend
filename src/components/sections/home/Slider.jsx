import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import slider1 from "./../../../assets/images/slider-1.jpg";
import slider2 from "./../../../assets/images/slider-2.jpg";

const AUTOPLAY_MS = 6000;

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const slides = useMemo(
    () => [
      {
        id: 1,
        eyebrow: "HERITAGE ARCHIVES",
        title: "The Archives of Bangladesh History",
        buttonText: "Explore the Archives",
        buttonLink: "/collections",
        image: slider1,
      },
      {
        id: 2,
        eyebrow: "HERITAGE ARCHIVES",
        title: "A Tribute to the Cultural Heritage",
        buttonText: "Browse Historical Records",
        buttonLink: "/catalogue",
        image: slider2,
      },
    ],
    []
  );

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  // Respect reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Autoplay (pause on hover / focus / hidden tab)
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    intervalRef.current = setInterval(nextSlide, AUTOPLAY_MS);

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (!intervalRef.current) {
        intervalRef.current = setInterval(nextSlide, AUTOPLAY_MS);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, prefersReducedMotion, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section
      className="relative w-full h-[520px] md:h-[620px] lg:h-[720px] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Homepage slider"
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide.id}
            className={[
              "absolute inset-0",
              prefersReducedMotion ? "" : "transition-opacity duration-1000",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Warm + dark overlay (closer to screenshot) */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-[#2f5d50]/20 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center px-4">
              <div className="text-center max-w-4xl mx-auto translate-y-6 md:translate-y-8">
                {/* Eyebrow (optional but matches WP vibe) */}
                <p
                  className={[
                    "text-white/90 text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3",
                    prefersReducedMotion ? "" : "transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                  ].join(" ")}
                  style={{ transitionDelay: isActive ? "150ms" : "0ms" }}
                >
                  {slide.eyebrow}
                </p>

                <h1
                  className={[
                    "uppercase text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8",
                    "font-serif leading-[1.05] tracking-wide",
                    prefersReducedMotion ? "" : "transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  ].join(" ")}
                  style={{ transitionDelay: isActive ? "250ms" : "0ms" }}
                >
                  {slide.title}
                </h1>

                <Link
                  to={slide.buttonLink}
                  className={[
                    "inline-flex items-center justify-center",
                    "bg-[#2f5d50] text-white px-8 py-3 md:px-10 md:py-4",
                    "rounded-sm text-[12px] md:text-sm font-semibold uppercase tracking-widest",
                    "hover:bg-[#244a40] transition-all duration-300 shadow-lg hover:shadow-xl",
                    prefersReducedMotion ? "" : "transition-all duration-700",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  ].join(" ")}
                  style={{ transitionDelay: isActive ? "450ms" : "0ms" }}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={[
                "h-2.5 md:h-3 rounded-full transition-all duration-300",
                isActive ? "bg-white w-9 md:w-10" : "bg-white/50 hover:bg-white/75 w-2.5 md:w-3",
              ].join(" ")}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
            />
          );
        })}
      </div>

      {/* Screen-reader live region */}
      <div className="sr-only" aria-live="polite">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </section>
  );
};

export default Slider;
