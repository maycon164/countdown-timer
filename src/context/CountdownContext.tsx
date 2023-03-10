import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export type EventType = {
  id: number;
  name: string;
  date: string;
  timestamp: number;
  details?: {
    hours: number,
    minutes: number
  }
};

type CountdownContextType = {
  readonly events: EventType[];
  addEvent: (event: EventType) => void;
};

export const CountdownContext = createContext<CountdownContextType>(undefined!);

export const CountdownProvider = ({ children }: PropsWithChildren<{}>) => {
  const [listEvents, setListEvents] = useState<EventType[]>([]);

  useEffect(() => {

    const previousEvents = localStorage.getItem('values');
    if (previousEvents) setListEvents(JSON.parse(previousEvents));

  }, [])

  function addEvent(event: Omit<EventType, 'id'>) {
    const verifyId = listEvents.find(
      (event) => event.id === listEvents.length + 1
    );

    if (!verifyId) {

      const newListEvents = [
        ...listEvents,
        {
          id: listEvents.length + 1,
          ...event,
        },
      ]
      localStorage.setItem('values', JSON.stringify(newListEvents))
      setListEvents(newListEvents);
    }
  }

  return (
    <CountdownContext.Provider
      value={{
        addEvent,
        events: listEvents,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
