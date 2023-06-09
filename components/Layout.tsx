import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  children: ReactNode
  title: string
}

export const Layout = ({
  children,
  title = 'Welcome to Next.js',
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-noto">
      <Head>
        <title> {title} </title>
      </Head>
      <header>
        <nav className="bg-element w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  Home
                </a>
              </Link>
              <Link href="/local-state-a">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  Local State
                </a>
              </Link>
              <Link href="/hasura-main">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  Fetch Policy
                </a>
              </Link>
              <Link href="/hasura-crud">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  CRUD
                </a>
              </Link>
              <Link href="/hasura-ssg">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  SSG ISR
                </a>
              </Link>
              <Link href="/hooks-memo">
                <a className="text-white hover:bg-accent px-3 py-2 rounded">
                  Custom Hook
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}
