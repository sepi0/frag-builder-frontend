import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function Header() {
    return (
        <Router>
            <nav className="flex items-center justify-center flex-wrap bg-gradient-to-r from-purple-600 to-blue-400 p-4 shadow-xl mb-10">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link to="/zostavy">
                        <button className="transition duration-500 ease-in-out font-bold py-2 px-4 mx-5 border-2 border-white rounded-full hover:bg-white hover:text-purple-600 focus:outline-none">
                            Zostavy
                        </button>
                    </Link>
                    <Link to="/konfigurator">
                        <button className="transition duration-500 ease-in-out font-bold py-2 px-4 mx-5 border-2 border-white rounded-full hover:bg-white hover:text-purple-600 focus:outline-none">
                            Konfigurátor
                        </button>
                    </Link>
                    <Link to="/kontakt">
                        <button className="transition duration-500 ease-in-out font-bold py-2 px-4 mx-5 border-2 border-white rounded-full hover:bg-white hover:text-purple-600 focus:outline-none">
                            Kontakt
                        </button>
                    </Link>
                </div>
            </nav>
        </Router>
    )
}