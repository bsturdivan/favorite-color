import { useEffect, useState } from 'react'
import { Flickr } from 'flickr-sdk'
import { Data, ErrorException, ReturnResponse } from '../types/useGetInfo'

const INFO_METHOD = 'flickr.people.getInfo'
const USER_METHOD = 'flickr.people.findByUsername'

export function useGetUserInfo(connection: Flickr): ReturnResponse {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorException>(null)
  const [data, setData] = useState<Data>(null)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const usernameResponse = await connection(USER_METHOD, { username })

        if (usernameResponse.stat !== 'ok') {
          const message: string = usernameResponse.status
          throw new Error(message)
        }

        const {
          user: { id },
        } = usernameResponse

        const { person, stat, status } = await connection(INFO_METHOD, { user_id: id })

        if (stat !== 'ok') {
          const message: string = status
          throw new Error(message)
        }

        setData({
          id,
          username: person.username._content,
          name: person.realname._content,
          url: person.profileurl._content,
          iconfarm: person.iconfarm,
          iconserver: person.iconserver,
        })
      } catch (e) {
        setError({ message: e })
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  const submit = (name: string) => {
    if (name) setUsername(name)
  }

  return { loading, error, data, submit }
}
