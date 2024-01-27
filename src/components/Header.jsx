import { TbBusinessplan } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'
import logo from '../assets/gblockchain.png'
const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header
      className='fixed top-0 left-0 right-0 border-b-[1.5px] xl:px-0 px-6  bg-gray-800 z-10 shadow-lg border-[#3b3b3b] shadow-b-sm '>
      <div className="flex justify-between items-center mt-4 z-40 font-globalFont
        py-1 px-2 right-0 max-w-6xl cr:mx-auto rounded-md mx-2 mb-4">

        <Link
          to="/"
          className="flex justify-start items-center
      text-xl text-black space-x-1"
        >
          <img src={logo} alt="logo" className='w-10 rounded-md' />
        </Link>

        <div className="flex space-x-2 justify-center">
          {connectedAccount ? (
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-orange-600
            text-gray-100 font-medium text-xs leading-tight uppercase
            rounded-md shadow-md hover:bg-orange-700"
            >
              {truncate(connectedAccount, 8, 9, 20)}
            </button>
          ) : (
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-orange-500
            text-white font-medium text-xs leading-tight uppercase
            rounded-md shadow-md hover:bg-orange-700"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
