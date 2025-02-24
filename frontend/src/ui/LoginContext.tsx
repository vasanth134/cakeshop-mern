import { createContext, useState } from "react";


interface loginContextType{
    username:string;
    setUsername:React.Dispatch<React.SetStateAction<string>>;
    password:string;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    isLogin:boolean;
    setIsLogin:React.Dispatch<React.SetStateAction<boolean>>;
    isGoogleLogin:boolean;
    setIsGoogleLogin:React.Dispatch<React.SetStateAction<boolean>>;
    isAdmin:boolean;
    setIsAdmin:React.Dispatch<React.SetStateAction<boolean>>;
    googleProfile:{ email: string, name: string } | undefined;
    setGoogleProfile:React.Dispatch<React.SetStateAction<{ email: string, name: string } | undefined>>;
}

export const  LoginContext= createContext<loginContextType|undefined>(undefined)

   
export default function LoginProvider({children}:{children:React.ReactNode}){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [isLogin,setIsLogin]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [isGoogleLogin,setIsGoogleLogin]=useState(false);
    const [googleProfile, setGoogleProfile] = useState<{ email: string, name: string } | undefined>(undefined);

    return(
        <LoginContext.Provider value={{googleProfile,setGoogleProfile,username,setUsername,password,setPassword,isLogin,setIsLogin,isAdmin,setIsAdmin,setIsGoogleLogin,isGoogleLogin}}>
            {children}
        </LoginContext.Provider>
    )
    
 }
 