"use client"
import { Button } from "@/components/ui/button"
import shoes from "@/data/shoesData.json"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { use, useState } from "react"
import { sizeData } from "@/data/sizeData"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types/typeProduct"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const shoe = shoes.find((shoe) => shoe.id === Number(id))
  const [count, setCount] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const {addItemToCart} = useCartStore()
  const {userId} = useAuth()
  const router = useRouter()

  if (!shoe) {
    return <div className="flex h-[calc(100vh-64px)] items-center justify-center text-2xl font-bold">Product not found</div>
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size")
      return
    }
   const cartItem:Product = {
    ...shoe,
    quantity: count,
    size: selectedSize || "",
    userId: userId || "",
   }
   addItemToCart(cartItem)
   toast.success("Item added to cart")
   router.push("/all")
  }

  return (
    <div className='min-h-[calc(100vh-64px)] w-full grid grid-cols-1 md:grid-cols-2 place-items-center p-4 md:p-8'>
      <div className='relative  overflow-hidden rounded-lg shadow-xl'>
        <Image
          src={shoe?.image || ""}
          alt={shoe?.name || ""}
          height={535}
          width={428}
          className='object-cover hover:scale-110 transition-transform duration-800  shadow-xl'
          loading="eager"
        />
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{shoe?.name}</h1>
        <p>{shoe?.description}</p>
        <p className='text-2xl'>${shoe?.price}</p>
        <p>Category: {shoe?.category}</p>
        {/*select size*/}
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Select Size</h2>
          <div className='flex flex-wrap gap-2'>
            {sizeData.map((size) => (
              <Button
                key={size.id}
                className='bg-muted text-muted-foreground hover:bg-muted/80 md:text-xl text-md   md:h-12 h-8 w-8 md:w-12 cursor-pointer focus:bg-secondary/80 focus:text-secondary-foreground'
                onClick={() => setSelectedSize(size.size)}
              >
                {size.size}
              </Button>
            ))}
            {selectedSize && (
              <p className='text-xl'>Selected Size: {selectedSize}</p>
            )}
          </div>
        </div>
        {/*quantity*/}
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Quantity</h2>
          <div className='flex items-center gap-2'>
            <Button
              disabled={count === 1}
              onClick={() => setCount(count - 1)}
              className='bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 w-8 md:w-12 cursor-pointer'
            >
              <Minus className='size-6' />
            </Button>
            <span className='text-2xl'>{count}</span>
            <Button
              onClick={() => setCount(count + 1)}
              className='bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 w-8 md:w-12 cursor-pointer '
            >
              <Plus className='size-6' />
            </Button>
          </div>
          <Button className='bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 cursor-pointer' onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
