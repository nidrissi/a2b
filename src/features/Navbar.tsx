import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";

type navbarLink = {
  to: string;
  icon: IconName;
  label: string;
  exact?: boolean;
};
const navbarLinks: navbarLink[] = [
  { to: "/", icon: "search", label: "Search", exact: true },
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
      } items-center gap-4 p-2 mb-3 bg-blue-100`}
    >
      <div className="flex-grow sm:flex-grow-0">
        <NavLink to="/" className="text-lg font-bold">
          arXiv2BibLaTeX
        </NavLink>
      </div>
      <div
        id="navbar-content"
        className={`grid grid-cols-1 sm:flex gap-3 ${expanded ? "" : "hidden"}`}
      >
        {navbarLinks.map((l) => (
          <NavLink
            to={l.to}
            exact={l.exact}
            className="text-gray-500 hover:text-black block"
          >
            <FontAwesomeIcon icon={l.icon} />
            &nbsp;{l.label}
          </NavLink>
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
