import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className='h-[calc(100vh-64px)] w-full mx-auto  container flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center text-center gap-6'>
        <h1 className='text-4xl font-serif text-primary mt-4'>
          Page not found!
        </h1>

        <p className='max-w-lg  text-lg px-4'>
          The page you are trying to access is not available or the address is
          incorrect. Try going to the home page or check the correctness of the
          URL address.
        </p>

        <div className='flex gap-3'>
          <Link href='/'>
            <Button className='rounded-xl  cursor-pointer'>Home page</Button>
          </Link>
        </div>

        <p className=''>
          Error code: <span className='text-primary text-2xl'>404</span>
        </p>
      </div>
    </main>
  )
}
