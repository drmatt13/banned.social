import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// context
import socialContext from '../utils/socialContext'

// components
import Navbar from '../components/Navbar'
import ProtectedLayout from '../components/ProtectedLayout'

// global scss
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  // Active user_id
  const [user_id, setUser_id] = useState(null)

  // fix so [admin, email] dont populate
  // Users found from server requests { _id:  { firstName, lastName, profileAvatar, profileImage } }
  const [users, setUsers] = useState({
    '007': {
      'firstName': "james",
      'lastName': "bond",
      'profileAvatar': 7,
      'profileImage': false,
      '_id': '007'
    }
  })

  // check if mobile device
  const [mobile] = useState(
    typeof window !== 'undefined' ?
      /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      :
      null
  )

  // initialize router
  const router = useRouter()

  return <>
    <Head>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {/* open graph */}

      <meta property="og:site_name" content="Banned.Social" />
      <meta property="og:title" content="The most banned social media platform on earth." />
      {/* <meta property="og:description" content="" /> */}
      <meta property="og:image" content="/images/og-image.jpeg" />
      {/* URL color */}
      <meta name="theme-color" content="#3c374a" />
    </Head>
    <socialContext.Provider value={{ user_id, setUser_id, users, setUsers, mobile, router }}>
      <ProtectedLayout>
        <Navbar />
        <Component {...pageProps} />
      </ProtectedLayout>
    </socialContext.Provider>
  </>

}

export default MyApp