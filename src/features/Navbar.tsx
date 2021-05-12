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
      } items-center gap-8 p-3 mb-3 bg-indigo-900`}
    >
      <div className="flex-grow sm:flex-grow-0">
        <Link to="/" className="text-xl text-white">
          arXiv2BibLaTeX
        </Link>
      </div>
      <div
        id="navbar-content"
        className={`grid grid-cols-1 sm:flex gap-6 ${expanded ? "" : "hidden"}`}
      >
        {navbarLinks.map((l) => (
          <Link to={l.to} className="text-gray-400 hover:text-white block">
            <FontAwesomeIcon icon={l.icon} />
            &nbsp;{l.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-none sm:hidden justify-end">
        <button
          className="border-gray-500 border rounded-sm cursor-pointer py-1 px-2"
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
