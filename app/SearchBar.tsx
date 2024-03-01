// React Icons
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
    return (
        <div className='relative flex items-center rounded-[5px] overflow-hidden'>
            <AiOutlineSearch className='absolute ml-3 text-dark-blue-highlight' size={25} />
            <input type='text' className='w-[600px] bg-dark-blue outline-none p-3 pl-12 border-2rounded-md placeholder-dark-blue-highlight text-dark-gray text-md font-montserrat' placeholder='Search for commissions...' />
        </div>
    )
}