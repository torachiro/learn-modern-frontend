import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_USERIDS, GET_USERBY_ID } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from '../../types/generated/graphql'
import { Layout } from '../../components/Layout'

type Props = {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail = ({ user }: Props): JSX.Element => {
  if (!user) return <Layout title="loading">Loading...</Layout>
  return (
    <Layout title={user.name}>
      <h1 className="mb-8 text-3xl font-bold">User Detail</h1>
      <table className="text-left">
        <tr>
          <th className="px-6 py-3">ID</th>
          <td>{user.id}</td>
        </tr>
        <tr>
          <th className="px-6 py-3">name</th>
          <td>{user.name}</td>
        </tr>
        <tr>
          <th className="px-6 py-3">created_at</th>
          <td>{user.created_at}</td>
        </tr>
      </table>
      <Link href="/hasura-ssg">
        <a className="mt-12">
          <div className="flex">
            <ChevronDoubleLeftIcon
              data-testid="auth-to-main"
              className="h-5 w-5 mr-3 text-blue-500"
            />
            <span data-testid="back-to-main">Back</span>
          </div>
        </a>
      </Link>
    </Layout>
  )
}
export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  })
  const paths = data.users.map((user) => ({
    params: { id: user.id },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params?.id },
  })
  return {
    props: { user: data.users_by_pk },
    revalidate: 1,
  }
}
