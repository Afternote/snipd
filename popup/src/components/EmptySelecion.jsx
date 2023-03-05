import { Card, Typography } from "@mui/material";
import confused from "../assets/confused.png";
import { Button } from "@mui/material";
import { openAllSnipdPage } from "../utils/snippitUtils";

export function EmptySelecion() {
  return (
    <div>
      <Card
        style={{
          width: "100%",
          height: "100%",
        }}>
        <center>
          <img
            style={{ width: "150px", height: "150px", paddingTop: "16px" }}
            src={confused}
            alt="Logo"
          />
        </center>
        <Typography
          style={{
            margin: "16px",
            fontSize: "15px",
            textAlign: "center",
          }}
          variant="body2">
          Umm... Feels like you didn't select anything!! ☹️
          <br />
          <br />
          Try selecting the text you want to Highlight
          <br />
        </Typography>

        <center>
          <Button style={{ margin: "16px" }} variant="outlined" onClick={() => openAllSnipdPage()}>
            Central Page
          </Button>
        </center>
      </Card>
    </div>
  );
}
