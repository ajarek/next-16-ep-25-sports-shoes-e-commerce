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
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const shoe = shoes.find((shoe) => shoe.id === Number(id))
  const [count, setCount] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { addItemToCart, items } = useCartStore()
  const { userId } = useAuth()
  const router = useRouter()

  if (!shoe) {
    return (
      <div className='flex h-[calc(100vh-64px)] items-center justify-center text-2xl font-bold'>
        Product not found
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        className: "bg-red-600 text-white text-xl",
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
        },
      })
      return
    }
    if (items.some((i) => i.id === Number(id))) {
      toast("Product is already in the cart", {
        className: "bg-red-600 text-white text-xl",
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
        },
      })
      router.push("/all")
      return
    }
    const cartItem: Product = {
      ...shoe,
      quantity: count,
      size: selectedSize || "",
      userId: userId || "",
    }
    addItemToCart(cartItem)
    toast.success("Item added to cart", {
      className: "bg-green-600 text-white text-xl",
      duration: 2000,
      position: "top-center",
      style: {
        backgroundColor: "#10b981",
        color: "white",
      },
    })
    router.push("/all")
  }

  return (
    <div className='min-h-[calc(100vh-64px)] w-full grid grid-cols-1 md:grid-cols-2 place-items-center p-4 md:p-8 gap-4'>
      <div className='relative  overflow-hidden rounded-lg shadow-xl'>
        <Image
          src={shoe?.image || ""}
          alt={shoe?.name || ""}
          height={535}
          width={428}
          className='object-cover hover:scale-110 transition-transform duration-800  shadow-xl'
          loading='eager'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{shoe?.name}</h1>
        <p>{shoe?.description}</p>
        <p className='text-2xl'>${shoe?.price}</p>
        <p>Category: {shoe?.category}</p>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Select Size</h2>
          <div className='flex flex-wrap gap-2'>
            {sizeData.map((size) => (
              <Button
                key={size.id}
                className={cn(
                  "bg-muted text-muted-foreground px-4 py-3 rounded-md cursor-pointer font-medium transition-all active:scale-95",
                  "md:h-12 h-8 w-8 md:w-12 text-md md:text-xl cursor-pointer hover:bg-transparent focus:bg-secondary/80 focus:text-secondary-foreground",
                )}
                style={{
                  boxShadow:
                    "0.444584px 0.444584px 0.628737px -1px rgba(0, 0, 0, 0.26), 1.21072px 1.21072px 1.71222px -1.5px rgba(0, 0, 0, 0.247), 2.6583px 2.6583px 3.75941px -2.25px rgba(0, 0, 0, 0.23), 5.90083px 5.90083px 8.34503px -3px rgba(0, 0, 0, 0.192), 10px 10px 21.2132px -3.75px rgba(0, 0, 0, 0.055), -0.5px -0.5px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 1px #FFFFFF, inset -1px -1px 1px rgba(0, 0, 0, 0.15)",
                }}
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
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>Quantity</h2>
          <div className='flex items-center gap-2'>
            <Button
              disabled={count === 1}
              onClick={() => setCount(count - 1)}
              className={cn(
                "bg-muted text-muted-foreground px-4 py-3 rounded-md cursor-pointer font-medium transition-all active:scale-95",
                "md:h-12 h-8 w-8 md:w-12 text-md md:text-xl cursor-pointer hover:bg-transparent",
              )}
              style={{
                boxShadow:
                  "0.444584px 0.444584px 0.628737px -1px rgba(0, 0, 0, 0.26), 1.21072px 1.21072px 1.71222px -1.5px rgba(0, 0, 0, 0.247), 2.6583px 2.6583px 3.75941px -2.25px rgba(0, 0, 0, 0.23), 5.90083px 5.90083px 8.34503px -3px rgba(0, 0, 0, 0.192), 10px 10px 21.2132px -3.75px rgba(0, 0, 0, 0.055), -0.5px -0.5px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 1px #FFFFFF, inset -1px -1px 1px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Minus className='size-6' />
            </Button>
            <span className='text-2xl'>{count}</span>
            <Button
              onClick={() => setCount(count + 1)}
              className={cn(
                "bg-muted text-muted-foreground px-4 py-3 rounded-md cursor-pointer font-medium transition-all active:scale-95",
                "md:h-12 h-8 w-8 md:w-12 text-md md:text-xl cursor-pointer hover:bg-transparent",
              )}
              style={{
                boxShadow:
                  "0.444584px 0.444584px 0.628737px -1px rgba(0, 0, 0, 0.26), 1.21072px 1.21072px 1.71222px -1.5px rgba(0, 0, 0, 0.247), 2.6583px 2.6583px 3.75941px -2.25px rgba(0, 0, 0, 0.23), 5.90083px 5.90083px 8.34503px -3px rgba(0, 0, 0, 0.192), 10px 10px 21.2132px -3.75px rgba(0, 0, 0, 0.055), -0.5px -0.5px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 1px #FFFFFF, inset -1px -1px 1px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Plus className='size-6' />
            </Button>
          </div>
          <Button
            className={cn(
              "bg-muted text-muted-foreground px-4 py-3 rounded-md cursor-pointer font-medium transition-all active:scale-95",
              "md:h-12 h-8 text-md md:text-xl cursor-pointer hover:bg-transparent",
            )}
            style={{
              boxShadow:
                "0.444584px 0.444584px 0.628737px -1px rgba(0, 0, 0, 0.26), 1.21072px 1.21072px 1.71222px -1.5px rgba(0, 0, 0, 0.247), 2.6583px 2.6583px 3.75941px -2.25px rgba(0, 0, 0, 0.23), 5.90083px 5.90083px 8.34503px -3px rgba(0, 0, 0, 0.192), 10px 10px 21.2132px -3.75px rgba(0, 0, 0, 0.055), -0.5px -0.5px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 1px #FFFFFF, inset -1px -1px 1px rgba(0, 0, 0, 0.15)",
            }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
