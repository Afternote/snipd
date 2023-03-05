import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Divider,
  Title,
  AppShell,
  Center,
  Image,
} from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";


function filterSnipds(searchQuery, snipds) {
  return snipds.filter((a) => {
    if (a.content.includes(searchQuery.toLowerCase())) {
      return a;
    }
  });
}

function App() {
  const [snipds, setSnipds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["snipd_store"]).then((store_obj) => {
      setSnipds(store_obj.snipd_store);
    });
    // setSnipds(arrs);
  }, []);

  return (
    <AppShell padding="md" navbar={<NavBar />}>
      <div className="App" style={{ width: "95vh", margin: "auto" }}>
        <Group position="apart" mb={"lg"}>
          <Title order={2}>Snipd</Title>
          <MantineSearchBar
            onSearch={(searchQuery) => {
              setSearchQuery(searchQuery);
            }}
          />
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
  return <Snippet source={arr.source} title={arr.title} content={arr.content} date={arr.date} type={arr.type} />;
}

function Snippet(props) {
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
          { props.type !== "image" ? 
              <Text size="sm" color="dimmed">
                {props.content}
              </Text> :
              <Center>
                  <img src={props.content} loading="lazy" />
              </Center>
          }
        </Card>
      </Center>

      <Divider />
    </Stack>
  );
}

export default App;