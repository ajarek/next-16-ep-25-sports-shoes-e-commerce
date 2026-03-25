import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import shoes from "@/data/shoesData.json"

export default function AllShoes() {
  return (
   <div>
    <h1>All Shoes</h1>
    <Button>Start Shopping</Button>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">  
{shoes.map((shoe) => (
  <div key={shoe.id}>
    <Image src={shoe.image} alt={shoe.name} width={200} height={200} />
    <p>{shoe.name}</p>

    </div>
))}
    </div>
   </div>
  );
}