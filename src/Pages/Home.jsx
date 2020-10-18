import React from 'react'
import Navbar from '../Components/Navbar'
import Button from "../Components/Button";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div id="nadpis" className=" h-360p bg-carbon-900 text-white text-left md:text-right shadow-xl">
                <div className={"bg-tetris1 bg-no-repeat bg-center mx-auto h-360p"}>
                    <h1 className="font-archivo text-center font-bold text-6xl">
                        ./VITAJ NA FRAG COMPUTERS
                    </h1>
                    <div className={"rounded bg-white mx-auto w-360p"}>
                        <h3 className="font-cairo text-black text-center text-2xl md:text-4xl mt-4 mb-5">
                            Za málo peňazí, veľa gamingu!
                        </h3>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-center sm:container mx-auto">
                <div id="grid" className=" grid grid-cols-1 md:grid-cols-2 lg:gap-4 gap-8 mt-20 py-20">
                    <div className="bg-obrazok-zostavy bg-contain bg-no-repeat h-360p">
                    </div>
                    <div  className="p-10 md:h-360p">
                        <h3 className="font-cairo font-bold text-3xl mb-5">
                            ./ZOSTAVY
                        </h3>
                        <p className="font-mulish text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut consequuntur delectus deserunt eius ex expedita illo impedit ipsa ipsum laborum magnam molestias obcaecati perferendis perspiciatis quam quasi, temporibus vitae.
                        </p>
                        <Link to={"/zostavy"}>
                            <div className={"my-10"}>
                                <Button className={"border-carbon-900 hover:bg-carbon-900"}>
                                    ZOSTAVY
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className="p-10 md:h-360p">
                        <h3 className="font-cairo font-bold text-3xl mb-5">
                            ./KONFIGURÁTOR
                        </h3>
                        <p className="font-mulish text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci animi at cum dolor earum exercitationem fugiat harum hic ipsa iure laborum magnam, possimus quis repudiandae sint tempora tenetur voluptates?
                        </p>
                        <Link to={"/konfigurator"}>
                            <div className={"my-10"}>
                                <Button className={"border-carbon-900 hover:bg-carbon-900"}>
                                    KONFIGURÁTOR
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-obrazok-konfigurator bg-contain bg-no-repeat h-360p">
                    </div>
                </div>
            </div>
        </div>
    )
}