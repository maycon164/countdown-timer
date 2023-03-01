
import { CountdownProvider } from './context/CountdownContext'
import './App.css'
import { FormEvent } from './components/FormEvent/FormEvent'
import { ListEvents } from './components/ListEvents/ListEvents'
import { ModalMessage } from './components/ModalMessage/ModalMessage'

function App() {

  return (
    <div className="App">
      <h1>It's a Countdown App</h1>
      <CountdownProvider>
        <FormEvent />
        <ListEvents />
      </CountdownProvider>
    </div>
  )
}

export default App