import ThreedButton from "@/components/pixel-perfect/3d-button"
import TextVideo from "@/components/pixel-perfect/text-video"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center'>
      <div className='relative w-full lg:h-[594px] h-[400px] overflow-hidden '>
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 z-30 ">
          <TextVideo>We invite you to shop</TextVideo>
        </div>
        <Image
          src='/BANNER.png'
          alt='Hero'
          fill
          className='lg:object-cover object-contain hover:scale-110 transition-transform duration-800'
        />
        <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 '>
          <ThreedButton className='flex items-center justify-center gap-2'>
            <ShoppingBag className='md:size-6 size-4 mr-2' />
            Shop Now
          </ThreedButton>
        </div>
      </div>
    </div>
  )
}
