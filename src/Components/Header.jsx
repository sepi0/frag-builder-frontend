import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="font-cairo flex items-center justify-between flex-wrap  p-4 mb-10 w-big">
            <div>
                <p>FRAG COMPUTERS</p>
            </div>
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <Link to="/zostavy">
                    <button className="transition duration-500 ease-in-out font-bold py-2 px-2 mx-2 border-2 border-white rounded hover:bg-white hover:text-black hover:underline focus:outline-none">
                        ZOSTAVY
                    </button>
                </Link>
                <Link to="/konfigurator">
                    <button className="transition duration-500 ease-in-out font-bold py-2 px-2 mx-2 border-2 border-white rounded hover:bg-white hover:text-black hover:underline focus:outline-none">
                        KONFIGURÁTOR
                    </button>
                </Link>
                <Link to="/kontakt">
                    <button className="transition duration-500 ease-in-out font-bold py-2 px-2 mx-2 border-2 border-white rounded hover:bg-white hover:text-black hover:underline focus:outline-none">
                        KONTAKT
                    </button>
                </Link>
            </div>
        </nav>
    )
}