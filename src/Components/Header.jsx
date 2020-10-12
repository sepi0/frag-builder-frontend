import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="font-mulish font-bold flex items-center justify-between flex-wrap  p-4 mb-10 w-big">
            <div>
                <h1>.FRAG COMPUTERS</h1>
            </div>
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <Link to="/zostavy">
                <h1 
                    className="
                        font-bold 
                        py-2 px-2 
                        mx-2 
                        border-2 
                        border-white 
                        rounded 
                        hover:bg-white 
                        hover:text-purple-600">
                    ZOSTAVY
                </h1>
                </Link>
                <Link to="/konfigurator">
                <h1 
                    className="
                        font-bold 
                        py-2 px-2 
                        mx-2 
                        border-2 
                        border-white 
                        rounded 
                        hover:bg-white 
                        hover:text-purple-600">
                    KONFIGURÁTOR
                </h1>
                </Link>
                <Link to="/kontakt">
                    <h1 
                        className="
                            font-bold 
                            py-2 px-2 
                            mx-2 
                            border-2 
                            border-white 
                            rounded 
                            hover:bg-white 
                            hover:text-purple-600">
                        KONTAKT
                    </h1>
                </Link>
            </div>
        </nav>
    )
}