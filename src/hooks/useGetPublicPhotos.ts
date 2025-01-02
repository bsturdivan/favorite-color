import { useEffect, useState } from 'react'
import { Flickr } from 'flickr-sdk'
import {
  Data,
  DataItem,
  ErrorException,
  Options,
  ReturnResponse,
} from '../types/useGetPublicPhotos'

function getData(data: [DataItem]) {
  return data.map(item => ({
    title: item.title,
    url: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`,
  }))
}

export function useGetPublicPhotos(connection: Flickr, options: Options): ReturnResponse {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorException>(null)
  const [data, setData] = useState<Data>(null)

  const METHOD = options.user_id ? 'flickr.people.getPublicPhotos' : 'flickr.photos.getRecent'

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await connection(METHOD, options)

        if (response.stat !== 'ok') {
          const message: string = response.status
          throw new Error(message)
        }

        const {
          photos: { photo },
        } = response

        setData(getData(photo))
      } catch (e) {
        setError({ message: e })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)])

  return { loading, error, data }
}
