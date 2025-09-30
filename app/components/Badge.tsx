type Variant = 'red';

interface BadgeProps {
  className?: string;
  text: string;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  red: 'text-washed-red bg-washed-red/10 border-l border-washed-red',
};

export function Badge({className, text, variant = 'red'}: BadgeProps) {
  return (
    <p
      className={`flex items-center justify-center font-medium w-max !py-0.5 !pl-1.5 !pr-1 ${variants[variant]} ${className}`}
    >
      <span className="block text-[11px] leading-[15px]">{text}</span>
    </p>
  );
}
