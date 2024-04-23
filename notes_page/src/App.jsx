import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ShowAllSnippets } from "./components/ShowAllSnippets";
import { Stack, Divider, AppShell, Card } from "@mantine/core";
import { moveSnipdTo, filterSnipds, fetchDataFromChromeStorage } from "./utils/snipUtils";
import NavBarMantine from "./components/Navbar/NavBar";
import MantineSearchBar from "./components/MantineSearchBar";
import { Snippet } from "./components/Snippet/Snippet";
import { useEffect, useState } from "react";
import ERROR_MESSAGES from "./utils/errorMessages";
import CACHE_KEYS from "./utils/cacheKeys";
import "./assets/print.css";

function App() {
  const [snipds, setSnipds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isPrinting, setPrinting] = useState(false);
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    selectedCategory: "",
    selectedType: "",
  });

  const shouldShowClearButton =
    filterState.selectedCategory !== "" || filterState.selectedType !== "";

  const addCategory = async (newCategory) => {
    try {
      if (!newCategory.trim()) {
        throw new SnipdError(ERROR_MESSAGES.CATEGORY_EMPTY);
      } else if (categoryList.includes(newCategory)) {
        throw new SnipdError(ERROR_MESSAGES.CATEGORY_EXISTS);
      }

      await chrome.storage.local.set({
        [CACHE_KEYS.SNIPD_CATEGORIES]: [...categoryList, newCategory],
      });
      setCategoryList((old) => [...old, newCategory]);
    } catch (error) {
      throw new SnipdError(error?.message ?? ERROR_MESSAGES.ERROR_CATEGORIES);
    }
  };

  const fetchSnipdData = async () => {
    const { snipd_store, snipd_categories } = await fetchDataFromChromeStorage([
      CACHE_KEYS.SNIPD_STORE,
      CACHE_KEYS.SNIPD_CATEGORIES,
    ]);
    setSnipds(snipd_store);
    setCategoryList(snipd_categories);
  };

  const handleStorageChanges = (changes, namespace) => {
    if (namespace !== "local") return;

    const relevantChanges = changes.snipd_store || changes.snipd_categories;
    if (relevantChanges) {
      fetchSnipdData();
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    moveSnipdTo(result.source.index, result.destination.index).then(fetchSnipdData);
  };

  useEffect(() => {
    fetchSnipdData();
    chrome.storage.onChanged.addListener(handleStorageChanges);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChanges);
    };
  }, []);

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
      <div className="App" style={{ margin: "8px 48px 48px 48px" }}>
        <MantineSearchBar
          snippets={snipds}
          setPrinting={setPrinting}
          onSearch={(searchQueryInput) => {
            setFilterState({ ...filterState, searchQuery: searchQueryInput });
          }}
        />

        <Stack>
          <Divider />
          {/* <SortMenuComponent/> */}
          {shouldShowClearButton && (
            <ShowAllSnippets filterState={filterState} setFilterState={setFilterState} />
          )}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="cards-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {console.log(snipds)}
                  {filterSnipds(filterState, snipds).filteredSnipds.map((snip, index) => (
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
                                snip={snip}
                                categoryList={categoryList}
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
