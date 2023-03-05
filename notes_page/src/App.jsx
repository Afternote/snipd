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
import { SettingsInputAntennaOutlined } from "@mui/icons-material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

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

      <div className="App" style={{  margin: "48px" }}>
        <Group style={{ marginTop: '16px' }} position="apart" mb={"lg"}>
          <Title order={2}>Snipd</Title>
          <MantineSearchBar
            onSearch={(searchQuery) => {
              setSearchQuery(searchQuery);
            }}
          />
        </Group>
        <Stack>
          <Divider />
          {filterSnipds(searchQuery, snipds).map((arr, idx) => {
            return <Snippet key={idx} source={arr.source} title={arr.title} content={arr.content} date={arr.date} type={arr.type} />;
          })}
        </Stack>
      </div>
    </AppShell>
  );
}

function Snippet(props) {
  return (
    <div style={{
      display:'flex',
    }}>
              <Card style={{
                margin:'16px', padding:'16px'
              }}>

      <Stack style={{height:'100%'}} align="center" justify="space-around" >
        <ArrowCircleUpIcon />
        <DeleteForeverIcon/>
        <ArrowCircleDownIcon />
        
      </Stack>
      </Card>
      <Stack style={{width:'100%'}}>
        <Group position="apart">
          <Title >{props.title}</Title>
          <Badge color="gray" size="md" radius="sm" variant="outline">
            {props.date}
          </Badge>
        </Group>
        <Button variant="light" color="pink">
          {props.source}
        </Button>

        <Center>
          <Card >
            {props.type === "image" ?
              <Center>
                <img src={props.content} loading="lazy" />
              </Center> :
              <Text size="sm" color="dimmed">
                {props.content}
              </Text>
            }
          </Card>
        </Center>

        <Divider />
      </Stack>
    </div>
  );
}

export default App;