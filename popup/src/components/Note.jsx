import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CategoriesMenu from "./CategoriesMenu";
import Typography from "@mui/material/Typography";
import "../App.css";
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
  const addCategory = (newCategory) => {
    setCategoriesList((old) => [...old, newCategory]);
  };

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

        <Typography
          style={{
            margin: "16px",
            fontSize: "12px",
          }}
          variant="body2">
          {snipd?.content}
          <br />
        </Typography>

        <hr />
      </CardContent>
      <center>
        <CategoriesMenu
          categoriesList={categoriesList}
          addCategory={addCategory}
          style={{
            alignItems: "center",
          }}
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
            saveSnipd(snipd);
            if (snipd) {
              window.close();
            }
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
