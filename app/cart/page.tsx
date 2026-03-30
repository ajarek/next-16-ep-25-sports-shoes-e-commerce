"use client"
import PremiumButton from "@/components/pixel-perfect/premium-button"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCartStore } from "@/store/cartStore"
import { Trash2 } from "lucide-react"
import Image from "next/image"

const CartPage = () => {
  const { items, removeItemFromCart, increment, decrement, total,removeAllFromCart } =
    useCartStore()
  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-start p-4'>
      <Table className='w-full'>
        <TableCaption className=''>
          {items.length === 0 ? (
            <span className='text-xl text-red-600 font-bold'>
              Your cart is empty
            </span>
          ) : (
            <div className='flex flex-wrap items-center justify-around px-4 gap-4'>
              <span className='text-xl text-background-foreground font-bold'>
                Total: ${total().toFixed(2)}
              </span>
              <Button
                variant='outline'
                onClick={() => removeAllFromCart()}
                className="text-base md:text-xl border-2 border-red-600 dark:border-red-600 cursor-pointer"
              >
                Remove All
              </Button>
              <PremiumButton
                link='/checkout'
                className='text-base md:text-xl text-background-foreground'
              >
                Checkout
              </PremiumButton>
            </div>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='max-sm:hidden'>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className='text-right'>Price</TableHead>
            <TableHead className='text-right'>Quantity</TableHead>
            <TableHead className='text-right'>Total</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='max-sm:hidden'>
                <div className='relative w-12 h-12 overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className='rounded-lg'
                  />
                </div>
              </TableCell>
              <TableCell>
                <p className='text-wrap'>{item.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {" "}
                  Size: {item.size}
                </p>
              </TableCell>
              <TableCell className='text-right'>
                ${item.price.toFixed(2)}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </Button>
                  <span className=''>{item.quantity}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => increment(item.id)}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell className='text-right'>
                ${(item.quantity * item.price).toFixed(2)}
              </TableCell>
              <TableCell className='text-right'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => removeItemFromCart(item.id)}
                >
                  <Trash2 className='size-5 text-red-600 cursor-pointer' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CartPage
