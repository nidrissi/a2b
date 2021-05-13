import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCog,
  faQuestion,
  faSearch,
  faTools,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type navbarLink = {
  to: string;
  icon: IconDefinition;
  label: string;
  exact?: boolean;
};
const navbarLinks: navbarLink[] = [
  { to: "/", icon: faSearch, label: "Search", exact: true },
  { to: "/diy", icon: faTools, label: "DIY" },
  { to: "/settings", icon: faCog, label: "Settings" },
  { to: "/help", icon: faQuestion, label: "Help" },
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
          <NavLink
            key={l.to}
            to={l.to}
            exact={l.exact}
            className="block p-3 text-lg"
            activeClassName="font-semibold"
          >
            <FontAwesomeIcon icon={l.icon} />
            &nbsp;{l.label}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-none sm:hidden justify-end">
        <button
          className="cursor-pointer p-3 text-lg"
          onClick={() => setExpanded(!expanded)}
          title="Expand the navbar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
