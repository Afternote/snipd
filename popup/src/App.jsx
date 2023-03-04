import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Note from './components/Note'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{
      width:'100%', height:'100%'
    }}>
      <Note 
      bookName={"The Brain"}
      highlightedText={"fasdfasdfsdf"}
      pageNumber={"25"}
      date={"Monday 25th March, 2023"}
      time={"12:00 PM"}
      style={{
        width:'100%', height:'100%'
      }}/>
    </div>
  )
}

export default App
