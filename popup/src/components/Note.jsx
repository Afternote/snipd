import React from "react";
import { useEffect, useState } from "react";
import { CardActions, CardContent, Divider, Typography, Chip, Stack } from "@mui/material";
import CategoriesMenu from "./CategoriesMenu";
import { openAllSnipdPage, saveSnipd, truncateString } from "../utils/snippitUtils";
import { Button, Title } from "@mantine/core";
import { ERROR_MESSAGES } from "../utils/errorMessages";
import { STORAGE_KEYS } from "../utils/localStorageKeys";
import "../styles/Notes.css";

export default function Note({ snipd }) {

  const [snipdCategories, setSnipdCategories] = useState([]);
  const [category, setCategory] = React.useState("Default");

  const truncatedTitle = truncateString(snipd?.title, 30);
  const truncatedContent = truncateString(snipd?.content, 40);

  const fetchSnipdCategories = async () => {
    try {
      const { snipd_categories } = await chrome.storage.local.get([STORAGE_KEYS.SNIPD_CATEGORIES]);
      return snipd_categories || [];
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DATA_FETCH_ERROR + error);
    }
  };

  const populateCategory = (newCategory) => {
    setSnipdCategories((old) => [...old, newCategory]);
  };

  const addCategory = async (newCategory) => {
    try {
      if (!newCategory.trim()) {
        throw new Error(ERROR_MESSAGES.EMPTY_CATEGORY);
      }

      if (snipdCategories.includes(newCategory)) {
        throw new Error(ERROR_MESSAGES.DUPLICATE_CATEGORY);
      }

      const newCategoryList = [...snipdCategories, newCategory];
      await chrome.storage.local.set({ snipd_categories: newCategoryList });

      populateCategory(newCategory);
    } catch (error) {
      console.error(error.message);
    }
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
            on {new Date(snipd?.date).toLocaleDateString()}{" "}
            {new Date(snipd?.date).toLocaleTimeString()}
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
          <Button
            className="margin-16"
            onClick={() => {
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
            }}>
            Save Snippet
          </Button>
          <Button onClick={() => openAllSnipdPage()}>Central Page</Button>
        </CardActions>
      </div>
    </div>
  );
}
