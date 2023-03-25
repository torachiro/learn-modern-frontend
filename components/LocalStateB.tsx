import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

export const LocalStateB = (): JSX.Element => {
  const todos = useReactiveVar(todoVar)
  return (
    <>
      {todos?.map((todo, index) => {
        return (
          <p className="mb-3" key={index}>
            {todo.title}
          </p>
        )
      })}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  )
}
