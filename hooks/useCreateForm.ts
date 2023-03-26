import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data }) {
      if (data?.insert_users_one) {
        const cacheId: string | undefined = cache.identify(
          data.insert_users_one
        )
        if (cacheId) {
          cache.modify({
            fields: {
              users(existingUsers, { toReference }) {
                return [toReference(cacheId), ...existingUsers]
              },
            },
          })
        }
      }
    },
  })
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])
  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value)
    },
    []
  )
  const printMsg = useCallback(() => {
    console.log('Hello')
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: username,
          },
        })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
      setUsername('')
    },
    [username, insert_users_one]
  )

  return {
    text,
    username,
    handleTextChange,
    handleUsernameChange,
    handleSubmit,
    printMsg,
  }
}
