import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery, GetUsersDocument } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

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
      <h1 className="mb-2 text-3xl font-bold">Hasura Main Page</h1>
      <p className="mb-6 font-bold">Hasura / Fetch Policy</p>
      {/* {console.log(data)} */}
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleRightIcon className="h-5 w-5 mr-3 text-blue-500" />
          <span className="cursor-pointer">Next</span>
        </div>
      </Link>
    </Layout>
  )
}
export default FetchMain
