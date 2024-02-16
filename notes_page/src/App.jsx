import {
  Button,
  Group,
  Stack,
  Divider,
  Title,
  AppShell,
} from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

import "./assets/print.css";
import { Snippet } from "./components/Snippet";
import NavBarMantine from "./components/NavBarMantine";

function filterSnipds(searchQuery, category, snipds) {
  console.log(category)
  return snipds.filter((a) => {
    if (!category) {
      if (a.content.toLowerCase().includes(searchQuery.toLowerCase()) || a.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return a;
      }
    } else {
      if ((a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||  a.title.toLowerCase().includes(searchQuery.toLowerCase())) 
           && a.category === category ) {
        
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
    <AppShell padding="md" navbar={isPrinting ? null : <NavBarMantine />}>
          {/* <AppShell padding="md" navbar={isPrinting ? null : <NavBar categoryList={categoryList} setSelectedCategory={setSelectedCategory} />}> */}

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
            console.log(arr)
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



export default App;
