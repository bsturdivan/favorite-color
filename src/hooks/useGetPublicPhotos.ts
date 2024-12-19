import { useEffect, useState } from 'react'
import { key } from '../lib/constants'
import { createFlickr } from "flickr-sdk"
import { Data, ErrorException, Options, ReturnResponse } from '../types/useGetPublicPhotos'

const METHOD = 'flickr.people.getPublicPhotos'

function getData(data: [{ id: string; title: string }]) {
  return data.map(item => ({
    photoId: item.id,
    title: item.title,
  }))
}

export function useGetPublicPhotos(options: Options): ReturnResponse {
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

        const { photos: { photo } } = response

        setData({ items: getData(photo)})
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