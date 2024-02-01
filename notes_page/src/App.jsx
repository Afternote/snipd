import {
  Card,
  Text,
  Badge,
  Button,
  Anchor,
  Group,
  Stack,
  Divider,
  Title,
  AppShell,
  Center,
  Image,
  Tooltip,
} from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { SettingsInputAntennaOutlined } from "@mui/icons-material";
import { useHover } from "@mantine/hooks";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from "./utils/snipUtils";
import "./assets/print.css";

function filterSnipds(searchQuery, category, snipds) {
  return snipds.filter((a) => {
    if (!category) {
      if (a.content.toLowerCase().includes(searchQuery.toLowerCase()) || a.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return a;
      }
    } else {
      if (a.content.toLowerCase().includes(searchQuery.toLowerCase()) && a.category === category || a.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return a;
      }
    }
  });
}

function App() {
  const [snipds, setSnipds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isPrinting, setPrinting] = useState(false);

  const print = () => {
      setPrinting(true);
      setTimeout(() => { 
          window.print();
          setPrinting(false);
      }, 200);
  };

  useEffect(() => {
    chrome.storage.local.get(["snipd_store"]).then((store_obj) => {
      setSnipds(store_obj.snipd_store);
    });

    chrome.storage.local.get(["snipd_categories"]).then((store_obj) => {
      setCategoryList(store_obj.snipd_categories);
    });
    // setSnipds(arrs);
  }, []);

  const refetch = () => {
    chrome.storage.local.get(["snipd_store"]).then((store_obj) => {
      setSnipds(store_obj.snipd_store);
    });

    chrome.storage.local.get(["snipd_categories"]).then((store_obj) => {
      setCategoryList(store_obj.snipd_categories);
    });
  };

  return (
    <AppShell padding="md" navbar={isPrinting ? null : <NavBar categoryList={categoryList} setSelectedCategory={setSelectedCategory} />}>
      <div className="App" style={{ margin: "48px" }}>
        <Group className="printHide" style={{ marginTop: "16px" }} position="apart" mb={"lg"}>
          <Title order={2}>Snipd</Title>
          <MantineSearchBar
            onSearch={(searchQuery) => {
              setSearchQuery(searchQuery);
            }}
            print={print}
          />
        </Group>
        <Stack>
          <Divider />
          {selectedCategory !== "" && (
            <Button
              variant="outline"
              color="error"
              onClick={() => {
                setSelectedCategory("");
              }}>
              Show all snipds
            </Button>
          )}
          {filterSnipds(searchQuery, selectedCategory, snipds).map((arr, idx) => {
            return (
              <Snippet
                key={idx}
                index={idx}
                refetch={refetch}
                source={arr.source}
                title={arr.title}
                content={arr.content}
                date={arr.date}
                type={arr.type}
              />
            );
          })}
        </Stack>
      </div>
    </AppShell>
  );
}

function Snippet(props) {
  const { hovered, ref } = useHover();
  const handleSourceButtonClick = () => {
    window.location.href = props.source;
  };
  return (
    <div
      ref={ref}
      style={{
        marginRight: "24px",
        display: "flex",
        alignItems: "center",
      }}>
      {/* Item Controls - up, down, delete */}
      <Card
        className="printHide"
        radius={8}
        style={{
          margin: "0 8px",
          padding: "4px",
          opacity: hovered ? 1 : 0,
          height: "90%",
        }}>
        <Stack style={{ height: "100%" }} align="center" justify="space-around">
          <ArrowCircleUpIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              moveSnipdUp(props.index).then(() => {
                props.refetch();
              });
            }}
          />
          <DeleteForeverIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteSnipd(props.index).then(() => {
                props.refetch();
              });
            }}
          />
          <ArrowCircleDownIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              moveSnipdDown(props.index).then(() => {
                props.refetch();
              });
            }}
          />
        </Stack>
      </Card>

      {/* Item Title, Date, Source */}
      <Stack style={{ width: "100%" }}>
        {props.type !== "link" && props.type !== "note" && (
          <Stack align={"flex-start"}>
            <Badge
              style={{ marginRight: "16px" }}
              color="gray"
              size="sm"
              radius="sm"
              variant="outline">
              {props.date}
            </Badge>
            <Group position="apart">
              <Title order={3}>{props.title}</Title>
              {hovered && (
                <Button compact variant="light" onClick={handleSourceButtonClick} w={80}>
                  Source
                </Button>
              )}
            </Group>
          </Stack>
        )}

        {/* Item Content */}
        <Center>
          <Card style={{ width: "90%", padding: "8px" }}>
            {props.type === "image" && (
              <Center>
                <img src={props.content} loading="lazy" />
              </Center>
            )}
            {(props.type === "text" || props.type === "note") && (
              <Text size="sm" color="dimmed">
                {props.content}
              </Text>
            )}
            {props.type === "link" && (
              <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                <Anchor style={{ width: "100%" }} href={props.content}>
                  <Stack style={{ width: "100%" }} spacing={"xs"}>
                    <Group position="apart">
                      <Text lineClamp={1}>{props.title}</Text>

                      <Badge color="gray" size="sm" radius="sm" variant="outline">
                        {props.date}
                      </Badge>
                    </Group>
                    <Text size="sm" color="dimmed" lineClamp={1}>
                      {props.content}
                    </Text>
                  </Stack>
                </Anchor>
              </div>
            )}
          </Card>
        </Center>

        <Divider />
      </Stack>
    </div>
  );
}

export default App;
