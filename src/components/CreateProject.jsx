import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !date || !imageURL) return

    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await createProject(params)
    toast.success('Project created successfully, will reflect in 30sec.')
    onClose()
    window.location.reload()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 font-fontGlobal
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-gray-800 shadow-xl shadow-black
        rounded w-11/12 md:w-3/12 h-7/12 p-4"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className='text-2xl font-medium text-gray-50 font-globalFont capitalize '>Add Project</h1>
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className='text-white'  size={24}/>
            </button>
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="rounded-md overflow-hidden h-20 w-20">
              <img
                src={
                  imageURL ||
                  'https://www.shutterstock.com/image-vector/picture-icon-vector-260nw-1353828443.jpg'
                }
                alt="project title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
            placeholder:text-slate-50
            focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
            placeholder:text-slate-50
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="cost (FIL)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
            placeholder:text-slate-50  invert
            focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none 
            placeholder:text-slate-50
            focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded mt-5"
          >
            <textarea
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
            placeholder:text-slate-50
            focus:ring-0"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-orange-600
            text-white font-medium text-md leading-tight
            rounded shadow-md hover:bg-orange-700 mt-5"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
