import { useEffect, useState } from 'react'
import { key } from '../lib/constants'
import { createFlickr } from "flickr-sdk"
import { Data, ErrorException, Options, ReturnResponse, Shape } from '../types/useGetPhoto'

const METHOD = 'flickr.photos.getSizes'

function getData(data: [Shape]) {
  const photos: Shape | undefined = data.find(item => item.label === 'Medium')

    return {
      width: photos?.width,
      height: photos?.height,
      src: photos?.source
    }
}

export function useGetInfo(options: Options): ReturnResponse {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorException>(null)
  const [data, setData] = useState<Data>(null)

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      const { flickr } = createFlickr(key)
      
      try {
        const response = await flickr(METHOD, options)

        if (response.stat !== 'ok') {
          const message: string = response.status
          throw new Error(message)
        }

        const { sizes: { size } } = response

        setData(getData(size))
      } catch (e) {
        setError({ message: e })
      } finally {
        setLoading(false)
      }
    }

    if (!data || Object.values(data).length === 0 && !error) {
      fetchData()
    }
  }, [data, options, error])

  return { loading, error, data }
}