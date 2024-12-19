import './App.css'
import Palette from './palette'
import { useFindByUsername } from './hooks/useFindByUsername'

function App() {
  const { data, loading, error } = useFindByUsername({ username: 'chrispauljack' })

  if (!loading) {
    console.log(data, error)
  }

  return (
    <>
      <Palette />
    </>
  )
}

export default App
