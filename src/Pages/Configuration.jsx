import React from 'react'
import Navbar from '../Components/Navbar'
import {
	faArrowLeft,
	faArrowRight,
	faPollH,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button";
import ComputerParts from '../Components/ComputerParts';
import FinalCart from '../Components/FinalCart';

export default class Configuration extends React.Component {

	productTypes = [
		"mobo",
		"cpu",
		"gpu",
		"ram",
		"psu",
		"ssd",
		"hdd",
		"case",
		"cooling",
	]

	constructor() {
		super()
		this.state = {
			configuratorStep: 0,
			configuratorProgress: {
				0: "Základné dosky",
				1: "Procesory",
				2: "Grafické karty",
				3: "RAM-ky",
				4: "Zdroje",
				5: "SSD-čka",
				6: "HDD-čka",
				7: "Skrinky",
				8: "Chladenia",
				9: "Výsledná zostava"
			},
		}
	}

	stepForward = () => {
		this.setState({ configuratorStep: this.state.configuratorStep + 1 })
	}

	stepBack = () => {
		this.setState({ configuratorStep: this.state.configuratorStep - 1 })
	}

	render() {
		return (
			<div>
				<Navbar />
				<div id="nadpis" className="flex  flex-row  justify-center h-360p bg-carbon-900 shadow-xl">
					<div className={"bg-tetris2 w-720p h-360p items-center"}>
						<h1 className="text-5xl sm:text-6xl text-center text-white font-archivo h-64">
							./KONFIGURÁTOR
						</h1>
					</div>
				</div>
				<div id="vyhladavanie" className="flex  flex-col  self-center">
					<h1 className="my-10 text-5xl text-center  text-carbon-500 font-archivo">
						VYHĽADÁVANIE
					</h1>
					<p className="text-center">
						Výsledky sa zobrazia do 10 sekúnd v prípade že backend nebeží.
					</p>
					<p className=" font-bold font-mulish text-center">
						Ak chceš, môžeš si zvoliť viacero komponentov a na konci konfigurácie si ich povyhadzuješ z košíka..
					</p>
					<div className="flex flex-row justify-center font-mulish my-10 space-x-10">
						<div>
							{this.state.configuratorStep > 0 ? 
							<Button
								className={"border-babyblue-500 hover:bg-babyblue-500"}
								onClick={this.stepBack}>
								<FontAwesomeIcon className="mx-2 self-center" icon={faArrowLeft} />
								<p>BACK</p>
							</Button> : null}
						</div>
						<div>
							{this.state.configuratorStep < 8 ?
								<Button
									className={"border-brightpink-500 hover:bg-brightpink-500"}
									onClick={this.stepForward}>
									<p>NEXT</p>
									<FontAwesomeIcon className="mx-2 self-center" icon={faArrowRight} />
								</Button> : null}
							{(this.state.configuratorStep > 8 && this.state.inCart.length !== 0) ?
								<Button
									className={"border-bubblegumred-500 hover:bg-bubblegumred-500"}
									onClick={this.stepForward}>
									<p>VYSLEDNA ZOSTAVA</p>
									<FontAwesomeIcon className="mx-2 self-center" icon={faPollH} />
								</Button> : null}
						</div>
					</div>
				</div>
				<ComputerParts type={this.productTypes[this.state.configuratorStep]}/>
				{this.state.configuratorStep === 9 ? <FinalCart/> : null}
			</div>
		)
	}
}