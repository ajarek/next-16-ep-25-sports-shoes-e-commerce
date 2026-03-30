"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Wallet,
  Truck,
  ShieldCheck,
  Lock,
  ChevronRight,
} from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const CheckoutPage = () => {
  const { items, total, removeAllFromCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timeout);
  }, [])

  const subtotal = total()
  const shipping = items.length > 0 ? 10 : 0
  const taxes = subtotal * 0.05
  const finalTotal = subtotal + shipping + taxes

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment successful", {
      position: "top-center",
      duration: 4000,
    })
    setTimeout(() => {
      removeAllFromCart()
      router.push("/")
    }, 2000)
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className='min-h-[calc(100vh-64px)] bg-muted/20 pb-20'>
      <div className='max-w-7xl mx-auto px-4 pt-8 md:pt-12'>
        <div className='mb-8'>
          <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight mb-2'>
            Checkout
          </h1>
          <p className='text-muted-foreground'>Complete your order securely.</p>
        </div>

        <form onSubmit={handlePayment} className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* Main Checkout Form */}
          <div className='lg:col-span-7 xl:col-span-8 space-y-8'>
            {/* Contact Info */}
            <Card className='border-none shadow-lg shadow-black/5 bg-background dark:bg-card'>
              <CardHeader>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold'>
                    1
                  </span>
                  Contact Information
                </CardTitle>
                <CardDescription>
                  We&apos;ll use this to update you on your order.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='john.doe@example.com'
                    className='focus-visible:ring-primary'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='+1 (555) 000-0000'
                    className='focus-visible:ring-primary'
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className='border-none shadow-lg shadow-black/5 bg-background dark:bg-card'>
              <CardHeader>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold'>
                    2
                  </span>
                  Shipping Details
                </CardTitle>
                <CardDescription>
                  Where should we send your new gear?
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='first-name'>First Name</Label>
                    <Input id='first-name' placeholder='John' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='last-name'>Last Name</Label>
                    <Input id='last-name' placeholder='Doe' required />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Street Address</Label>
                  <Input id='address' placeholder='123 Sneaker St, Apt 4B' required />
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input id='city' placeholder='New York' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>State/Province</Label>
                    <Input id='state' placeholder='NY' required />
                  </div>
                  <div className='space-y-2 col-span-2 lg:col-span-1'>
                    <Label htmlFor='zip'>ZIP / Postal Code</Label>
                    <Input id='zip' placeholder='10001' required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className='border-none shadow-lg shadow-black/5 bg-background dark:bg-card overflow-hidden'>
              <div className='bg-primary/5 p-6 border-b border-border/50'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold'>
                    3
                  </span>
                  Payment Method
                </CardTitle>
                <CardDescription className='mt-1.5'>
                  All transactions are secure and encrypted.
                </CardDescription>
              </div>
              <CardContent className='p-6 pt-6'>
                <RadioGroup
                  defaultValue='card'
                  onValueChange={setPaymentMethod}
                  className='space-y-3'
                >
                  {/* Credit Card */}
                  <div
                    className={`flex items-center justify-between rounded-lg border-2 p-4 transition-all cursor-pointer ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"}`}
                  >
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem
                        value='card'
                        id='card'
                        className='sr-only'
                      />
                      <Label
                        htmlFor='card'
                        className='flex items-center gap-3 cursor-pointer w-full text-base font-medium'
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "card" ? "border-primary" : "border-muted-foreground"}`}
                        >
                          {paymentMethod === "card" && (
                            <div className='w-2 h-2 rounded-full bg-primary' />
                          )}
                        </div>
                        <CreditCard className='w-5 h-5 text-primary' />
                        Credit Card
                      </Label>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div
                    className={`flex items-center justify-between rounded-lg border-2 p-4 transition-all cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"}`}
                  >
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem
                        value='paypal'
                        id='paypal'
                        className='sr-only'
                      />
                      <Label
                        htmlFor='paypal'
                        className='flex items-center gap-3 cursor-pointer w-full text-base font-medium'
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "paypal" ? "border-primary" : "border-muted-foreground"}`}
                        >
                          {paymentMethod === "paypal" && (
                            <div className='w-2 h-2 rounded-full bg-primary' />
                          )}
                        </div>
                        <Wallet className='w-5 h-5 text-[#00457C]' />
                        PayPal
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {/* Card input details (show only if card chosen) */}
                {paymentMethod === "card" && (
                  <div className='mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300'>
                    <div className='space-y-2'>
                      <Label htmlFor='card-number'>Card Number</Label>
                      <Input
                        id='card-number'
                        placeholder='0000 0000 0000 0000'
                        required
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='exp'>Expiration Date</Label>
                        <Input id='exp' placeholder='MM/YY' required />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='cvc'>CVC</Label>
                        <Input id='cvc' placeholder='123' required />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='name-on-card'>Name on Card</Label>
                      <Input id='name-on-card' placeholder='John Doe' required />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className='lg:col-span-5 xl:col-span-4 sticky top-24'>
            <Card className='border border-border/50 shadow-xl shadow-black/10 bg-background/60 backdrop-blur-xl dark:bg-card/80 overflow-hidden'>
              <CardHeader className='pb-4 border-b border-border/50 bg-muted/30'>
                <CardTitle className='text-xl'>Order Summary</CardTitle>
                <CardDescription>
                  Review your items before processing.
                </CardDescription>
              </CardHeader>
              <CardContent className='p-0'>
                {items.length === 0 ? (
                  <div className='p-6 text-center text-muted-foreground'>
                    Your cart is empty.
                  </div>
                ) : (
                  <div className='max-h-[350px] overflow-y-auto p-6 space-y-4 custom-scrollbar'>
                    {items.map((item) => (
                      <div key={item.id} className='flex items-start gap-4'>
                        <div className='relative w-16 h-16 rounded-md overflow-hidden shrink-0 border border-border/50 bg-muted'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-sm line-clamp-2 leading-tight'>
                            {item.name}
                          </p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className='font-bold text-sm shrink-0'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <div className='p-6 bg-muted/10 space-y-4 border-t border-border/50'>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span>Tax (Estimated)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className='flex items-center justify-between font-bold text-lg'>
                  <span>Total</span>
                  <span className='text-primary'>${finalTotal.toFixed(2)}</span>
                </div>

                <div className='pt-4'>
                  <Button  
                  className={cn(
                    "bg-muted text-muted-foreground px-4 py-3 rounded-md cursor-pointer font-medium transition-all active:scale-95",
                    "md:h-12 h-8 text-md md:text-xl cursor-pointer hover:bg-transparent"
                  )}
                  style={{
                    boxShadow:
                      "0.444584px 0.444584px 0.628737px -1px rgba(0, 0, 0, 0.26), 1.21072px 1.21072px 1.71222px -1.5px rgba(0, 0, 0, 0.247), 2.6583px 2.6583px 3.75941px -2.25px rgba(0, 0, 0, 0.23), 5.90083px 5.90083px 8.34503px -3px rgba(0, 0, 0, 0.192), 10px 10px 21.2132px -3.75px rgba(0, 0, 0, 0.055), -0.5px -0.5px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 1px #FFFFFF, inset -1px -1px 1px rgba(0, 0, 0, 0.15)",
                  }} 
                  type="submit"
                  >
            
          
                    <Lock className='w-4 h-4' />
                    Pay ${finalTotal.toFixed(2)}
                    <ChevronRight className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                  </Button>
                </div>

                <div className='grid grid-cols-2 gap-4 pt-4 text-xs text-center text-muted-foreground/80'>
                  <div className='flex flex-col items-center justify-center gap-1.5'>
                    <ShieldCheck className='w-6 h-6 text-foreground/50' />
                    <span>
                      Secure
                      <br />
                      Checkout
                    </span>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1.5'>
                    <Truck className='w-6 h-6 text-foreground/50' />
                    <span>
                      Fast
                      <br />
                      Delivery
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
