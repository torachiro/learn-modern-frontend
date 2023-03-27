import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'

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
        <a className="mt-12">
          <div className="flex">
            <ChevronDoubleLeftIcon className="h-5 w-5 mr-3 text-blue-500" />
            Back
          </div>
        </a>
      </Link>
    </>
  )
}
