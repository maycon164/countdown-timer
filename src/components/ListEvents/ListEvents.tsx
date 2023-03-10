import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../../context/CountdownContext';
import { formatDate, formatTimestamp } from '../../utils';
import './style.css';

export const ListEvents = () => {
  const { events } = useContext(CountdownContext);

  const orderedEvents = events.sort((event1, event2) => event1.timestamp - event2.timestamp)

  return (
    <div className='container-row-events'>
      {
        orderedEvents.length == 0 ? (
          <h1 className="message">You do not have Events Yet !!!</h1>
        ) : (
          orderedEvents.map(event => <RowEvent name={event.name} date={event.date} timestamp={event.timestamp} />)
        )
      }
    </div>

  )
};

export const RowEvent = ({ name, date, timestamp }: { name: string, date: string, timestamp: number }) => {
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
    <div className='row-event'>
      <div className='t1'>
        <p contentEditable={true} style={{ fontSize: "20px" }} suppressContentEditableWarning={true}><strong>{name}</strong></p>
      </div>
      <div className='t2'>
        {formatDate(date)}
      </div>
      <div className='time'>
        {validator ? 'the big day has arrived 🥳🥳🥳' : formatTimestamp(timestampRow)}
      </div>
    </div>
  )
}

