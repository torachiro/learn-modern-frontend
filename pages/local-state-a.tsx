import { LocalStateA } from '../components/LocalStateA'
import { Layout } from '../components/Layout'

const LocalStatePageA = (): JSX.Element => {
  return (
    <Layout title="Local State A">
      <h1 className="mb-2 text-3xl font-bold text-primary">
        Local State Page A
      </h1>
      <p className="mb-8 font-bold">Apollo Client / makeVar & useReactiveVar</p>
      <LocalStateA />
    </Layout>
  )
}
export default LocalStatePageA
