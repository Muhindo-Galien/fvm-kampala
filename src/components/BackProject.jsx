import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const BackProject = ({ project }) => {
  const [backModal] = useGlobalState('backModal')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount) return

    await backProject(project?.id, amount)
    toast.success('Project backed successfully, will reflect in 30sec.')
    setGlobalState('backModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex font-globalFont 
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${backModal}`}
    >
      <div
        className="bg-gray-800 shadow-xl shadow-black
        rounded-md w-11/12 md:w-3/12 h-7/12 p-3"
      >
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setGlobalState('backModal', 'scale-0')}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes  className='text-gray-50' size={26}/>
            </button>
          </div>
          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <input
              className="rounded block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (FIL)"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-orange-600
            text-white font-medium text-md leading-tight
            rounded shadow-md hover:bg-orange-700 mt-5"
          >
            Back Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default BackProject
