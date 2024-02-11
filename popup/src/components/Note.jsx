import React, { useEffect, useState } from "react";
import { CardActions, CardContent, Divider, Typography, Chip, Stack } from "@mui/material";
import CategoriesMenu from "./CategoriesMenu";
import { openAllSnipdPage, saveSnipd, truncateString, validateCategory } from "../utils/snippitUtils";
import { Button, Title } from "@mantine/core";
import { ERROR_MESSAGES } from "../utils/errorMessages";
import { STORAGE_KEYS } from "../utils/localStorageKeys";
import "../styles/Notes.css";

const Note = ({ snipd }) => {

  const [snipdCategories, setSnipdCategories] = useState([]);
  const [category, setCategory] = useState("Default");

  const truncatedTitle = truncateString(snipd?.title, 30);
  const truncatedContent = truncateString(snipd?.content, 40);

  const formattedDate = new Date(snipd?.date).toLocaleDateString();
  const formattedTime = new Date(snipd?.date).toLocaleTimeString();

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
    <div className="notes-root-div">
      <CardContent>
        <Typography className="selected-highlight-heading" variant="h4">
          <Title order={2}>Selected Highlight</Title>
        </Typography>
      </CardContent>
      <div className="margin-16">
        <Divider variant="middle">
          <Chip label={truncatedTitle} />
        </Divider>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <Typography display="inline" className="date-typography" color="text.secondary">
            on {formattedDate} {formattedTime}
          </Typography>
        </Stack>
        <hr />
        <div>
          {snipd?.type === "image" && (
            <img className="selected-image" src={snipd?.content} alt="selected image" />
          )}
        </div>
        {snipd?.type === "text" && (
          <Typography className="selected-text-typography" variant="body2">
            {snipd?.content}
            <br />
          </Typography>
        )}
        {snipd?.type === "link" && (
          <Typography className="selected-link-typography" variant="body2">
            {truncatedContent}
            <br />
          </Typography>
        )}
        <hr />
      </div>
      <div>
        <center>
          <p>Current category: {category}</p>
          <CategoriesMenu
            className="categories-menu"
            categoriesList={snipdCategories}
            addCategory={addCategory}
            setCategory={setCategory}
          />
        </center>
        <CardActions className="categories-card">
          <Button className="margin-16" onClick={handleSaveSnippet}>
            Save Snippet
          </Button>
          <Button onClick={openAllSnipdPage}>Central Page</Button>
        </CardActions>
      </div>
    </div>
  );
}

export default Note;
