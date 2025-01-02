import { Palette } from '@vibrant/color'
import { DataItem } from '../types/useGetPublicPhotos'
import { Vibrant } from 'node-vibrant/browser'
import { useEffect, useState } from 'react'

type PaletteItem = { population: number; hex: string }

export function useGetPalette(images: DataItem[]) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const [data, setData] = useState<PaletteItem[]>(null)

  useEffect(() => {
    setLoading(true)

    const sortSwatches = (palettes: Palette[]) => {
      return palettes.reduce((max, current: Palette) => {
        const temp: Palette = { ...current }
        if (max) {
          Object.keys(max).forEach(item => {
            temp[item] = max[item].population > current[item].population ? max[item] : current[item]
          })
        }

        return temp
      })
    }

    const getVibrant = async (image: DataItem) => {
      try {
        const palette: Palette = await Vibrant.from(image.url).getPalette()
        return palette
      } catch (e) {
        setError(e)
      }
    }

    const fetchData = async () => {
      try {
        const colors = await Promise.all(images.map(getVibrant))
        const reduced = sortSwatches(colors)
        const sorted = Object.values(reduced).sort((a, b) => b.population - a.population)
        setData(sorted)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    if (images?.length > 0) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(images)])

  return { loading, error, data }
}
