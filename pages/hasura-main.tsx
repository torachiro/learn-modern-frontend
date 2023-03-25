import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery, GetUsersDocument } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain = (): JSX.Element => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    //fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    //fetchPolicy: 'cache-first',
    //fetchPolicy: 'no-cache',
  })
  //const { data, error } = useQuery<GetUsersQuery>(GetUsersDocument)
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {/* {console.log(data)} */}
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
