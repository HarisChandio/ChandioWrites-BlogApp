import { Link } from "react-router-dom"
import { AuthInputs } from "./AuthInputs"
import { useState } from "react"
import { SignupInput } from "@harischandio70/medium-common"
export const Auth = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    return <div className="h-screen flex justify-center flex-col">
        <div className=" flex flex-col justify-center">
            <div className="text-center justify-start">
                <div className="font-extrabold text-3xl ">
                    Create An Account
                </div>
                <div className="text-slate-400">
                    Already have an account? <Link className="pl-2 underline" to={"/sigin"}>Signin</Link>
                </div>
            </div>
            <div className="flex flex-col justify-self-center">
                <AuthInputs label="Name" placeholder="Haris" onChange={(e) => {
                    setPostInputs({
                        ...postInputs, 
                        name: e.target.value
                    })
                }}>
                </AuthInputs>
                <AuthInputs label="email" placeholder="Haris" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}>
                </AuthInputs>
                <AuthInputs label="Password" placeholder="Haris" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}>
                </AuthInputs>
            </div>
        </div>

    </div>
}

