import { FlickrPeopleGetInfoParams } from "flickr-sdk"

interface DataResponse {
  username: string;
  name: string;
  url: string;
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataResponse | null
type ErrorException = ErrorResponse | null
type Options = FlickrPeopleGetInfoParams
type ReturnResponse = { data: Data; error: ErrorException; loading: boolean }

export type { Data, Options, ErrorException, ReturnResponse }