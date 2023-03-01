import { useState } from "react"
import "./style.css";

export const ModalMessage = ({ type, message, }: { type: "danger" | "okay" | "surprise", message: string, }) => {

    const [isVisible, setIsVisible] = useState(true);

    const emojis = {
        "danger": "⚠",
        "okay": "😎",
        "surprise": "👁👄👁💅"
    }

    function handleClose() {
        setIsVisible(false)
    }
    return (
        <>
            <div className="black-screen" style={{
                "display": isVisible ? 'block' : 'none'
            }}>

                <div className="modal">
                    <h1>{emojis[type]}</h1>
                    <p>{message ? message : 'Please fill all the fields'}</p>
                    <button onClick={handleClose}>close</button>
                </div>

            </div>
        </>

    )
}