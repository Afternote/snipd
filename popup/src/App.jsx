import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Note from './components/Note'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{
      width:'100%', height:'100%'
    }}>
      <Note style={{
        width:'100%', height:'100%'
      }}/>
    </div>
  )
}

export default App
