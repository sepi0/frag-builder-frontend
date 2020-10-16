import React from 'react'
import Navbar from '../Components/Navbar'
import Button from "../Components/Button";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div
                className="
                    flex
                    flex-col
                    justify-center
                    sm:container
                    mx-auto">
                <div id="nadpis"
                     className="
                        h-360p
                        bg-purplespikes
                        bg-no-repeat
                        bg-contain
                        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                        text-left
                        md:text-right
                        ">
                    <h1 className="font-archivo font-bold text-6xl mt-20">
                        ./VITAJ NA FRAG COMPUTERS
                    </h1>
                    <h3 className="font-cairo text-4xl mt-10 mb-5">
                        postav si pocitac snov alebo do rana skap ty had
                    </h3>
                </div>
                <div
                    id="grid"
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:gap-4
                        gap-8
                        mt-20
                        py-20">
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
                            <Button color={"bubblegumRed-500"}>
                                Zostavy
                            </Button>
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
                            <Button color={"bubblegumRed-500"}>
                                Konfigurator
                            </Button>
                        </Link>
                    </div>
                    <div className="bg-obrazok-konfigurator bg-contain bg-no-repeat h-360p">
                    </div>
                </div>
            </div>
        </div>
    )
}