import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const arrs = [{"id":1,
              "source":"link1",
              "title":"this is the title1",
              "content":"this is the content1",
              "date":"this is the date1"},
              {"id":2,
              "source":"link2",
              "title":"this is the title2",
              "content":"this is the content2",
              "date":"this is the date2"}]

function App() {
  
  return (
    <div className="App">
    {arrs.map(snippetList)}
     
    </div>
  )
}


function snippetList(arr){
  return (<>
    <Snippet 
          source={arr.source}
          title={arr.title}
          content={arr.content}
          date={arr.date}/>
  </>)
}

function Snippet(props){
  return(
    <><div>
      <h1>{props.source}</h1>
      <h1>{props.title}</h1>
      <h1>{props.content}</h1>
      <h1>{props.date}</h1>
      </div>
    </>
  )
}




export default App
