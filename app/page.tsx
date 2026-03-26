import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
   <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
    <div className="relative w-full lg:h-[594px] h-[250px] overflow-hidden ">
    <Image src="/BANNER.png" alt="Hero" fill className="object-cover hover:scale-110 transition-transform duration-800" />
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
      <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/80 md:text-xl text-lg px-8  md:h-12 h-8 cursor-pointer">
      <Link href="/all"><ShoppingBag className="md:size-6 size-4 mr-2"/>Shop Now</Link></Button>
    </div>
    </div>
   </div>
  );
}
