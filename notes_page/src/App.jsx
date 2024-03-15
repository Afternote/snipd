import { Button, Group, Stack, Divider, Title, AppShell } from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from "./utils/snipUtils";
import { Card, Text } from "@mantine/core";

import "./assets/print.css";
import { Snippet } from "./components/Snippet";
import NavBarMantine from "./components/NavBarMantine";

function filterSnipds(searchQuery, category, type, snipds) {
  const typeCountsTemp = {};
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

const initialCards = [
  { id: "card-1", content: "Card 1" },
  { id: "card-2", content: "Card 2" },
  { id: "card-3", content: "Card 3" },
];

function App() {
  const [snipds, setSnipds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isPrinting, setPrinting] = useState(false);
  const [cards, setCards] = useState(initialCards);

  const filteredSnipdActions = (searchQuery, selectedCategory, selectedType, snipds) => {
    console.log(searchQuery);
    const filteredSnipds = filterSnipds(searchQuery, selectedCategory, selectedType, snipds);
    return filteredSnipds.filteredSnipds;
  };

  const addCategory = async (newCategory) => {
    try {
      if (!newCategory.trim() || categoryList.includes(newCategory)) {
        throw new Error("error");
      } else {
        const newCategoryList = [...categoryList, newCategory];
        await chrome.storage.local.set({ snipd_categories: newCategoryList });
      }

      populateCategory(newCategory);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_CATEGORIES);
    }
  };

  const populateCategory = (newCategory) => {
    setCategoryList((old) => [...old, newCategory]);
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

    const listener = (changes, namespace) => {
      if (namespace === "local" && (changes.snipd_store || changes.snipd_categories)) {
        fetchData();
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  const refetch = () => {
    chrome.storage.local.get(["snipd_store"]).then((store_obj) => {
      setSnipds(store_obj.snipd_store);
    });

    chrome.storage.local.get(["snipd_categories"]).then((store_obj) => {
      setCategoryList(store_obj.snipd_categories);
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    moveSnipdUp(result.source.index).then(refetch);
  };

 

  return (
    <AppShell
      padding="md"
      navbar={
        isPrinting ? null : (
          <NavBarMantine
            addCategory={addCategory}
            categories={categoryList}
            snipds={snipds}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedType={setSelectedType}
            searchQuery={searchQuery}
          />
        )
      }>
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
          {/* <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="cards-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredSnipdActions(searchQuery, selectedCategory, selectedType, snipds).map(
                    (arr, idx) => {
                      return (
                        <Draggable key={idx} draggableId={idx} index={idx}>
                          {(provided) => (
                            <Snippet
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              key={idx}
                              index={idx}
                              refetch={refetch}
                              source={arr.source}
                              title={arr.title}
                              content={arr.content}
                              date={arr.date}
                              type={arr.type}
                            />
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="cards-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredSnipdActions(searchQuery, selectedCategory, selectedType, snipds).map(
                    (card, index) => (
                      <Draggable key={"Card_" + index} draggableId={"Card_" + index} index={index}>
                        {(provided) => (
                          <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ marginBottom: 10 }}>
                            <Snippet
                              ref={provided.innerRef}
                              key={index}
                              index={index}
                              refetch={refetch}
                              source={card.source}
                              title={card.title}
                              content={card.content}
                              date={card.date}
                              type={card.type}
                            />
                          </Card>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      </div>
    </AppShell>
  );
}

export default App;
