import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'

import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
  Mutation_RootDelete_Users_By_PkArgs,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { UserItem } from '../components/UserItem'

const schema = z.object({
  editedUserName: z.string().min(1, { message: '※入力必須の項目です。' }),
})
type Schema = z.infer<typeof schema>

type EditedUser = {
  id: string
  name: string
}

const HasuraCRUD = (): JSX.Element => {
  const [editedUser, setEditedUser] = useState<EditedUser>({ id: '', name: '' })
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Schema>({
    defaultValues: { editedUserName: '' },
    resolver: zodResolver(schema),
  })

  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)
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
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data }) {
      if (data) {
        cache.modify({
          fields: {
            users(existingUsers, { readField }) {
              return existingUsers.filter(
                (user: EditedUser) =>
                  data.delete_users_by_pk?.id !== readField('id', user)
              )
            },
          },
        })
      }
    },
  })

  const onSubmit: SubmitHandler<Schema> = async (data, e) => {
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
      setEditedUser({ id: '', name: '' })
      setValue('editedUserName', '')
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
      setEditedUser({ id: '', name: '' })
      setValue('editedUserName', '')
    }
  }

  const onError: SubmitErrorHandler<Schema> = (errors, e) => {
    //console.log(errors, e)
  }

  // const editedUserNameValue = watch('editedUserName')
  // console.log('editedUserNameValue', editedUserNameValue)
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name === 'editedUserName' &&
        value?.editedUserName &&
        value?.editedUserName !== editedUser.name
      ) {
        setEditedUser({ ...editedUser, name: value.editedUserName })
      }
      console.log(value, name, type)
    })
    return () => subscription.unsubscribe()
  }, [watch, editedUser])

  return (
    <Layout title="Hasura CRUD">
      <h1 className="mb-8 text-3xl font-bold text-primary">Hasura CRUD</h1>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex">
          <input
            className="mb-6 px-3 py-2 border border-gray-300"
            placeholder="new user ?"
            {...register('editedUserName')}
          />
          <button
            disabled={!editedUser.name}
            className="disabled:opacity-40 mb-6 my-3 ml-2 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
            data-testid="new"
            type="submit"
          >
            {editedUser.id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
      <table>
        {data?.users.map((user) => {
          return (
            <UserItem
              key={user.id}
              user={user}
              setEditedUser={setEditedUser}
              delete_users_by_pk={delete_users_by_pk}
              // delete_users_by_pk={(v: {
              //   variables: Mutation_RootDelete_Users_By_PkArgs
              // }) => delete_users_by_pk(v)}
            />
          )
        })}
      </table>
    </Layout>
  )
}

export default HasuraCRUD
