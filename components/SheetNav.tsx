"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BookText, List } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { navLinks } from "@/data/nav-links"
import { cn } from "@/lib/utils"

export function SheetNav() {
  const pathname = usePathname()
  return (
    <Sheet>
      <Tooltip>
        <SheetTrigger asChild className='lg:hidden'>
          <TooltipTrigger asChild>
            <List className='size-6 cursor-pointer ' />
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent>
          <p>Menu</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent className='lg:hidden   opacity-75 overflow-y-auto sheet-content'>
        <SheetHeader>
          <SheetTitle className='text-xl font-semibold underline underline-offset-4'>
            <Link href='/' className='flex items-center gap-2'>
              <BookText className='text-primary' size={32} />
              E-Biblioteka
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col items-start gap-4 text-xl italic font-semibold p-4'>
          <div className='flex flex-col gap-8 lg:gap-12'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 hover:bg-primary/20 transition-colors rounded-md p-2",
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
