import React from "react";
import { Input, Badge, Button } from "@mantine/core";
import { useState } from "react";
import { Textarea } from "@mantine/core";
import { NativeSelect } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import XIcon from "../assets/icons/XIcon";

const EditSnippetCard = (props) => {
  const [title, setTitle] = useState(props.snip.title);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <ActionIcon
          style={{ marginBottom: "8px" }}
          variant="filled"
          size="xs"
          radius="xl"
          aria-label="close">
          <XIcon style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Input
          style={{ flexGrow: "3", margin: "0px 8px 0px 0px" }}
          placeholder="Input component"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <NativeSelect
          style={{ flexGrow: "1", margin: "0px 0px 8px 8px" }}
          data={["React", "Angular", "Vue"]}
        />
      </div>

      <Textarea placeholder="Input placeholder" value={props.snip.content} />
      <div style={{ margin: "8px 0px 0px 0px", display: "flex", justifyContent: "right" }}>
        <Button variant="light" radius="xl">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditSnippetCard;
