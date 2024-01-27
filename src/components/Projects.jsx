import Identicons from 'react-identicons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { truncate, daysRemaining } from '../store'
import { FaEthereum } from 'react-icons/fa'

const Projects = ({ projects }) => {
  const [end, setEnd] = useState(8)
  const [count] = useState(8)
  const [collection, setCollection] = useState([])

  const getCollection = () => projects.slice(0, end)

  useEffect(() => {
    setCollection(getCollection())
  }, [projects, end])

  return (
    <div className="flex flex-col px-6 pb-14 font-globalFont">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-3 py-2.5 '>
        {collection.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {projects.length > collection.length ? (
        <div className="flex justify-center items-center my-5">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-orange-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-md shadow-md hover:bg-orange-700"
            onClick={() => setEnd(end + count)}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  )
}

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + '000')

  return (
    <div id="projects" className="rounded-lg  bg-gray-700 shadow-lg w-full  px-3 py-3 font-globalFont ">
      <Link to={'/projects/' + project.id}>
        <img
          src={project.imageURL}
          alt={project.title}
          className="rounded-xl h-44 w-full object-cover  shadow-sm"
        />
        <div className="pt-2">
          <h5 className=' font-medium capitalize text-gray-200 text-lg py-1'>{project.title}</h5>
          <p className='text-gray-400 font-light normal-case text-md '>{project.description.slice(0, 90)}...</p>

          <div className="flex flex-col mt-2 ">
            <div className='flex justify-between items-center '>
              <small className="text-gray-300 rounded-lg  p-2 bg-gray-800 font-medium text-sm capitalize">
                {expired ? 'Expired' : daysRemaining(project.expiresAt) + ' left'}
              </small>
              <div>
                {expired ? (
                  <small className="text-red-500 rounded-lg  px-2 py-2.5 bg-gray-800 font-medium text-sm">Expired</small>
                ) : project?.status == 0 ? (
                  <small className="text-gray-300 rounded-lg  px-2 py-2.5  bg-gray-800 font-medium text-sm ">Open</small>
                ) : project?.status == 1 ? (
                  <small className="bg-orange-500 rounded-lg  px-2 py-2.5 border border-gray-300 font-medium text-sm">Accepted</small>
                ) : project?.status == 2 ? (
                  <small className="text-gray-300 rounded-lg  px-2 py-2.5 border border-gray-300 font-medium text-sm ">Reverted</small>
                ) : project?.status == 3 ? (
                  <small className="text-red-400 rounded-lg  px-2 py-2.5 border border-gray-300 font-medium text-sm">Deleted</small>
                ) : (
                  <small className="text-orange-500 rounded-lg  px-2 py-2.5 border border-gray-300 font-medium text-sm">Paid</small>
                )}
              </div>
            </div>

          </div>

          <div className="w-full bg-gray-300 overflow-hidden rounded-md mt-2 mb-1">
            <div
              className="bg-orange-600 text-xs font-medium
            text-orange-400 text-center p-0.5 leading-none
            rounded-l-full"
              style={{ width: `${(project.raised / project.cost) * 100}%` }}
            ></div>
          </div>

          <div
            className="flex justify-between items-center 
        font-medium  mb-2 text-gray-200"
          >
            <small>{project.raised} FIL Raised</small>
            <small className="flex justify-start items-center">
              <span className='text-sm'>{project.cost} FIL</span>
            </small>
          </div>

          <div className="flex justify-center border border-gray-300 p-2 rounded-md items-center flex-wrap
              text-gray-500 font-semibold bg-gray-800"
          >
            <small className='text-gray-200 font-medium text-base'>
              {project.backers} Backer{project.backers == 1 ? '' : 's'}
            </small>

          </div>
        </div>
      </Link>
    </div>
  )
}

export default Projects
