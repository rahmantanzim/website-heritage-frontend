// src/components/home/AboutQuick.jsx
import { Link } from "react-router-dom";
import { Layers, BookOpen, FileText, Image as ImageIcon } from "lucide-react";

const QuickLinks = [
  { title: "Collections", to: "/collections", icon: Layers },
  { title: "The Catalogue", to: "/catalogue", icon: BookOpen },
  { title: "Publications", to: "/publications", icon: FileText },
  { title: "Gallery", to: "/gallery", icon: ImageIcon },
];

const AboutQuick = () => {
  return (
    <section className="bg-white">
      {/* 4-column quick grid (overlapping the slider like the screenshot) */}
      <div className="relative -mt-10 md:-mt-14 lg:-mt-16 z-40" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="bg-white shadow-lg border border-black/10 rounded-md">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {QuickLinks.map(({ title, to, icon: Icon }, idx) => (
                <Link
                  key={title}
                  to={to}
                  className={[
                    "group flex flex-col items-center justify-center gap-3 py-6 md:py-8",
                    "hover:bg-black/[0.02] transition-colors",
                    idx !== 0 ? "border-l border-black/10" : "",
                    // add top border for mobile second row
                    idx >= 2 ? "border-t md:border-t-0 border-black/10" : "",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-black/15">
                    <Icon className="w-5 h-5 text-black/70 group-hover:text-[#2f5d50] transition-colors" />
                  </span>
                  <span className="text-[12px] md:text-[13px] font-semibold uppercase tracking-wider text-black/80 group-hover:text-black transition-colors">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small About section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 md:pt-16 pb-14 md:pb-18">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-black uppercase">
            About Heritage
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-black/20" />
            <span className="h-2 w-2 rounded-full bg-[#2f5d50]" />
            <span className="h-px w-10 bg-black/20" />
          </div>

          <p className="mt-6 text-[14px] md:text-[15px] leading-7 text-black/70">
            Heritage is an independent archive preserving documents, photographs,
            journals, magazines, and other historical materials. Focused on
            post-colonial Bangladesh (1947 onwards), it highlights the voices of
            civil society while also including important records from state
            institutions.
          </p>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center justify-center h-9 px-5 rounded-sm bg-[#2f5d50] text-white text-[12px] font-semibold uppercase tracking-widest hover:bg-[#244a40] transition-colors"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutQuick;
