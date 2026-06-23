import { cn } from "@/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
        green: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
        red: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
        blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        gray: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
