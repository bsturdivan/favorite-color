import { FlickrPhotosGetRecentParams } from "flickr-sdk"

interface DataItem {
  photoId: string;
  title: string
}

interface DataResponse {
  items: DataItem[]
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataResponse | null
type ErrorException = ErrorResponse | null
type Options = FlickrPhotosGetRecentParams
type ReturnResponse = { data: Data; error: ErrorException; loading: boolean }

export type { Data, Options, ErrorException, ReturnResponse }