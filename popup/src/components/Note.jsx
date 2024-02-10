import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CategoriesMenu from "./CategoriesMenu";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
import { Chip, Stack } from "@mui/material";
import { openAllSnipdPage, saveSnipd } from "../utils/snippitUtils";
import { Button, Title } from "@mantine/core";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

export default function Note({ snipd }) {
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [category, setCategory] = React.useState("Default");

  const populateCategory = (newCategory) => {
    setCategoriesList((old) => [...old, newCategory]);
  };

  const addCategory = (newCategory) => {
    chrome.storage.local.get(["snipd_categories"]).then((obj) => {
      const new_category_list = [...obj.snipd_categories, newCategory];
      chrome.storage.local.set({ snipd_categories: new_category_list }).then(() => {
        populateCategory(newCategory);
      });
    });
  };

  React.useEffect(() => {
    chrome.storage.local.get(["snipd_categories"]).then((obj) => {
      if (obj.snipd_categories) {
        obj.snipd_categories.forEach((category) => {
          populateCategory(category);
        });
      }
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}>
      <CardContent>
        <Typography
          style={{
            margin: "8px",
            textAlign: "center",
          }}
          fontSize={24}
          variant="h4">
          <Title order={2}>Selected Highlight</Title>
        </Typography>
      </CardContent>
      <div style={{ margin: "16px" }}>
        <Divider variant="middle">
          <Chip
            label={snipd?.title.length > 30 ? `${snipd.title.substring(0, 30)}...` : snipd.title}
          />
        </Divider>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <Typography
            display="inline"
            style={{
              margin: "8px",
              fontSize: "12px",
            }}
            color="text.secondary">
            on {new Date(snipd?.date).toLocaleDateString()}{" "}
            {new Date(snipd?.date).toLocaleTimeString()}
          </Typography>
        </Stack>
        <hr />
        <div>
          {snipd?.type === "image" && (
            <img
              src={snipd?.content}
              style={{ width: "100%", maxHeight: "200px", objectFit: "scale-down" }}
            />
          )}
        </div>
        {snipd?.type === "text" && (
          <Typography
            style={{
              margin: "16px",
              fontSize: "12px",
            }}
            variant="body2">
            {snipd?.content}
            <br />
          </Typography>
        )}
        {snipd?.type === "link" && (
          <Typography
            style={{
              margin: "16px",
              fontSize: "12px",
            }}
            variant="body2">
            {snipd?.content.length > 40 ? `${snipd.content.substring(0, 40)}...` : snipd.content}
            <br />
          </Typography>
        )}
        <hr />
      </div>
      <div>
        <center>
          <p>Current category: {category}</p>
          <CategoriesMenu
            categoriesList={categoriesList}
            addCategory={addCategory}
            style={{
              alignItems: "center",
            }}
            setCategory={setCategory}
          />
        </center>
        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            style={{ margin: "16px" }}
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
