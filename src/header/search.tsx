import { FormEvent, useEffect, useRef } from 'react'
import Camera from './Camera'
import './header.css'

function Search({ error, onSubmit }: { error: boolean; onSubmit: (arg0: string) => void }) {
  const searchItem = useRef(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const username = formData.get('search') as string

    if (username) onSubmit(username)
  }

  useEffect(() => {
    if (error) {
      searchItem.current.value = ''
      searchItem.current.placeholder = 'User not found'
    }
  }, [error])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        ref={searchItem}
        type="text"
        name="search"
        className="search__input"
        placeholder="Flickr username"
      />
      <button type="submit">
        <Camera />
      </button>
    </form>
  )
}

export default Search
