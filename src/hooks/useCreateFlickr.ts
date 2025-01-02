import { useMemo } from 'react'
import { createFlickr, Flickr } from 'flickr-sdk'
import { key } from '../lib/constants'

export function useCreateFlickr(): Flickr {
  const connection = useMemo(() => {
    const { flickr } = createFlickr(key)
    return flickr
  }, [])

  return connection
}