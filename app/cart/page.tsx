"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useCartStore} from '@/store/cartStore'
import Image from "next/image"

const CartPage = () => {
  const {items, removeItemFromCart, increment, decrement, total} = useCartStore()
  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-start p-4'>
<Table className="w-full">
  <TableHeader>
    <TableRow>
      <TableHead>Image</TableHead>
      <TableHead>Product</TableHead>
      <TableHead className="text-right">Price</TableHead>
      <TableHead className="text-right">Quantity</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell >
            <div className="relative w-12 h-12 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="rounded-lg" />
            </div>
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
        <TableCell className="text-right">{item.quantity}</TableCell>
        <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  )
}

export default CartPage