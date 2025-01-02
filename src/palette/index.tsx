import './palette.css'
import Color from './color'
import { useGetPublicPhotos } from '../hooks/useGetPublicPhotos'
import { Flickr } from 'flickr-sdk'
import { useGetPalette } from '../hooks/useGetPalette'
import { useEffect, useState } from 'react'
import { Data } from '../types/useGetInfo'
import classNames from 'classnames'

function Palette({ user, connection }: { user: Data | undefined; connection: Flickr }) {
  const [width, setWidth] = useState(100)
  const { data: userImages } = useGetPublicPhotos(connection, {
    user_id: user?.id || '',
    per_page: '15',
  })

  const { data: palette, loading } = useGetPalette(userImages)

  useEffect(() => {
    if (palette) {
      const totalPopulation = palette.reduce((total, current) => {
        return current.population + total
      }, 0)

      setWidth(totalPopulation)
    }
  }, [palette])

  return (
    <div className={classNames('palette', { 'palette--loading': loading })}>
      {palette?.length > 0 &&
        palette.map(swatch => (
          <Color
            key={swatch.hex}
            code={swatch.hex}
            width={`${(swatch.population / width) * 100}%`}
          />
        ))}
    </div>
  )
}

export default Palette
