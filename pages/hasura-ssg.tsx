import Link from 'next/link'
import { GetStaticProps } from 'next'
import { initializeApollo } from '../lib/apolloClient'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery, Users } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

type Props = {
  users: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>[]
}

const HasuraSSG = ({ users }: Props): JSX.Element => {
  return (
    <Layout title="Hasura SSG">
      <h1 className="mb-8 text-3xl font-bold">Hasura SSG + ISR</h1>
      {users.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a className="my-2" data-testid={`link-${user.id}`}>
              <div className="flex">
                <ChevronDoubleRightIcon className="h-5 w-5 mr-3 text-blue-500" />
                {user.name}
              </div>
            </a>
          </Link>
        )
      })}
    </Layout>
  )
}
export default HasuraSSG

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  })

  return {
    props: { users: data.users },
    revalidate: 1,
  }
}
