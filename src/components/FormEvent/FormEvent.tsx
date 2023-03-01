import { useContext, useState } from 'react';
import { CountdownContext, EventType } from '../../context/CountdownContext';
import { getTimestamp } from '../../utils';
import './style.css';

export const FormEvent = () => {
  const [nameEvent, setNameEvent] = useState<string>('');
  const [dateEvent, setDateEvent] = useState<string>('');
  const [details, setDetails] = useState<{ hours: number, minutes: number }>({ hours: 0, minutes: 0 })
  const [moreDetails, setMoreDetails] = useState(true);

  const [validation, setValidation] = useState<{ valid: boolean, message: string }>({ valid: true, message: '' })

  const { addEvent } = useContext(CountdownContext);

  function handleOnSubmit(e) {
    e.preventDefault();

    if (nameEvent == '') {
      setValidation({ valid: false, message: 'Please provide a name event' });
      return;
    }

    if (dateEvent == '') {
      setValidation({ valid: false, message: 'Please put a correct date' });
      return;
    }

    const timestampDateEvent = getTimestamp(dateEvent, details);
    const currentTimestamp = new Date().getTime();

    if (timestampDateEvent - currentTimestamp <= 0) {
      setValidation({ valid: false, message: 'Please add a future date' })
      return;
    }

    setValidation({ valid: true, message: '' })

    const payload: Omit<EventType, 'id'> = {
      name: nameEvent,
      date: dateEvent,
      timestamp: getTimestamp(dateEvent, details),
    };

    clearFields();
    addEvent(payload as EventType)
  }

  function clearFields() {
    setNameEvent('');
    setDateEvent('');
  }

  function handleDetails(specificDetail: "hours" | "minutes", value: number) {
    setDetails(prev => {
      return {
        ...prev,
        [specificDetail]: value as number
      }
    })
  }

  return (
    <>

      <form onSubmit={handleOnSubmit} className="form-event">
        <h1> Add a new Reminder to your Event!!!</h1>
        <div className="wrap-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameEvent}
            onChange={(e) => setNameEvent(e.target.value)}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            value={dateEvent}
            onChange={(e) => setDateEvent(e.target.value)}
          />
        </div>

        <div className='wrap-input' style={{ margin: '0px' }}>
          <p>
            <input type="checkbox" id="more" defaultChecked={moreDetails} onChange={e => setMoreDetails(!moreDetails)} /> <label htmlFor="more" style={{ fontSize: "12px" }}>More details</label>
          </p>
        </div>
        {moreDetails && (
          <div className='container-details-input'>
            <div className='wrap-details-input'>
              <label htmlFor="">Hours:</label>

              <input type="number" value={details.hours} onChange={e => handleDetails('hours', parseInt(e.target.value))} />

            </div>
            <div className='wrap-details-input'>
              <label htmlFor="">Minutes:</label>
              <input type="number" value={details.minutes} onChange={e => handleDetails('minutes', parseInt(e.target.value))} />
            </div>
          </div>
        )}

        <button className="btn-submit">Add Reminder</button>
        {validation.valid == false && (<p className='message'>👁👄👁💅 {validation.message}</p>)}
      </form>
    </>
  );
};
