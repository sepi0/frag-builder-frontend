import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div id="nadpis">
                <h1 
                    className="
                        font-archivo
                        font-bold
                        text-3xl
                        lg:text-6xl
                        ">
                    VITAJ NA FRAG COMPUTERS.
                </h1>
            </div>
            <div 
                className="
                    flex
                    flex-row
                    justify-center
                    h-big">
                <button 
                    className="
                        transition duration-300 ease-in-out
                        font-bold
                        font-mulish
                        self-center
                        mx-2
                        p-3
                        border-2
                        border-aquamarine-500
                        hover:bg-aquamarine-500
                        hover:text-white
                        cursor-pointer
                        rounded-full">
                    <Link to="/zostavy">
                        <h1>Zostavy</h1>
                    </Link>
                </button>
                <button 
                    className="
                        text-center
                        flex
                        flex-row
                        transition duration-300 ease-in-out    
                        font-bold
                        font-mulish
                        self-center
                        mx-2
                        p-3
                        border-2
                        border-indigo-500
                        hover:bg-indigo-500
                        hover:text-white
                        cursor-pointer
                        rounded-full">
                    <Link to="/konfigurator">
                        <h1 className="text-center">
                            <FontAwesomeIcon className="mx-1" icon={faTools}/>
                            Konfigurator
                        </h1>
                    </Link>
                </button>
            </div>
        </div>
    )
}