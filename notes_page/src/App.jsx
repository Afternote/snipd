import { Button, Group, Stack, Divider, Title, AppShell } from "@mantine/core";
import MantineSearchBar from "./components/searchBar";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { moveSnipdTo, filterSnipds } from "./utils/snipUtils";
import { Card } from "@mantine/core";
import { ShowAllSnippets } from "./components/ShowAllSnippets";
import "./assets/print.css";
import { Snippet } from "./components/Snippet";
import NavBarMantine from "./components/NavBarMantine";

function App() {
  const [snipds, setSnipds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isPrinting, setPrinting] = useState(false);
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    selectedCategory: "",
    selectedType: "",
  });

  const shouldShowClearButton = filterState.selectedCategory !== "" || filterState.selectedType !== "";

  
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

  const fetchSnipdData = async () => {
    const store_obj = await chrome.storage.local.get(["snipd_store", "snipd_categories"]);
    setSnipds(store_obj.snipd_store);
    setCategoryList(store_obj.snipd_categories);
  };

  const handleStorageChanges = (changes, namespace) => {
    if (namespace === "local" && (changes.snipd_store || changes.snipd_categories)) {
      fetchSnipdData();
    }
  };

  useEffect(() => {
    fetchSnipdData();

    chrome.storage.onChanged.addListener(handleStorageChanges);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChanges);
    };
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    moveSnipdTo(result.source.index, result.destination.index).then(fetchSnipdData);
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
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )
      }>
      <div className="App" style={{ margin: "48px" }}>
        <MantineSearchBar
          setPrinting={setPrinting}
          onSearch={(searchQueryInput) => {
            setFilterState({...filterState, searchQuery: searchQueryInput})
          }}
        />
        <Stack>
          <Divider />
          {shouldShowClearButton && (
            <ShowAllSnippets
              filterState = {filterState}
              setFilterState = {setFilterState}
            />
          )}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="cards-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filterSnipds(
                    filterState.searchQuery,
                    filterState.selectedCategory,
                    filterState.selectedType,
                    snipds
                  ).filteredSnipds.map((card, index) => (
                    <Draggable key={"Card_" + index} draggableId={"Card_" + index} index={index}>
                      {(provided) => (
                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                          <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ width: "100%", margin: 10 }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <Snippet
                                ref={provided.innerRef}
                                key={index}
                                index={index}
                                refetch={fetchSnipdData}
                                source={card.source}
                                title={card.title}
                                content={card.content}
                                date={card.date}
                                type={card.type}
                              />
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
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
