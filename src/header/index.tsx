import Search from './search'
import './header.css'
import { Data } from '../types/useGetInfo'
import UserInfo from './userInfo'

function Header({
  onSubmit,
  user,
  loading,
  error,
}: {
  onSubmit: (arg0: string) => void
  user: Data
  loading: boolean
  error: boolean
}) {
  return (
    <header className="header">
      <UserInfo user={user} loading={loading} />
      <Search onSubmit={onSubmit} error={error} />
    </header>
  )
}

export default Header
