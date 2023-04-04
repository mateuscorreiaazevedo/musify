import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { Layout } from '@/main/layout'
import { PlaybackProvider } from '@/modules/core'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PlaybackProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </PlaybackProvider>
    </SessionProvider>
  )
}
