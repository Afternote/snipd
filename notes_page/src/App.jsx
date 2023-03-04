import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Card, Text, Badge, Button, Group } from '@mantine/core';

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
    <div className="App" style={{ width: '95vh' }}>
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
  // return(
  //   <><div>
  //     <h1>{props.source}</h1>
  //     <h1>{props.title}</h1>
  //     <h1>{props.content}</h1>
  //     <h1>{props.date}</h1>
  //     </div>
  //   </>
  // )
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder
       style={{ marginBottom: '2rem' }}>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.title}</Text>
        <Badge color="green" variant="light">
          {props.date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
     {props.content}
      </Text>

      <Button variant="light" color="pink" fullWidth mt="md" radius="md">
        {props.source}
      </Button>
    </Card>
  );
}




export default App
