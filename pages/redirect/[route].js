import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'


export default function route({ route }) {
  const router = useRouter()
  useEffect(() => {
    if (route === 'feed') router.push("/")
    else router.push(`/${route}`)
  }, [])
  return <Head><title>Banned.Social | loading</title></Head>
}

export async function getServerSideProps({ query: { route } }) {
  return { props: { route } }
}