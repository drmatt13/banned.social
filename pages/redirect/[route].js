import { useEffect } from 'react'
import { useRouter } from 'next/router' 

export default function route({ route }) {
  const router = useRouter()
  useEffect(() => {
    if (route === 'feed') router.push("/")
    else router.push(`/${route}`)
  }, [])
  return <></>
}

export async function getServerSideProps({ query: { route } }) {
  return {props: {route}}
}