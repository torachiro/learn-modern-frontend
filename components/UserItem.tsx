import { memo, Dispatch, SetStateAction } from 'react'
import {
  Users,
  Mutation_RootDelete_Users_By_PkArgs,
} from '../types/generated/graphql'

type Props = {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string
      name: string
    }>
  >
  delete_users_by_pk: (v: {
    variables: Mutation_RootDelete_Users_By_PkArgs
  }) => void
}
//eslint-disable-next-line react/display-name
export const UserItem = memo(
  ({ user, setEditedUser, delete_users_by_pk }: Props): JSX.Element => {
    console.log('UserItem rendered')
    return (
      <div className="my-1">
        <span className="mr-2">{user.name}</span>
        <span className="mr-2">{user.created_at}</span>
        <button
          className="mr-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl focus:outline-none"
          data-testid={`edit-${user.id}`}
          onClick={() => {
            setEditedUser(user)
          }}
        >
          Edit
        </button>
        <button
          className="py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl focus:outline-none"
          data-testid={`delete-${user.id}`}
          onClick={async () => {
            await delete_users_by_pk({
              variables: {
                id: user.id,
              },
            })
          }}
        >
          Delete
        </button>
      </div>
    )
  }
)
