import {useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// components
import Modal from '../../../components/Modal'
import UpdateProfileImage from '../../../components/modals/UpdateProfileImage'

// context
import socialContext from '../../../utils/socialContext'

const index = () => {

  const { users, user_id } = useContext(socialContext)

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const redirect = async () => {
    await router.push('/')
  }

  useEffect(() => {
    if (users[user_id].profileAvatar > 0) redirect()
    else setLoading(false) 
  }, [])

  return <>
    {loading && <>loading</>}
    {!loading && <>
      <Modal exitBtn={false}>
        <UpdateProfileImage />
      </Modal>
    </>}
  </>
}

export default index