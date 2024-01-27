import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import Moment from 'react-moment'
import { truncate } from '../store'

const ProjectBackers = ({ backers }) => {
  return (
    <div className="flex flex-col justify-center items-start md:w-2/3 px-6 mx-auto font-globalFont text-gray-200 font-semibold">
      <div
        className="max-h-[calc(100vh_-_25rem)] overflow-y-auto
        shadow-md rounded-md w-full mb-10"
      >
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Backer
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Donations
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Refunded
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {backers.map((backer, i) => (
              <Backer key={i} backer={backer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Backer = ({ backer }) => (
  <tr className="border-b border-gray-200 font-globalFont text-gray-200 font-semibold font-globalFont">
    <td
      className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
    >
      <div className="flex justify-start space-x-2 items-center mb-2 gap-1 bg-gray-50 shadow-md py-1 px-2 rounded-md">
        <Identicon
          className="h-10 w-10 object-contain rounded-md shadow-md"
          string={backer.owner}
          size={30}
        />
        <span className="text-gray-400 font-medium text-sm overflow-hidden">
          {truncate(backer.owner, 6, 6, 15)}</span>
      </div>
    </td>
    <td
      className="text-sm font-light
                  px-6 py-4 whitespace-nowrap"
    >
      <small className="flex justify-start items-center space-x-1">
        <FaEthereum className='text-blue-300 text-medium' />
        <span className="text-orange-600 font-semibold">
          {backer.contribution} FIL
        </span>
      </small>
    </td>
    <td
      className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
    >
      {backer.refunded ? 'Yes' : 'No'}
    </td>
    <td
      className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
    >
      <Moment fromNow>{backer.timestamp}</Moment>
    </td>
  </tr>
)

export default ProjectBackers
