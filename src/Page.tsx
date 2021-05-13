import React, { useEffect } from "react";

export const Page: React.FC<{ title: string }> = ({ title, children }) => {
  useEffect(() => {
    document.title = "arXiv2BibLaTeX" + (title ? " | " + title : "");
  }, [title]);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      {children}
    </div>
  );
};
