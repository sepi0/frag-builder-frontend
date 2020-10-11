import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Header from '../Components/Header';

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
                        font-archivo">
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
                <Card model="Intel TYPE-C" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card model="Intel TYPE-B" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card model="Intel TYPE-A" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card model="Intel TYPE-S" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card 
                    model="AMD TYPE-C" 
                    mobo="Základná doska: ASUS Prime B450M-K" 
                    cpu="Procesor: Ryzen 3 3200G" 
                    gpu="Grafická karta: BEZ GPU" 
                    ram="RAM: HyperX 8GB DDR4 3200MHz Cl16 Fury" 
                    ssd="SSD: ADATA XPG 512GB" 
                    hdd="HDD: BEZ HDD" 
                    psu="Zdroj: SilverStone Strider 400W" 
                    case="Skrinka: CoolerMaster MasterBox Q300L" 
                    cooling=""/>
                <Card model="AMD TYPE-B" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card model="AMD TYPE-A" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
                <Card model="AMD TYPE-S" mobo="" cpu="" gpu="" ram="" ssd="" hdd="" psu="" case="" cooling=""/>
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
                            KÚPIŤ
                            <FontAwesomeIcon className="mx-2" icon={faShoppingCart}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}