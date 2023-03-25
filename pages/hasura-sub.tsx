import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USER_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchSub = (): JSX.Element => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USER_LOCAL)
  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}
export default FetchSub
