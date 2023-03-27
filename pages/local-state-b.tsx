import { LocalStateB } from '../components/LocalStateB'
import { Layout } from '../components/Layout'

const LocalStatePageB = (): JSX.Element => {
  return (
    <Layout title="Local State B">
      <h1 className="mb-2 text-3xl font-bold">Local State Page B</h1>
      <p className="mb-8 font-bold">makeVar + useReactiveVar</p>
      <LocalStateB />
    </Layout>
  )
}
export default LocalStatePageB
