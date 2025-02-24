import { MouseEventHandler } from "react";

function Button({children,onClick}:{children:React.ReactNode,onClick?:MouseEventHandler<HTMLButtonElement>|void}){
    
    const primary="bg-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
    if(onClick){
        return (
            <button className={primary} onClick={onClick}>{children}</button>
        )
    }
    
    return (
        <button className={primary}>{children}</button>
    )
}

export default Button;