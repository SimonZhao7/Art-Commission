import Link from 'next/link'
import { Inter } from 'next/font/google'
// Components
import SearchBar from './SearchBar'
// React Icons
import { LuInbox } from 'react-icons/lu'
import { RiChat3Line } from 'react-icons/ri'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='bg-light-gray h-14 flex items-center justify-between px-5 fixed top-0 w-full'>
          <Link href={'/'}>Home</Link>
          <SearchBar />
          <div className='flex gap-4'>
            <LuInbox size={25} className='hover:cursor-pointer'/>
            <RiChat3Line size={25} className='hover:cursor-pointer' />
          </div>
        </nav>
        <div className='pt-14 h-full overflow-y-scroll'>
          {children}
        </div>
      </body>
    </html>
  )
}
