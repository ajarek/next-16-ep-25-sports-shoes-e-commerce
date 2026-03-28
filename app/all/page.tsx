import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import shoes from "@/data/shoesData.json"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, ShoppingCart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import PremiumButton from "@/components/pixel-perfect/premium-button"

export default function AllShoes() {
  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-start gap-4 p-4 md:p-8'>
      <h1 className="text-2xl">All Shoes</h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
        {shoes.map((shoe) => (
          <Card
            key={shoe.id}
            className='w-full rounded-lg overflow-hidden p-0 shadow-xl '
          >
            <div className='relative w-full h-80 overflow-hidden'>
              <Image
                src={shoe.image}
                alt={shoe.name}
                fill
                className='object-cover hover:scale-110 transition-transform duration-800'
              />
            </div>
            <CardHeader></CardHeader>
            <CardContent className='flex flex-col gap-2 pb-4'>
              <CardTitle>{shoe.name}</CardTitle>
              <CardDescription className='text-2xl '>
                ${shoe.price}
              </CardDescription>
              <CardAction className='w-full flex justify-end gap-2'>
                <PremiumButton link={`/details/${shoe.id}`}>
                  <ShoppingCart className='size-6 md:size-8' />
                </PremiumButton>
               
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
