import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
	return (
		<nav className="bg-black text-white font-mulish font-bold content-center mx-auto p-4">
			<div className={"flex flex-row justify-between container mx-auto md:w-720p"}>
				<div className="items-center">
					<Link to="/">
						<h1>.FRAG COMPUTERS</h1>
					</Link>
				</div>
				<div className="flex flex-shrink-0 items-center mr-6">
					<Link to="/zostavy">
						<h1 className="transition duration-300 ease-in-out font-bold py-2 px-2 mx-2 rounded hover:text-black hover:bg-white">
							ZOSTAVY
						</h1>
					</Link>
					<Link to="/konfigurator">
						<h1 className="transition duration-300 ease-in-out font-bold py-2 px-2 mx-2 rounded hover:text-black hover:bg-white">
							KONFIGURÁTOR
						</h1>
					</Link>
					<FontAwesomeIcon className={"mx-3 "} size={"lg"} icon={faFacebook}></FontAwesomeIcon>
					<FontAwesomeIcon className={"mx-3 "} size={"lg"} icon={faInstagram}></FontAwesomeIcon>
				</div>
			</div>
		</nav>
	)
}