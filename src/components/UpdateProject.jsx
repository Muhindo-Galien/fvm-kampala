import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState('updateModal')
  const [title, setTitle] = useState(project?.title)
  const [description, setDescription] = useState(project?.description)
  const [date, setDate] = useState(project?.date)
  const [imageURL, setImageURL] = useState(project?.imageURL)

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !date || !imageURL) return

    const params = {
      id: project?.id,
      title,
      description,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await updateProject(params)
    toast.success('Project updated successffully, will reflect in 30sec.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('updateModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 font-globalFont
    transform transition-transform duration-300 ${updateModal}`}
    >
      <div
        className="bg-gray-800  shadow-xl shadow-black
        rounded-xl w-11/12 md:w-3/12 h-7/12 p-3 text-gray-50"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Edit Project</p>
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-md overflow-hidden h-20 w-20">
              <img
                src={
                  imageURL ||
                  'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                }
                alt="project title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div
            className="flex justify-between items-center
          bg-transparent border rounded-xl mt-5"
          >
            <input
              className="block w-full rounded-xl bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
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
          bg-transparent border rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none invert
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
          bg-transparent border rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
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
          bg-transparent border rounded-xl mt-5"
          >
            <textarea
              className="block w-full bg-transparent
            border-0 text-sm text-slate-50 focus:outline-none
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
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-xl shadow-md hover:bg-green-700 mt-5"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProject
