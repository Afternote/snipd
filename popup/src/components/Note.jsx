import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CategoriesMenu from "./CategoriesMenu";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
import { Chip, Stack } from "@mui/material";
import { openAllSnipdPage, saveSnipd } from "../utils/snippitUtils";

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
      chrome.storage.local.get(["snipd_categories"]).then(obj => {
          const new_category_list = [...obj.snipd_categories, newCategory];
          chrome.storage.local.set({snipd_categories: new_category_list}).then(() => {
              populateCategory(newCategory);
          });
      });
  };

  React.useEffect(() => {
      chrome.storage.local.get(["snipd_categories"]).then(obj => {
          if (obj.snipd_categories) {
              obj.snipd_categories.forEach(category => {
                  populateCategory(category);
              });
          }
      });
  }, []);

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
      }}>
      <CardContent>
        <Typography
          style={{
            margin: "8px",
            textAlign: "center",
          }}
          fontSize={24}
          variant="h4">
          Selected Highlight
        </Typography>

        <Divider variant="middle">
          <Chip label={snipd?.title} />
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

        {
            snipd?.type !== "image" ? 
            <Typography
                style={{
                    margin: "16px",
                    fontSize: "12px",
                }}
                variant="body2">
            {snipd?.content}
            <br />
            </Typography> :
            <img src={snipd?.content} style={{ minWidth: "100%", maxWidth: "350px", maxHeight: "200px", objectFit: "cover" }} />

        }

        <hr />
      </CardContent>
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
          variant="outlined"
          style={{ margin: "16px" }}
          onClick={() => {
            console.log(snipd);
            snipd.category = category;
            saveSnipd(snipd).then(() => {
                if (snipd) {
                  window.close();
                }
            });
          }}>
          Save Snippet
        </Button>
        <Button variant="outlined" onClick={() => openAllSnipdPage()}>
          Central Page
        </Button>
      </CardActions>
    </Card>
  );
}
