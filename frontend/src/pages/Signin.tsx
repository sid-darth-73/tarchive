import { Input } from "../components/Input"
import { Button } from "../components/ui/Button"
import {useRef} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Config";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signin() {
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }


    return (
        <div>
            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={signin}  variant="primary" text="Signin" size='md' fullWidth={true} loading={false}/>
                </div>
            </div>
        </div>
        </div>
    )
}