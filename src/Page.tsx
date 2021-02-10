import React, { useEffect } from "react";

export const Page: React.FC<{ title?: string }> = ({ title, children }) => {
  useEffect(() => {
    document.title = "arXiv2BibLaTeX" + (title ? " | " + title : "");
  }, [title]);
  return <>{children}</>;
};
