import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";

type navbarLink = {
  to: string;
  icon: IconName;
  label: string;
};
const navbarLinks: navbarLink[] = [
  { to: "/", icon: "search", label: "Search" },
  { to: "/diy", icon: "tools", label: "DIY" },
  { to: "/settings", icon: "cog", label: "Settings" },
  { to: "/help", icon: "question", label: "Help" },
];

/** A react-router powered navigation bar. */
const Navbar: React.FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`sticky top-0 w-full ${
        expanded ? "grid grid-cols-1" : "flex"
      } items-center gap-4 mb-3 bg-white text-black z-50`}
    >
      <div className="flex-grow sm:flex-grow-0">
        <Link to="/" className="p-3 text-2xl font-semibold">
          arXiv2BibLaTeX
        </Link>
      </div>
      <div
        id="navbar-content"
        className={`grid grid-cols-1 sm:flex gap-2 ${expanded ? "" : "hidden"}`}
      >
        {navbarLinks.map((l) => (
          <Link to={l.to} className="block p-3 text-lg">
            <FontAwesomeIcon icon={l.icon} />
            &nbsp;{l.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-none sm:hidden justify-end">
        <button
          className="cursor-pointer p-3 text-lg"
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
