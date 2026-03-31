"use client"
import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import { SheetNav } from "./SheetNav"

import { LogIn, ShoppingCart, SportShoe, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { navLinks } from "@/data/nav-links"
import { useCartStore } from "@/store/cartStore"
const Navbar = () => {
  const pathname = usePathname()
  const cartItems = useCartStore((state) => state.items)
  const lengthItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <div className='h-16 w-full max-w-8xl mx-auto border-b-2 border-primary flex justify-between items-center px-4'>
      <Link href='/' className='flex items-center gap-2'>
        <SportShoe className='text-primary max-md:hidden' size={32} />
        <h1 className='text-xl md:text-2xl font-bold '>Sports Shoes</h1>
      </Link>
      <div className='flex items-center gap-4'>
        <div className='hidden lg:flex items-center gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 hover:text-primary transition-colors delay-300 rounded-md p-2",
                pathname === link.href && "bg-primary/20 dark:bg-primary/80",
              )}
            >
              {link.icon}
              <span className='text-sm font-medium uppercase'>
                {link.label}
              </span>
            </Link>
          ))}
        </div>
        <Link href='/cart' className='relative flex items-center gap-2'>
          <ShoppingCart className='text-primary size-8' />
          <span className='absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs'>
            {lengthItems}
          </span>
        </Link>

        <Show when='signed-out'>
          <SignInButton>
            <Button
              variant='outline'
              className=' p-2 rounded-md cursor-pointer border-2 border-green-500 hover:border-green-500/60 transition-colors delay-300'
            >
              <LogIn className='size-6' />
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              variant='outline'
              className=' p-2 rounded-md cursor-pointer border-2 border-blue-500 hover:border-blue-500/60 transition-colors delay-300'
            >
              <UserPlus className='size-6' />
            </Button>
          </SignUpButton>
        </Show>
        <Show when='signed-in'>
          <UserButton />
        </Show>
        <SheetNav />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
