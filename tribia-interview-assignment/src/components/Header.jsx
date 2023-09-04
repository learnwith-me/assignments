import React from 'react'
import Logo from '../icons/Logo'

const Header = () => {
    return (
        <header>
            <div className='header-container flex gap-5 px-10 py-5'>
                <Logo />
                <h1 className=' text-secondaryColor text-2xl font-poppins font-semibold'>
                    Document Management System
                </h1>
            </div>
        </header>
    )
}

export default Header