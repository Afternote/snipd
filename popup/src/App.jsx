import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Note from './components/Note'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Note/>
    </div>
  )
}

export default App
