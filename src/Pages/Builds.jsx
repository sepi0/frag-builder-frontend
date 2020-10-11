import React from 'react';
import Header from '../Components/Header';

export default function Builds() {
    return (
        <div>
            <Header/>
            <div className="flex flex-col lg:flex-row md:flex-wrap justify-center sm:container mx-auto">
                <Card model="FRAG TYPE-C" description="Low cost, low end pc configuration"/>
                <Card model="FRAG TYPE-B" description="Medium cost, mid end pc configuration"/>
                <Card model="FRAG TYPE-A" description="High cost, high end pc configuration"/>
                <Card model="FRAG TYPE-S" description="Super cost, superior pc configuration"/>
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className="self-center max-w-sm rounder overflow-hidden shadow-lg rounded-lg m-5">
            <div className="px-6 py-4">
                <div>
                    <div className="divide-y divide-gray-400">
                        <h2 className="font-archivo font-bold text-4xl text-gray-800 mb-2">{props.model}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div>
                        <button className="transition duration-500 ease-in-out bg-purple-600 text-white hover:bg-white hover:text-black hover:border-2 border-blue-300 py-2 px-4 mx-2 my-2 rounded font-bold">Detaily</button>
                        <button className="transition duration-500 ease-in-out bg-white-700 text-black border-2 border-black hover:bg-black hover:text-white py-2 px-4 mx-2 my-2 rounded font-bold">Objednať</button>
                    </div>
                </div>
            </div>
        </div>
    )
}