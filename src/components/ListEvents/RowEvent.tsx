import { useState, useEffect } from "react";
import { formatDate, formatTimestamp } from "../../utils";
import { TypeEvents } from "../FormEvent/types";
import './style.css';

export const RowEvent = ({ name, date, timestamp, remove, typeEvent }: { name: string, date: string, timestamp: number, remove: () => void, typeEvent: TypeEvents | null }) => {
    const [timestampRow, setTimestamp] = useState(timestamp);
    const [validator, setValidator] = useState(false);

    useEffect(() => {

        const idInterval = setInterval(() => {
            const currentTimestamp = Date.now();
            console.log('every 1 second')

            const newTimestampValue = timestamp - currentTimestamp;

            if (newTimestampValue <= 0) {
                console.log('stop validator')
                setValidator(true)
                clearInterval(idInterval)
            }

            setTimestamp(newTimestampValue)

        }, 1000)

        return (() => { clearInterval(idInterval) })
    }, [])

    return (
        <div className={`row-event`}>
            <button className="btn-remove" onClick={remove}>REMOVE</button>
            <div className='t1'>
                <p contentEditable={true} style={{ fontSize: "20px" }} suppressContentEditableWarning={true}><strong>{name}</strong></p>
            </div>
            <div className='t2'>
                {formatDate(date)}
            </div>
            <div className='time'>
                {validator ? 'the big day has arrived 🥳🥳🥳' : formatTimestamp(timestampRow)}
            </div>
        </div >
    )
}

