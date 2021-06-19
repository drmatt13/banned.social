import { useEffect, useContext } from 'react'

// context
import socialContext from '../../utils/socialContext'

const index = () => {

  const { users } = useContext(socialContext)

  useEffect(() => {
    console.log(users);
  }, [])

  return (
    <div>Coming Soon</div>
  )
}

export default index
