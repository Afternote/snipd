import React, { useEffect, useState } from "react";
import { CardContent } from "@mui/material";
import { Badge, Button, Title, Text, MantineProvider } from "@mantine/core";
import CategoriesMenuMantine from "./CategoriesMenuMantine";
import {
  openAllSnipdPage,
  saveSnipd,
  truncateString,
  validateCategory,
} from "../utils/snippitUtils";
import { ERROR_MESSAGES } from "../utils/errorMessages";
import { STORAGE_KEYS } from "../utils/localStorageKeys";
import "../styles/Notes.css";
import AddCustomNoteCard from "./AddCustomNoteCard";
import CustomNoteDisplayCard from "./CustomNoteDisplayCard";
import SaveIcon from "../assets/icons/SaveIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import BadgeContainer from "./Popup/BadgeContainer";
import ContentCard from "./Popup/Content/ContentCard";
import CustomButton from "./CustomButton";

const Note = ({ snipd }) => {
  const [snipdCategories, setSnipdCategories] = useState([]);
  const [category, setCategory] = useState("Default");

  const truncatedTitle = truncateString(snipd?.title, 30);

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
    snipd.category = category;
    snipd.customNotes = customNotes;
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
    <div className="container">
      <div className="card-content">
          <Title className="title" align="center" sx={{ padding: "0px" }} order={5}>
            Selected Highlight
            <br />
          </Title>
      </div>
      <div style={{ overflow: "auto" }}>
        <BadgeContainer
          truncatedTitle={truncatedTitle}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
        />

        <ContentCard snipd={snipd} />

        {customNotes.map((note) => (
          <CustomNoteDisplayCard note={note} />
        ))}

        <AddCustomNoteCard customNotes={customNotes} setCustomNotes={setCustomNotes} />

        <div className="categories-menu">
          <CategoriesMenuMantine
            category={category}
            categoriesList={snipdCategories}
            addCategory={addCategory}
            setCategory={setCategory}></CategoriesMenuMantine>
        </div>
      </div>{" "}
      <div className="buttons-container">
        <CustomButton
          onClick={handleSaveSnippet}
          color="teal"
          content="Save Snippet"
          icon={SaveIcon}
        />

        <CustomButton
          onClick={openAllSnipdPage}
          color="blue"
          content="Central Page"
          icon={HomeIcon}
        />
      </div>
    </div>
  );
};

export default Note;
