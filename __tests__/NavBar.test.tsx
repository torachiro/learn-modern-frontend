import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'

initTestHelpers()

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(await screen.findByText('Learn Modern Frontend')).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /Local State/ }))
    expect(await screen.findByText('Local State Page A')).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /Fetch Policy/ }))
    expect(await screen.findByText('Hasura Main Page')).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /CRUD/ }))
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()

    userEvent.click(screen.getByRole('link', { name: /SSG ISR/ }))
    expect(await screen.findByText('Hasura SSG + ISR')).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /Custom Hook/ }))
    expect(
      await screen.findByText('Custom Hook + useCallback + memo')
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('link', { name: /Home/ }))
    expect(await screen.findByText('Learn Modern Frontend')).toBeInTheDocument()
  })
})
