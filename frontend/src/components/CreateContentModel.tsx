import CrossCircleIcon from "../icons/CrossCircleIcon";
import  {Input}  from "./Input";
import { Button } from "./ui/Button";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../Config";
import axios from "axios";
export interface CreateContentModelProps {
    open: boolean,
    onClose: any
}


const ContentType={
    Youtube: "youtube",
    Twitter: "twitter"
}

export function CreateContentModal({open, onClose}: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossCircleIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" size = 'sm' variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" size='sm' variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" size='sm' />
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>

}


// export function CreateContentModel(props: CreateContentModelProps) {
//   return (
//     <>
//       {props.open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Background overlay */}
//           <div
//             className="fixed inset-0 bg-slate-400 opacity-40"
//             onClick={props.onClose}
//           />

//           {/* Model content */}
//           <div className="z-50 bg-white p-6 rounded-md shadow-lg min-w-[300px]">
//             <div className="flex justify-end">
//               <div onClick={props.onClose} className="cursor-pointer">
//                 <CrossCircleIcon />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Input placeholder="Title" />
//               <Input placeholder="Link" />
//             </div>
//             <div className="flex justify-center mt-4">
//               <Button
//                 size="sm"
//                 variant="primary"
//                 text="Submit"
//                 onClick={() => console.log("first")}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// // export function CreateContentModel(props: CreateContentModelProps){
// //     return (
// //         <div>
// //             {props.open && <div className="w-screen h-screen bg-slate-400 fixed top-0 left-0 opacity-40 flex justify-center">
// //                 <div className="flex flex-col justify-center ">
// //                     <span className="bg-white opacity-100 p-4 rounded-md">
// //                         <div className="flex justify-end">
// //                             <div onClick={props.onClose} className="cursor-pointer">
// //                                 <CrossCircleIcon/>
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <Input placeholder="Title"/>
// //                             <Input placeholder="Link"/>
// //                         </div>
// //                         <div className="flex justify-center">
// //                         <Button size="sm" variant="primary" text="Submit" onClick={()=> console.log('first')}/>
// //                         </div>
// //                     </span>
// //                 </div>
// //             </div>}
// //         </div>
// //     )
// // }