import React, { useEffect, useState } from "react";
import { CardContent } from "@mui/material";
import { Badge } from "@mantine/core";
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
import TextCard from "./TextCard";
import AddCustomNoteCard from "./AddCustomNoteCard";
import CustomNoteDisplayCard from "./CustomNoteDisplayCard";
import SaveIcon from "../assets/icons/SaveIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import ImageCard from "./ImageCard";
import LinkCard from "./LinkCard";

const Note = ({ snipd }) => {
  const [snipdCategories, setSnipdCategories] = useState([]);
  const [category, setCategory] = useState("Default");

  const truncatedTitle = truncateString(snipd?.title, 30);
  const truncatedContent = truncateString(snipd?.content, 40);

  const formattedDate = snipd.date.toString().split(",")[0];
  const formattedTime = snipd.date.toString().split(",")[1];

  const [customNotes, setCustomNotes] = useState([]);

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
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}>
      <div>
        <CardContent
          style={{
            padding: "4px",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Title align="center" sx={{ padding: "0px" }} style={{ color: "white" }} order={5}>
              Selected Highlight
              <br />
            </Title>
          </MantineProvider>
        </CardContent>
      </div>
      <div style={{ overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Badge
            style={{ margin: "8px 8px 4px 8px" }}
            variant="light"
            color="rgba(73, 152, 201, 1)">
            {truncatedTitle}
          </Badge>
          <Badge style={{ margin: "4px 8px 0px 8px" }} variant="light" color="gray">
            {formattedDate} {formattedTime}
          </Badge>
        </div>

        {snipd?.type === "text" && <TextCard snipd={snipd} />}
        {snipd?.type === "image" && <ImageCard content={snipd?.content} />}
        {snipd?.type === "link" && <LinkCard truncatedContent={truncatedContent} />}

        {customNotes.map((note) => (
          <CustomNoteDisplayCard note={note} />
        ))}

        <AddCustomNoteCard customNotes={customNotes} setCustomNotes={setCustomNotes} />

        <div
          style={{
            margin: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CategoriesMenuMantine
            category={category}
            categoriesList={snipdCategories}
            addCategory={addCategory}
            setCategory={setCategory}></CategoriesMenuMantine>
        </div>
      </div>{" "}
      <div style={{ margin: "8px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Button
          variant="filled"
          style={{ margin: "4px" }}
          onClick={handleSaveSnippet}
          color="teal"
          radius="lg">
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <SaveIcon />
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              Save Snippet
            </Text>
          </MantineProvider>
        </Button>

        <Button
          variant="filled"
          style={{ margin: "4px" }}
          onClick={openAllSnipdPage}
          color="blue"
          radius="lg">
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <HomeIcon />
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              Central Page
            </Text>
          </MantineProvider>
        </Button>
      </div>
    </div>
  );
};

export default Note;
