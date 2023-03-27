import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

const schema = z.object({
  title: z.string().min(1, { message: '※入力必須の項目です。' }),
})
type Schema = z.infer<typeof schema>

export const LocalStateA = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<Schema>({
    defaultValues: { title: '' },
    resolver: zodResolver(schema),
  })
  const titleValue = watch('title')
  const todos = useReactiveVar(todoVar)

  const onSubmit: SubmitHandler<Schema> = ({ title }, e) => {
    todoVar([...todoVar(), { title }])
    setValue('title', '')
    //e?.target.reset()
  }

  const onError: SubmitErrorHandler<Schema> = (errors, e) => {
    //console.log(errors, e)
  }

  return (
    <>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex">
          <input
            className="mb-3 px-3 py-2 border border-gray-300"
            placeholder="new task ?"
            {...register('title')}
          />
          {errors.title?.message && (
            <p className="text-red-700">{errors.title?.message}</p>
          )}
          <button
            type="submit"
            className="disabled:opacity-40 mb-3 ml-2 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
            disabled={!titleValue}
          >
            add task
          </button>
        </div>
        {todos.map((todo, index) => {
          return (
            <p key={index} className="mb-3 y-1">
              {todo.title}
            </p>
          )
        })}

        <Link href="/local-state-b">
          <a className="mt-12">
            <div className="flex">
              <ChevronDoubleRightIcon className="h-5 w-5 mr-3 text-blue-500" />
              Next
            </div>
          </a>
        </Link>
      </form>
    </>
  )
}
