import { useContext } from 'react';
import { CountdownContext } from '../../context/CountdownContext';
import { RowEvent } from './RowEvent';
import './style.css';

export const ListEvents = () => {
  const { events, removeEvent } = useContext(CountdownContext);

  const orderedEvents = events.sort((event1, event2) => event1.timestamp - event2.timestamp)

  return (
    <div className='container-row-events'>
      {
        orderedEvents.length == 0 ? (
          <h1 className="message">You do not have Events Yet !!!</h1>
        ) : (
          orderedEvents.map(event => <RowEvent remove={() => removeEvent(event.id)} name={event.name} date={event.date} timestamp={event.timestamp} key={event.id} />)
        )
      }
    </div>

  )
};

