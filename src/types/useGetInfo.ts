import { FlickrPeopleFindByUsernameParams } from 'flickr-sdk'

interface DataResponse {
  id: string
  username: string
  name: string
  url: string
  iconserver: string
  iconfarm: number
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataResponse | null
type ErrorException = ErrorResponse | null
type Options = FlickrPeopleFindByUsernameParams
type ReturnResponse = {
  data: Data
  error: ErrorException
  loading: boolean
  submit: (arg0: string) => void
}

export type { Data, Options, ErrorException, ReturnResponse }
