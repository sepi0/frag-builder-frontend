import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Header from '../Components/Header';

const buildsJson = require('../zostavy.json')

const BuildCards = () => {
    let buildsArray = []
    buildsJson.map(zostavy => {
        for (let key of Object.entries(zostavy)) {
            buildsArray.push(
                <Card 
                    model={key[1].model}
                    mobo={key[1].zakladnaDoska}
                    cpu={key[1].procesor}
                    gpu={key[1].grafickaKarta}
                    ram={key[1].ram}
                    ssd={key[1].ssd}
                    hdd={key[1].hdd}
                    psu={key[1].zdroj}
                    case={key[1].skrinka}
                    cooling={key[1].chladenie}
                    cena={key[1].cena}
                />
            )
        }
    })
    return buildsArray
}

export default function Builds() {
    
    return (
        <div>
            <Header/>
            <div 
                id="nadpis" 
                className="
                    flex 
                    flex-row 
                    justify-center 
                    my-10">
                <h1 
                    className="
                        lg:text-6xl 
                        md:text-3xl 
                        font-archivo
                        h-64
                        bg-spikeAquamarineBlue
                        bg-no-repeat
                        bg-contain">
                    ./ZOSTAVY
                </h1>
            </div>
            <div 
                className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-2 
                    lg:grid-cols-4
                    gap-6
                    container
                    md:mx-auto
                    lg:mx-auto
                    xl:mx-auto">
                {BuildCards()}
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div 
            className="
                shadow-lg 
                rounded">
            <div 
                className="
                    px-6 py-4
                    grid 
                    grid-cols-1">
                <div>
                    <div className="divide-y divide-gray-400">
                        <h2 
                            className="
                                font-archivo 
                                font-bold 
                                text-4xl 
                                text-black 
                                mb-2">
                            {props.model}
                        </h2>
                        <p>{props.mobo}</p>
                        <p>{props.cpu}</p>
                        <p>{props.gpu}</p>
                        <p>{props.ram}</p>
                        <p>{props.ssd}</p>
                        <p>{props.hdd}</p>
                        <p>{props.psu}</p>
                        <p>{props.case}</p>
                        <p>{props.cooling}</p>
                    </div>
                    <div 
                        className="
                            font-mulish
                            self-center
                            text-center
                            cursor-pointer
                            transition duration-500 ease-in-out 
                            bg-white-700 
                            text-black 
                            border-2 
                            border-purple-600 
                            hover:bg-purple-400
                            hover:text-white 
                            py-2 px-1 
                            my-2 mx-10
                            rounded-full ">
                        <p className="self-center">
                            KÚPIŤ {props.cena}€
                            <FontAwesomeIcon className="mx-2" icon={faShoppingCart}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}