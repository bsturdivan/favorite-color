import { useEffect, useState } from 'react'

function Color({ code, width }: { code: string; width: string }) {
  const [dimension, setDimension] = useState('width')
  const mediaQuery = window.matchMedia('(max-width: 820px)')
  const handleResize = () => (mediaQuery.matches ? setDimension('height') : setDimension('width'))
  mediaQuery.addEventListener('change', handleResize)

  useEffect(() => {
    handleResize()
  }, [])

  return <div className="palette__color" style={{ backgroundColor: code, [dimension]: width }} />
}

export default Color
