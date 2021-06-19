import { useState, useRef } from 'react'
import Head from 'next/head'

// context
import socialContext from '../utils/socialContext'

// components
import Navbar from '../components/Navbar'
import ProtectedLayout from '../components/ProtectedLayout'
import Footer from '../components/Footer'

// global scss
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  // Active user_id
  const [user_id, setUser_id] = useState(null)

  // fix so [admin, email] dont populate
  // Users found from server requests { _id:  { firstName, lastName, profileAvatar, profileImage } }
  const [users] = useState({ '007': { 'firstName': "james", 'lastName': "bond", 'profileAvatar': 7, 'profileImage': true } })

  // check if mobile device
  const [mobile] = useState(
    typeof window !== 'undefined' ? 
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : 
    null
  )

  return <>
    <Head>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </Head>
    <socialContext.Provider value={{ user_id, setUser_id, users, mobile }}>
      <ProtectedLayout>
        <Navbar />
        <Component {...pageProps} />
      </ProtectedLayout>
    </socialContext.Provider>
    <Footer />
  </>

}

export default MyApp