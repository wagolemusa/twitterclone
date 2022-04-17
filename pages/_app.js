import '../styles/globals.css'
import '../lib/hexStytes.css'
import { TwitterProvider } from '../context/TweetContents'

function MyApp({ Component, pageProps }) {
  return (
    <TwitterProvider>
      <script src="https://cdn.tailwindcss.com"></script>
      <Component {...pageProps} />
    </TwitterProvider>
  )
  

}

export default MyApp
