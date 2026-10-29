import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://knotrun.io/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://knotrun.io${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-mono text-slate-400 ${className}`}>
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition"
              title="Return to Knotrun Home"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3 h-3 text-slate-600" />
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-amber-400 transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-amber-300 font-semibold" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
