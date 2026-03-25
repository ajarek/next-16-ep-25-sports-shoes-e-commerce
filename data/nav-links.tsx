import { CreditCard, Home, Mars, Venus, ShoppingCart, Footprints } from "lucide-react"

export const navLinks = [
  { href: "/all", label: "All", icon: <Footprints /> },
  { href: "/men", label: "Man", icon: <Mars /> },
  { href: "/women", label: "Woman", icon: <Venus /> },
  { href: "/cart", label: "Cart", icon: <ShoppingCart /> },
  { href: "/checkout", label: "Checkout", icon: <CreditCard /> },
]