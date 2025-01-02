import { Data } from '../types/useGetInfo'
import './header.css'

function Avatar({ user }: { user: Data }) {
  return (
    <img
      src={`http://farm${user?.iconfarm}.staticflickr.com/${user?.iconserver}/buddyicons/${user?.id}_r.jpg`}
      className="avatar"
      width={84}
      height={84}
    />
  )
}

export default Avatar
