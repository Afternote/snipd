import React, { useState } from "react";
import astronautUfo from "../assets/ufo_ast.png";
import { Button } from "@mantine/core";
import { openAllSnipdPage } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import { NewNote } from "./NewNote";
import { Text, MantineProvider, Title, Card } from "@mantine/core";

export function EmptySelection() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
    return (
      <div className="emptySelectionDiv">
        <center>
          <img className="astronautUfoImage" src={astronautUfo} alt="Logo" />
          <MantineProvider theme={{ fontFamily: "Roboto" }}>
            <Card
              style={{
                backgroundColor: "rgba(244, 244, 244, 0.9)",
                padding: "16px",
                borderRadius: "12px",
              }}>
              <Title order={3}>Uh Oh! Nothing Found</Title>

              <Text fz="md" lh="sm" style={{ padding: "8px" }}>
                To save a snippet, please make a selection. It appears that no{" "}
                <b>text/image/link</b> has been selected.
              </Text>
            </Card>
          </MantineProvider>
        </center>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            style={{ width: "90%", margin: "4px" }}
            onClick={() => setIsNewNote(true)}
            color="cyan"
            radius="xl">
            <MantineProvider
              theme={{
                fontFamily: "Roboto",
              }}>
              <Text fz="md" lh="sm" style={{ padding: "8px" }}>
                Make note
              </Text>
            </MantineProvider>
          </Button>

          <Button
            style={{ width: "90%", margin: "4px" }}
            onClick={() => openAllSnipdPage()}
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
    );
  };

  return <div>{isNewNote ? <NewNote onClose={() => setIsNewNote(false)} /> : <NoSelect />}</div>;
}
