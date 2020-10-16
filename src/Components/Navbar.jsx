import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faInstagram} from "@fortawesome/free-brands-svg-icons/faInstagram";

export default function Navbar() {
	return (
		<nav
			className="
                font-mulish 
                font-bold 
                flex 
                flex-wrap  
                items-center 
                justify-between
                sm:container
                mx-auto
                p-4 
                mb-10">
			<div
				className="
					flex
					flex-row
					justify-between
					font-cairo">
				<Link to="/">
					<h1>.FRAG COMPUTERS</h1>
				</Link>
			</div>
				<div
					className="
						flex
                    	flex-shrink-0
                    	items-center
                    	text-black
                    	mr-6">
					<Link to="/zostavy">
						<h1
							className="
                        		font-bold
                        		py-2
                        		px-2
                        		mx-2
                        		border-2
                        		border-white
                        		rounded
                        		hover:bg-white
                        		hover:text-fragBlue-500">
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
                        		hover:text-fragBlue-500">
							KONFIGURÁTOR
						</h1>
					</Link>
					<FontAwesomeIcon className={"mx-3"} size={"lg"} icon={faFacebookSquare}></FontAwesomeIcon>
					<FontAwesomeIcon className={"mx-3"} size={"lg"} icon={faInstagram}></FontAwesomeIcon>
				</div>
		</nav>
	)
}