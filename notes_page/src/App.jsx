import { Button, Group, Stack, Divider, Title, AppShell } from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

import "./assets/print.css";
import { Snippet } from "./components/Snippet";
import NavBarMantine from "./components/NavBarMantine";

function filterSnipds(searchQuery, category, type, snipds) {
  const typeCountsTemp = {}; // Reset count for each filtering operation
  const filteredSnipds = snipds.filter((a) => {
    const textToSearch = `${a.content} ${a.title}`.toLowerCase();
    const matchesCriteria =
      (!category || a.category === category) &&
      (!type || a.type === type) &&
      textToSearch.includes(searchQuery.toLowerCase());

    if (matchesCriteria) {
      typeCountsTemp[a.type] = (typeCountsTemp[a.type] || 0) + 1;
    }

    return matchesCriteria;
  });

  return { filteredSnipds, typeCountsTemp };
}


function App() {
  const [snipds, setSnipds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeCounts, setTypeCounts] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("");
  const [categoryFilterQuery, setCategoryFilterQuery] = useState("")
  const [isPrinting, setPrinting] = useState(false);

  const filteredSnipdActions = (searchQuery, selectedCategory, selectedType, snipds) => {
    console.log(searchQuery)
    const filteredSnipds = filterSnipds(searchQuery, selectedCategory, selectedType, snipds);
    // setTypeCounts(filteredSnipds.typeCountsTemp);
    return filteredSnipds.filteredSnipds;
  };

  const print = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 200);
  };

  useEffect(() => {
    const fetchData = async () => {
      const store_obj = await chrome.storage.local.get(["snipd_store", "snipd_categories"]);
      setSnipds(store_obj.snipd_store);
      setCategoryList(store_obj.snipd_categories);
    };

    fetchData();
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
    <AppShell
      padding="md"
      navbar={
        isPrinting ? null : (
          <NavBarMantine
            categories={categoryList}
            snipds={snipds}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedType={setSelectedType}
            searchQuery={searchQuery}
          />
        )
      }>
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
          {(selectedCategory !== "" || selectedType !== "") && (
            <Button
              variant="outline"
              color="error"
              onClick={() => {
                setSelectedCategory("");
                setSelectedType("");
              }}>
              Show all snipds
            </Button>
          )}
          {filteredSnipdActions(searchQuery, selectedCategory, selectedType, snipds).map(
            (arr, idx) => {
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
            }
          )}
        </Stack>
      </div>
    </AppShell>
  );
}

export default App;
