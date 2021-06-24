import { useEffect, useContext } from 'react'
import Head from 'next/head'

// components
import Loading from '../../components/Loading'

// context
import socialContext from '../../utils/socialContext'

const index = () => {

  const { users } = useContext(socialContext)

  useEffect(() => {
    console.log(users);
  }, [])

  return <>
    <Head>
      <title>Banned.Social | News</title>
    </Head>
    <Loading />
  </>
}

export default index
