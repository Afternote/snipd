import React, { useEffect, useState } from "react";
import {  CardContent, Divider, Chip, Stack } from "@mui/material";
import CategoriesMenuMantine from "./CategoriesMenuMantine";
import {
  openAllSnipdPage,
  saveSnipd,
  truncateString,
  validateCategory,
} from "../utils/snippitUtils";
import { Button, Title, Text, MantineProvider } from "@mantine/core";
import { ERROR_MESSAGES } from "../utils/errorMessages";
import { STORAGE_KEYS } from "../utils/localStorageKeys";
import "../styles/Notes.css";

const Note = ({ snipd }) => {
  const [snipdCategories, setSnipdCategories] = useState([]);
  const [category, setCategory] = useState("Default");

  const truncatedTitle = truncateString(snipd?.title, 30);
  const truncatedContent = truncateString(snipd?.content, 40);

  const formattedDate = snipd.date.toString().split(",")[0];
  const formattedTime = snipd.date.toString().split(",")[1];

  const fetchSnipdCategories = async () => {
    try {
      const { snipd_categories } = await chrome.storage.local.get([STORAGE_KEYS.SNIPD_CATEGORIES]);
      return snipd_categories || [];
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DATA_FETCH_ERROR + error);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      validateCategory(newCategory, snipdCategories);

      const newCategoryList = [...snipdCategories, newCategory];
      await chrome.storage.local.set({ snipd_categories: newCategoryList });

      populateCategory(newCategory);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_CATEGORIES);
    }
  };

  const populateCategory = (newCategory) => {
    setSnipdCategories((old) => [...old, newCategory]);
  };

  const handleSaveSnippet = () => {
    console.log(snipd);
    snipd.category = category;
    saveSnipd(snipd).then(() => {
      if (snipd) {
        chrome.windows.getCurrent(function (window) {
          chrome.windows.remove(window.id);
        });
        window.close();
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchSnipdCategories();
        setSnipdCategories(categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="notes-root-div" style={{ height: "100vh" }}>
      <CardContent style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MantineProvider
          theme={{
            fontFamily: "Roboto",
          }}>
          <Title order={2}>Selected Highlight</Title>
        </MantineProvider>
      </CardContent>
      <div className="margin-16" style={{ overflow: "auto" }}>
        <Divider variant="middle">
          <Chip label={truncatedTitle} />
        </Divider>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              on {formattedDate} {formattedTime}
            </Text>
          </MantineProvider>
        </Stack>
        <hr />
        <div>
          {snipd?.type === "image" && (
            <img className="selected-image" src={snipd?.content} alt="selected image" />
          )}
        </div>
        {snipd?.type === "text" && (
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              {snipd?.content}
              <br />
            </Text>
          </MantineProvider>
        )}
        {snipd?.type === "link" && (
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              {truncatedContent}
              <br />
            </Text>
          </MantineProvider>
        )}
        <hr />
      </div>
      <div>
        <center>
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Text fz="lg" lh="sm" style={{ padding: "8px" }}>
              Current category: {category}
            </Text>
          </MantineProvider>
          
          <CategoriesMenuMantine
            categoriesList={snipdCategories}
            addCategory={addCategory}
            setCategory={setCategory}></CategoriesMenuMantine>
        </center>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            style={{ width: "90%", margin: "4px" }}
            onClick={handleSaveSnippet}
            color="cyan"
            radius="xl">
            <MantineProvider
              theme={{
                fontFamily: "Roboto",
              }}>
              <Text fz="md" lh="sm" style={{ padding: "8px" }}>
                Save Snippet
              </Text>
            </MantineProvider>
          </Button>

          <Button
            style={{ width: "90%", margin: "4px" }}
            onClick={openAllSnipdPage}
            color="cyan"
            radius="xl">
            <MantineProvider
              theme={{
                fontFamily: "Roboto",
              }}>
              <Text fz="md" lh="sm" style={{ padding: "8px" }}>
                Central Page
              </Text>
            </MantineProvider>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
