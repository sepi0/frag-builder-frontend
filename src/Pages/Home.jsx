import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div
                id="main-grid"
                className="
                    h-720p
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    text-center
                    font-archivo
                    text-3xl">
                <div
                    className="
                        bg-contain
                        bg-no-repeat">
                    <h1 className="text-6xl py-20 font-bold">VITAJ NA FRAG Computers</h1>
                    <h2 className="font-cairo">Zostav si pocitac snov alebo do rana skap</h2>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}