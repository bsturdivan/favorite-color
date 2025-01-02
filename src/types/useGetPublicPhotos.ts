import { FlickrPeopleGetPublicPhotosParams } from 'flickr-sdk'

type ImageSource = string | HTMLImageElement | Buffer

interface DataItem {
  id?: string
  title?: string
  server?: string
  secret?: string
  url: ImageSource
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataItem[] | null
type ErrorException = ErrorResponse | null
type Options = FlickrPeopleGetPublicPhotosParams
type ReturnResponse = { data: Data; error: ErrorException; loading: boolean }

export type { Data, DataItem, Options, ErrorException, ReturnResponse }
