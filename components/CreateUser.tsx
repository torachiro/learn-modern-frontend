import { useCreateForm } from '../hooks/useCreateForm'
import { Child } from './Child'

export const CreateUser = (): JSX.Element => {
  const {
    text,
    username,
    handleTextChange,
    handleUsernameChange,
    handleSubmit,
    printMsg,
  } = useCreateForm()
  return (
    <>
      {console.log('CreateUser rendered')}
      <h1 className="mb-8 text-3xl font-bold">
        Custom Hook + useCallback + memo
      </h1>
      <div className="mb-3 flex flex-col justify-center items-center">
        <label>Text</label>
        <input
          className="px-3 py-2 border border-gray-300"
          type="text"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <form
        className="flex flex-col justify-center items-center "
        onSubmit={handleSubmit}
      >
        <label>Username</label>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <button
          className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Child printMsg={printMsg} handleSubmit={handleSubmit} />
    </>
  )
}
