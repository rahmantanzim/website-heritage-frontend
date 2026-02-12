import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import logo from "./../../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Match the screenshot (pages + a separate CONTACT button)
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" }, // (dropdown in WP; keep single link here)
    { name: "Collections", path: "/collections" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Publications", path: "/publications" },
    { name: "Gallery", path: "/gallery" },
    { name: "Press", path: "/press" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo (left) */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Heritage Archives"
              className="h-20 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav (center) */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "text-[14px] uppercase tracking-wider font-semibold transition-colors",
                        isActive
                          ? "text-black"
                          : "text-black/70 hover:text-black",
                      ].join(" ")
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions (search + contact button) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="p-2 rounded-md hover:bg-black/5 text-black/70 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-9 px-4 rounded-sm bg-[#2f5d50] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#244a40] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-black/5 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden border-t border-black/10 bg-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between pb-3">
            <button
              type="button"
              className="p-2 rounded-md hover:bg-black/5 text-black/70 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center h-9 px-4 rounded-sm bg-[#2f5d50] text-white text-[12px] font-semibold uppercase tracking-wider"
            >
              Contact
            </Link>
          </div>

          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.name} className="border-t border-black/10">
                <NavLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block py-3 text-[12px] uppercase tracking-wider font-semibold transition-colors",
                      isActive ? "text-black" : "text-black/70 hover:text-black",
                    ].join(" ")
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
