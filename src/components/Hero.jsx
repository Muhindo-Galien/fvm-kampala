import { setGlobalState, useGlobalState } from '../store'
const Hero = () => {
  const [stats] = useGlobalState('stats')

  return (
    <div className="text-center z-0  pb-10  max-w-4xl mx-auto text-gray-50 font-globalFont">
      <div className="flex justify-start items-center mt-10 text-gray-300">
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full rounded-tl-md rounded-bl-md "
        >
          <span
            className="text-lg font-bold text-orange-500
            leading-5"
          >
            {stats?.totalProjects || 0}
          </span>
          <span>Projects</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
        >
          <span
            className="text-lg font-bold text-orange-500
            leading-5"
          >
            {stats?.totalBacking || 0}
          </span>
          <span>Backings</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full rounded-tr-md rounded-br-md"
        >
          <span
            className="text-lg font-bold text-orange-500
            leading-5"
          >
            {stats?.totalDonations || 0} FIL
          </span>
          <span>Donated</span>
        </div>
      </div>
      <div className="flex justify-start items-center pt-5 space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-4 bg-orange-600
        text-white font-medium text-xs leading-tight uppercase
        rounded-md shadow-md hover:bg-orange-700"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Add Project
        </button>

        <button
          type="button"
          className="inline-block px-6 py-4 border border-orange-600
        font-medium text-xs leading-tight uppercase text-orange-600
        rounded-md shadow-md bg-transparent hover:bg-orange-700
        hover:text-white"
        >
          Back Projects
        </button>
      </div>
    </div>
  )
}

export default Hero
