import { FlickrPhotosGetSizesParams } from "flickr-sdk"

interface DataResponse {
  width: number | undefined;
  height: number | undefined;
  src: string | undefined;
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataResponse | null
type ErrorException = ErrorResponse | null
type Options = FlickrPhotosGetSizesParams
type ReturnResponse = { data: Data; error: ErrorException; loading: boolean }
type Shape = { width: number; height: number; source: string; label: string }

export type { Data, Options, ErrorException, ReturnResponse, Shape }