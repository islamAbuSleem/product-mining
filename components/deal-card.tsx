"use client";

import { GlassCard } from "./ui/card";
import { Badge } from "./ui/badge";
import { Icon } from "./ui/icon";

type DealCardProps = {
  rank?: number;
  merchant: string;
  title: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  dropLabel?: string;
  href: string;
};

export function DealCard({
  rank,
  merchant,
  title,
  imageUrl,
  price,
  originalPrice,
  dropLabel,
  href,
}: DealCardProps) {
  return (
    <GlassCard className="flex flex-col relative overflow-hidden group cursor-pointer h-full">
      <div className="absolute top-0 left-0 right-0 p-3 z-10 flex justify-between items-start pointer-events-none">
        {typeof rank === "number" ? (
          <div className="pointer-events-auto">
            <Badge variant="rank" rank={rank} />
          </div>
        ) : (
          <span></span>
        )}
        <button
          type="button"
          aria-label="Save Deal"
          className="bg-surface-container-lowest/80 backdrop-blur-sm text-outline hover:text-primary transition-colors p-1.5 rounded-full shadow-sm pointer-events-auto inline-flex items-center justify-center leading-none"
        >
          <Icon name="bookmark" />
        </button>
      </div>
      <div className="h-48 bg-surface-container-low relative w-full overflow-hidden border-b border-outline-variant">
        <img
          alt={title}
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Icon name="storefront" size={14} className="text-secondary" />
            <span className="text-label-md text-secondary">{merchant}</span>
          </div>
          <h3 className="text-title-lg text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <div className="mt-auto">
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-headline-md text-primary">{price}</span>
              {originalPrice ? (
                <span className="text-label-md text-outline line-through">{originalPrice}</span>
              ) : null}
            </div>
            {dropLabel ? (
              <span className="text-label-sm text-green-600 font-bold">{dropLabel}</span>
            ) : null}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="w-full bg-primary text-on-primary font-title-md text-title-md py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            View Deal
            <Icon name="open_in_new" size={18} />
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
