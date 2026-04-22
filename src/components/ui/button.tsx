import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-brand text-brand-foreground shadow-glow hover:shadow-panel",
        hero: "bg-brand text-brand-foreground shadow-glow hover:shadow-panel",
        secondary: "border border-divider bg-surface text-foreground shadow-soft hover:border-brand/30 hover:bg-surface-strong hover:shadow-panel",
        outline: "border border-divider bg-transparent text-foreground shadow-none hover:border-brand/35 hover:bg-surface",
        soft: "bg-surface-muted text-foreground shadow-soft hover:bg-surface hover:shadow-panel",
        nav: "bg-transparent text-muted-foreground shadow-none hover:translate-y-0 hover:bg-surface hover:text-foreground",
        ghost: "text-foreground shadow-none hover:bg-surface-muted hover:translate-y-0",
        link: "h-auto rounded-none px-0 py-0 text-foreground shadow-none hover:translate-y-0 hover:text-brand",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
