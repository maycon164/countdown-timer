import { FormEvent, useContext, useRef, useState } from 'react';
import { CountdownContext } from '../../context/CountdownContext';
import { InputTypeEvent } from './InputTypeEvent';
import { getTimestamp } from '../../utils';
import { TypeEvents } from './types';
import './style.css';

export const FormEventComponent = () => {
  const [nameEvent, setNameEvent] = useState<string>('');
  const [dateEvent, setDateEvent] = useState<string>('');
  const [details, setDetails] = useState<{ hours: number, minutes: number }>({ hours: 0, minutes: 0 })
  const [moreDetails, setMoreDetails] = useState(true);

  const [validation, setValidation] = useState<{ valid: boolean, message: string }>({ valid: true, message: '' })

  const [typeEvent, setTypeEvent] = useState<TypeEvents>('mpl');

  const { addEvent } = useContext(CountdownContext);

  function handleOnSubmit(e: FormEvent) {
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

        {
          moreDetails && (
            <div className='wrap-input'>
              <label htmlFor="type">Type:</label>
              <div className='wrap-select'>

                <InputTypeEvent type={typeEvent} />

                <select name="type" id="type" onChange={e => setTypeEvent(e.target.value as TypeEvents)}>
                  <option value="mpl">MPL</option>
                  <option value="nintendo">Nintendo Event</option>
                  <option value="champions">Champions League</option>
                  <option value="birthday">Birthday</option>
                </select>
              </div>

            </div>
          )
        }

        <button className="btn-submit">Add Reminder</button>
        {validation.valid == false && (<p className='message'>👁👄👁💅 {validation.message}</p>)}
      </form>
    </>
  );
};


