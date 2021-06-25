import { useContext } from 'react'
import Cookie from 'js-cookie'

// context
import socialContext from '../../utils/socialContext'

const Settings = () => {

  const { router } = useContext(socialContext)

  const logout = async () => {
    Cookie.remove('bearer')
    router.reload()
  }

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Settings
