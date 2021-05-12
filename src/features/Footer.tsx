import React from "react";

/** A basic footer that contains version information, licence, and a link to the source. */
const Footer: React.FC<{}> = () => {
  const version = process.env
    .REACT_APP_VERSION!.replace("-alpha", "ɑ")
    .replace("-beta", "β");
  const sha = process.env.REACT_APP_GITHUB_SHA;

  return (
    <footer className="text-center text-gray-500">
      <hr />
      <p>
        arXiv2BibLaTeX <span title={`Commit: ${sha}`}>v{version}</span> •
        licensed under AGPLv3 •{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/nidrissi/a2b"
        >
          source
        </a>
      </p>
    </footer>
  );
};

export default Footer;
