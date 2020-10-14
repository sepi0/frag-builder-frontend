import React from 'react';

export default function Button(props) {
    if (props.color === "aquamarine") {
        return (
            <div
                onClick={props.onClick}
                className="
                    flex
                    flex-row
                    transition duration-300 ease-in-out 
                    mx-5 
                    p-3 
                    border-2 
                    border-aquamarine-500 
                    text-black 
                    hover:bg-aquamarine-500 
                    hover:text-white 
                    cursor-pointer 
                    rounded-full">
                {props.children}
            </div>
        )
    }

    if (props.color === "indigo") {
        return (
            <div
                onClick={props.onClick}
                className="
                    flex
                    flex-row
                    transition duration-300 ease-in-out 
                    mx-5 
                    p-3 
                    border-2 
                    border-indigo-600 
                    text-black 
                    hover:bg-indigo-600 
                    hover:text-white 
                    cursor-pointer 
                    rounded-full">
                {props.children}
            </div>
        )
    }

    if (props.color === "orange") {
        return (
            <div
                onClick={props.onClick}
                className="
                    transition duration-300 ease-in-out 
                    mx-5 
                    p-3 
                    border-2 
                    border-orange-600 
                    text-black 
                    hover:bg-orange-600 
                    hover:text-white 
                    cursor-pointer 
                    rounded-full">
                {props.children}
            </div>
        )
    }

    if (props.color === "red") {
        return (
            <div
                onClick={props.onClick}
                className="
                    transition duration-300 ease-in-out 
                    mx-5 
                    p-3 
                    border-2 
                    border-red-500 
                    text-black 
                    hover:bg-red-500 
                    hover:text-white 
                    cursor-pointer 
                    rounded-full">
                {props.children}
            </div>
        )        
    }
    
}