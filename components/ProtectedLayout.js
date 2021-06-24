import { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

// context
import socialContext from '../utils/socialContext'
import Loading from './Loading'

const ProtectedLayout = ({ children }) => {

  const { users, setUser_id, router } = useContext(socialContext)

  // add a custom loader later
  const [loading, setLoading] = useState(true)

  // redirect and remove cookie if nessessary on initial page load
  const UnauthedRedirect = async () => {
    Cookies.remove('bearer')
    if (!['/login', '/register', '/post/[id]', '/news/[id]'].includes(router.pathname)) await router.push('/login')
    setLoading(false);
  }

  // auth bearer cookie on app start
  const authUser = async () => {

    try {
      const res = await axios.post(`${process.env.URL}/api/eventbus`, {
        service: "get user"
      }, { withCredentials: true });
      if (res.data.success) {
        const id = res.data.user._id
        users[id] = res.data.user
        setUser_id(id)

        if (users[id].profileAvatar === 0) await router.push('/register/configure')

        setLoading(false)
      }
      else UnauthedRedirect()
    } catch (error) { UnauthedRedirect() }
  }

  useEffect(() => {
    if (Cookies.get('bearer')) authUser();
    else UnauthedRedirect();
  }, [])

  return <div className="master-container" style={{ position: 'relative' }}>
    {loading ? <>
      <Loading />
    </> : <>
      {children}
    </>}
  </div>
}

export default ProtectedLayout
