import React from 'react'
import { Link } from 'react-router-dom'


function FakeHeader() {
    return (
        <>
            <div className="flex gap-5">
                <Link className='border p-4' to={'/admindashboard'}>To admin dash</Link>
                <Link className='border p-4' to={'/contact'}>To Contact</Link>
                <Link className='border p-4' to={'/'}>Back Home</Link>
            </div>

        </>
    )
}

export default FakeHeader