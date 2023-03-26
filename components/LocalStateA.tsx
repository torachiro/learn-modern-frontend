import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

const schema = z.object({
  title: z.string().min(1, { message: '※入力必須の項目です。' }),
})

type Schema = z.infer<typeof schema>

type FormValues = {
  title: string
}
export const LocalStateA = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Schema>({
    defaultValues: { title: '' },
    resolver: zodResolver(schema),
  })
  const todos = useReactiveVar(todoVar)

  const onSubmit: SubmitHandler<FormValues> = ({ title }, e) => {
    todoVar([...todoVar(), { title }])
    e.target.reset()
  }

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log(errors, e)
  }

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos.map((todo, index) => {
        return (
          <p key={index} className="mb-3 y-1">
            {todo.title}
          </p>
        )
      })}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New task ?"
          {...register('title')}
        />
        {errors.title?.message && (
          <p className="text-red-700">{errors.title?.message}</p>
        )}
        <button
          type="submit"
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          disabled={!isDirty}
        >
          Add new state
        </button>
        <Link href="/local-state-b">
          <a>Next</a>
        </Link>
      </form>
    </>
  )
}
