import reactLogo from "./assets/snipdLogo.jpg";
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Divider,
  Navbar,
  Title,
  AppShell,
  Center,
  NavLink,
} from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";

const arrs = [
  {
    id: 1,
    source: "link1",
    title: "This is the title1",
    content: "this is the content1",
    date: "this is the date1",
  },
  {
    id: 2,
    source: "link2",
    title: "this is the title2",
    content: "this is the content2",
    date: "this is the date2",
  },
  {
    id: 3,
    source: "link1",
    title: "this is the title1",
    content: "this is the content1",
    date: "this is the date1",
  },
  {
    id: 4,
    source: "link1",
    title: "this is the title1",
    content: "this is the content1",
    date: "this is the date1",
  },
  {
    id: 5,
    source: "link1",
    title: "this is the title1",
    content: "this is the content1",
    date: "this is the date1",
  },
];

function filterSnipds(searchQuery, snipds) {
  return snipds.filter((a)=>{if(a.content.includes(searchQuery.toLowerCase())){return a}});
}

function App() {
  return (
    <>
      
      <div className="App" style={{ width: "95vh", margin:"auto" }}>
      
        <img src={reactLogo} width="70vh"/>
        <MantineSearchBar/>
        {arrs.map(snippetList)}
      </div>
    </AppShell>
  );
}

function snippetList(arr) {
  return (
    <Snippet
      source={arr.source}
      title={arr.title}
      content={arr.content}
      date={arr.date}
    />
  );
}

function Snippet(props) {
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
    <Stack>
      <Group position="apart">
        <Group>
          <Title order={3}>{props.title}</Title>
          <Badge color="gray" size="sm" radius="sm" variant="outline">
            {props.date}
          </Badge>
        </Group>

        <Button variant="light" color="pink" mt="md">
          {props.source}
        </Button>
      </Group>

      <Center>
        <Card w={"90%"}>
          <Text size="sm" color="dimmed">
            {props.content}
          </Text>
        </Card>
      </Center>

      <Divider />
    </Stack>
  );
}

export default App;
