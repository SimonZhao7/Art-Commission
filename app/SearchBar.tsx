// React Icons
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
    return (
        <div className='relative flex items-center'>
            <AiOutlineSearch className='absolute ml-2' size={20} />
            <input type='text' className='w-[500px] outline-none py-2 px-5 pl-8 border-2 border-med-gray rounded-md text-sm hover:border-gray-400 transition-all duration-100 ease' placeholder='Search for commissions...' />
        </div>
    )
}