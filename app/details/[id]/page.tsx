"use client"
import { Button } from "@/components/ui/button"
import shoes from "@/data/shoesData.json"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { use, useState } from "react"

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const shoe = shoes.find((shoe) => shoe.id === Number(id))
  const [count, setCount] = useState(1)
  return (
    <div className="min-h-[calc(100vh-64px)] w-full grid grid-cols-1 md:grid-cols-2 place-items-center p-4 md:p-8">
      <div className='relative  overflow-hidden'>
        <Image
          src={shoe?.image || ""}
          alt={shoe?.name || ""}
          height={535}
          width={428}
          className='object-cover hover:scale-110 transition-transform duration-800 rounded-lg shadow-xl'
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{shoe?.name}</h1>
        <p className="text-2xl">${shoe?.price}</p>
        <p>{shoe?.description}</p>
        <div className="flex items-center gap-2">
          <Button disabled={count === 1} onClick={() => setCount(count - 1)} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 w-8 md:w-12 cursor-pointer"><Minus className="size-6"/></Button>
          <span className="text-2xl">{count}</span>
          <Button onClick={() => setCount(count + 1)} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 w-8 md:w-12 cursor-pointer"><Plus className="size-6"/></Button>
        </div>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg   md:h-12 h-8 cursor-pointer">Add to cart</Button>
      </div>
    </div>
  )
}

export default DetailsPage