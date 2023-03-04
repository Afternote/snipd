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
  const [snipds, setSnipds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    chrome.storage.local.get(["snipd_store"]).then(store_obj => {
      setSnipds(store_obj.snipd_store);
    });
    // setSnipds(arrs);
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 280 }}
          fixed
          p={10}
          style={{ backgroundColor: "white" }}
        >
          <Center>
            <img src={reactLogo} width="100px" />
          </Center>

          <Title order={2} align="left" color={"green"} mt={10}>
            Collections
          </Title>
          <Divider mb={5} mt={5} />
          <Stack spacing={"xs"} color={"black"}>
            <NavLink label="History Research" />
            <NavLink label="Interesting Reddit Collection" />
            <NavLink label="Cats" />
          </Stack>
        </Navbar>
      }
    >
      <div className="App" style={{ width: "95vh", margin: "auto" }}>
        <Group position="apart" mb={"lg"}>
          <Title order={2}>Snipd</Title>
          <MantineSearchBar onSearch={(searchQuery) => {
            setSearchQuery(searchQuery);
          }}/>
        </Group>
        <Stack>
          <Divider />
          {filterSnipds(searchQuery, snipds).map(snippetList)}
        </Stack>
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
