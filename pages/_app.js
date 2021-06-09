import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return <>
    <Navbar />
    <div className="master-container">
      <Component {...pageProps} />
    </div>
    <Footer />
  </>
}

export default MyApp
