import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USER_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'

const FetchSub = (): JSX.Element => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USER_LOCAL)
  return (
    <Layout title="Hasura fetchPolicy read cache">
      <h1 className="mb-2 text-3xl font-bold text-primary">Hasura Sub Page</h1>
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-12">
          <div className="flex">
            <ChevronDoubleLeftIcon className="h-5 w-5 mr-3 text-blue-500" />
            Back
          </div>
        </a>
      </Link>
    </Layout>
  )
}
export default FetchSub
