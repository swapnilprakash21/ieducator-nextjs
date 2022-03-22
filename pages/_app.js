import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return <>
    <NextNProgress
      color="#007bff"
      startPosition={0.3}
      height={3}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
  </>
}

export default MyApp
