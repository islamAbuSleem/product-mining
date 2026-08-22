type PriceRangeProps = {
  name?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
};

function PriceField({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-body-md text-secondary pointer-events-none">
        $
      </span>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        name={name}
        placeholder={placeholder}
        className="w-full border border-outline-variant rounded-sm bg-surface-container-lowest pl-6 pr-2 py-1.5 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

export function PriceRange({ name = "price", minPlaceholder = "Min", maxPlaceholder = "Max" }: PriceRangeProps) {
  return (
    <div className="flex items-center gap-sm">
      <PriceField name={`${name}-min`} placeholder={minPlaceholder} />
      <span className="text-body-md text-outline">&ndash;</span>
      <PriceField name={`${name}-max`} placeholder={maxPlaceholder} />
    </div>
  );
}
