import Identicons from 'react-identicons'
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from '../store'
import { payoutProject } from '../services/blockchain'

const ProjectDetails = ({ project }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const expired = new Date().getTime() > Number(project?.expiresAt + '000')

  return (
    <div className="pt-24 mb-5 px-6 flex justify-center bg-gray-00 font-globalFont">
      <div className="flex justify-center flex-col md:w-2/3">
        <div
          className="flex justify-start items-start
        sm:space-x-4 flex-wrap"
        >
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-80 overflow-hidden object-cover sm:w-1/3 w-full"
          />

          <div className="flex-1 sm:py-0 py-4 ">
            <div className="flex flex-col justify-start flex-wrap bg-gray-600 py-3 px-2 rounded-lg">
              <div>
                <div className='flex justify-between'>
                  <div className="flex">
                    <div className="flex justify-start space-x-2 items-center mb-2 gap-2 bg-gray-100 shadow-md py-1 px-2 rounded">
                      <Identicons
                        className="rounded-full shadow-md "
                        string={project.owner}
                        size={30}
                      />
                      <small className="text-gray-500 font-medium text-sm verflow-hidden">
                        {truncate(project.owner, 8, 8, 20)}
                      </small>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-[100px] font-bold">
                    <p className="Capitalize font-bold font-fontGlobal text-lg text-gray-200 bg-gray-900 text-center px-2 py-1 w-full rounded">
                      {expired ? (
                        <small className="text-red-500">Expired</small>
                      ) : project?.status == 0 ? (
                        <small className="text-gray-200">Open</small>
                      ) : project?.status == 1 ? (
                        <small className="text-green-500">Accepted</small>
                      ) : project?.status == 2 ? (
                        <small className="text-gray-200">Reverted</small>
                      ) : project?.status == 3 ? (
                        <small className="text-red-500">Deleted</small>
                      ) : (
                        <small className="text-orange-500">Paid</small>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-between flex-col sm:flex-row"> */}
              <div className="flex justify-between ">
                <div className="flex flex-col items-center w-[100px] font-bold">
                  <p className="Capitalize font-bold font-fontGlobal text-lg text-gray-200 bg-gray-900 rounded px-2 py-1 w-full text-center">
                    <small>
                      {project?.backers} Backer{project?.backers == 1 ? '' : 's'}
                    </small>
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className="flex flex-col items-center w-[100px] font-bold">
                    <p className="Capitalize font-bold font-fontGlobal text-lg text-gray-200 bg-gray-900 px-2 py-1 w-full rounded text-center">
                      <small >
                        {expired
                          ? 'Expired'
                          : daysRemaining(project.expiresAt) + ' left'}
                      </small>
                    </p>
                  </div>

                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center'>

                <h5 className='text-lg font-normal normal-case text-gray-400 py-2'><span className='text-lg font-semibold normal-case text-gray-200 mr-1 pt-6'>The story : </span >{project?.title}</h5>
              </div>
              <p className='text-gray-400 text-sm normal-case font-fontGlobal pb-2'>{project?.description}</p>
              <div className="w-full bg-gray-300 overflow-hidden rounded mt-2 mb-1">
                <div
                  className="bg-orange-600 text-xs font-medium
            text-orange-400 text-center p-1 leading-none
            rounded-l-full"
                  style={{ width: `${(project.raised / project.cost) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center font-bold mt-2  text-gray-200">
                <small>{project?.raised} FIL Raised</small>
                <small className="flex justify-start items-center">

                  <span>{project?.cost} FIL</span>
                </small>
              </div>

              <div className="flex justify-start items-center space-x-2 mt-4  text-gray-200">
                {project?.status == 0 ? (
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-gray-200
              text-gray-900 font-medium text-xs leading-tight uppercase
              rounded shadow-md hover:bg-gray-300"
                    onClick={() => setGlobalState('backModal', 'scale-100')}
                  >
                    Back Project
                  </button>
                ) : null}

                {connectedAccount == project?.owner ? (
                  project?.status != 3 ? (
                    project?.status == 1 ? (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-orange-600
                        text-white font-medium text-xs leading-tight uppercase
                        rounded shadow-md hover:bg-orange-700"
                        onClick={() => payoutProject(project?.id)}
                      >
                        Payout
                      </button>
                    ) : project?.status != 4 ? (
                      <>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-gray-600
                          text-white font-medium text-xs leading-tight uppercase
                          rounded shadow-md hover:bg-gray-700"
                          onClick={() =>
                            setGlobalState('updateModal', 'scale-100')
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600
                          text-white font-medium text-xs leading-tight uppercase
                          rounded shadow-md hover:bg-red-700"
                          onClick={() =>
                            setGlobalState('deleteModal', 'scale-100')
                          }
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-gray-600
                        text-white font-medium text-xs leading-tight uppercase
                        rounded shadow-md hover:bg-gray-700"
                      >
                        Project Closed
                      </button>
                    )
                  ) : null
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
