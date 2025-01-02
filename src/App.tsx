import './App.css'
import Palette from './palette'
import Header from './header'
import { useCreateFlickr } from './hooks/useCreateFlickr'
import { useGetUserInfo } from './hooks/useGetUserInfo'

function App() {
  const connection = useCreateFlickr()
  const { submit, data, loading, error } = useGetUserInfo(connection)

  return (
    <div className="color">
      <Palette user={data} connection={connection} />
      <Header onSubmit={submit} user={data} loading={loading} error={!!error} />
    </div>
  )
}

export default App
