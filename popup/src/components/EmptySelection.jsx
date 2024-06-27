import React, { useEffect, useState } from "react";
import astronautUfo from "../assets/ufo_ast.png";
import { Button } from "@mantine/core";
import { openAllSnipdPage } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import { NewNote } from "./NewNote";
import { Text, Title, Card } from "@mantine/core";
import { MantineProvider, Switch } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import HomeIcon from "../assets/icons/HomeIcon";
import NoteIcon from "../assets/icons/NoteIcon";
export function EmptySelection() {
  const [isNewNote, setIsNewNote] = useState(false);
  const [researchMode, setResearchMode] = useState(false); // Initial state set to false

  const handleResearchSwitchClick = () => {
    setResearchMode(!researchMode);
  };

  useEffect(() => {
    // Retrieve researchMode from local storage on component mount
    chrome.storage.local.get("tooltip_enabled", (data) => {
      const storedResearchMode = data?.tooltip_enabled ?? true; // Default to true if not found
      setResearchMode(storedResearchMode);
    });
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Retrieve researchMode from local storage on component mount
    chrome.storage.local.set({ tooltip_enabled: researchMode });
  }, [researchMode]);

  const NoSelect = () => {
    return (
      <div className="emptySelectionDiv">
        <div
          style={{
            cursor: "",
            display: "flex",
            alignItems: "flex-end",
            marginRight: "16px",
            flexDirection: "column",
          }}>
          <Switch
            style={{ cursor: "pointer" }}
            color="indigo"
            size="xs"
            checked={researchMode}
            onChange={handleResearchSwitchClick}
            label={
              researchMode
                ? "Turn off Research Mode (disables tooltip)"
                : "Turn on Research Mode (enables tooltip)"
            }
            labelPosition="left"
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <ActionIcon
              color="indigo"
              onClick={() => setIsNewNote(true)}
              style={{ margin: "16px 4px 16px 16px" }}
              variant="filled"
              aria-label="Settings">
              <NoteIcon stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              onClick={() => openAllSnipdPage()}
              color="indigo"
              style={{ margin: "16px 0px 16px 4px" }}
              variant="filled"
              aria-label="Settings">
              <HomeIcon stroke={1.5} />
            </ActionIcon>
          </div>
        </div>
        <center>
          <img className="astronautUfoImage" src={astronautUfo} alt="Logo" />
          <MantineProvider theme={{ fontFamily: "Roboto" }}>
            <Card
              style={{
                backgroundColor: "rgba(244, 244, 244, 0.9)",
                padding: "16px",
                margin: "16px",
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
            <MantineProvider theme={{ fontFamily: "Roboto" }}>
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
            <MantineProvider theme={{ fontFamily: "Roboto" }}>
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
