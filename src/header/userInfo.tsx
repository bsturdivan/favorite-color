import classNames from 'classnames'
import { Data } from '../types/useGetInfo'
import Avatar from './avatar'
import './header.css'

function UserInfo({ user, loading }: { user: Data; loading: boolean }) {
  return (
    <a
      href={user?.url}
      target="_blank"
      rel="noindex, nofollow"
      className={classNames('user-info', { 'user-info--loading': !user || loading })}
    >
      <figure className="user-info__figure">
        <Avatar user={user} />

        <figcaption className="user-info__container">
          <h2 className="user-info__name">{user?.name}</h2>
          <p className="user-info__username">@{user?.username}</p>
        </figcaption>
      </figure>
    </a>
  )
}

export default UserInfo
