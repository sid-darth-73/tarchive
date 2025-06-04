import CrossCircleIcon from "../icons/CrossCircleIcon";
import  {Input}  from "./Input";
import { Button } from "./ui/Button";

export interface CreateContentModelProps {
    open: boolean,
    onClose: any
}

export function CreateContentModel(props: CreateContentModelProps){
    return (
        <div>
            {props.open && <div className="w-screen h-screen bg-slate-400 fixed top-0 left-0 opacity-60 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded-md">
                        <div className="flex justify-end">
                            <div onClick={props.onClose} className="cursor-pointer">
                                <CrossCircleIcon/>
                            </div>
                        </div>
                        <div>
                            <Input placeholder="Title"/>
                            <Input placeholder="Link"/>
                        </div>
                        <div className="flex justify-center">
                        <Button size="sm" variant="primary" text="Submit" onClick={()=> console.log('first')}/>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}