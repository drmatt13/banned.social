import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// context
import socialContext from '../utils/socialContext'

const MiniUserImage = ({ profile_id }) => {

  const { users } = useContext(socialContext)

  return <>
    <style jsx>{`
      .avatar-container {
        height: 48px;
        width: 48px;
        margin-right: 10px;
        border-radius: 50%;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: rgb(25, 144, 255, .75) 0px 0px 0px 2px;
      }
    `}</style>
    <Link href={`/redirect/${profile_id}`}>
      <div className="avatar-container f-center pointer no-select">
        {/* <Image className="avatar-image" src={`/images/avatars/${users[profile_id].profileAvatar}.jpg`} height={50} width={50} /> */}
        <img src={`/images/avatars/${users[profile_id].profileAvatar}.jpg`} />
      </div>
    </Link>
  </>
}

export default MiniUserImage
