import React, { useState } from "react";
import { Button, Group, Image, Stack, Text } from "@mantine/core";

import { NewNote } from "./NewNote";
import { openAllSnipdPage } from "../utils/snippitUtils";
import astronautUfo from "../assets/ufo_ast.png";

export function EmptySelection() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
    return (
      <Stack h={"95vh"} align="center" justify="center">
        <center>
          <Image w={"100%"} src={astronautUfo} alt="Logo" />
          <Text m={16} fw={700} fz={18}>
            To save a snippet, please make a selection. <hr />
            It appears that no text/image/link has been selected.
          </Text>
        </center>

        <Group position="center">
          <Button m={16} onClick={() => setIsNewNote(true)}>
            Make note
          </Button>

          <Button m={16} onClick={() => openAllSnipdPage()}>
            Central Page
          </Button>
        </Group>
      </Stack>
    );
  };

  return <div>{isNewNote ? <NewNote onClose={() => setIsNewNote(false)} /> : <NoSelect />}</div>;
}
