import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

const Settings = ({ user_id, setUser_id, setModal }) => {

  const router = useRouter()

  const logout = () => {
    setUser_id(null)
    setModal(null)
    Cookie.remove('bearer')
    router.push('/login')
  }

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Settings
