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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild size='icon' className='bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg  md:h-12 h-8 w-8 md:w-12 cursor-pointer'>
                      <Link href={`/details/${shoe.id}`}>
                        <ShoppingCart className='size-6 md:size-8' />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-lg'>Add to cart</p>
                  </TooltipContent>
                </Tooltip>
               
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
