import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="shortcut icon" href="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" type="image/x-icon" />
      </Head>
      <body className='w-full min-h-screen bg-zinc-900 overflow-x-hidden text-white scrollbar-thin scrollbar-thumb-zinc-700'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
