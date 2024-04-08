import React, { useEffect } from "react";
import { Input, Badge, Button } from "@mantine/core";
import { useState } from "react";
import { Textarea } from "@mantine/core";
import { NativeSelect } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import XIcon from "../assets/icons/XIcon";

const EditSnippetCard = (props) => {
  const [title, setTitle] = useState(props.snip.title);
  const [content, setContent] = useState(props.snip.content);
  const [currentCategory, setCurrentCategory] = useState(props.snip.category);

  const handleCloseIconClick = () => {
    props.setEditFlag(false);
  };

  const handleSaveSnippet = () => {
    chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
        const snipd_store = [...old_snipd_store.snipd_store];

        snipd_store.forEach((snip) => {
            if (snip.id === props.snip.id) {
                snip.title = title;
                snip.content = content;
                snip.category = currentCategory;
            }
        });

        chrome.storage.local.set({ snipd_store: snipd_store }); 
        props.setEditFlag(false);

    });
};

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <ActionIcon
          style={{ marginBottom: "8px" }}
          variant="filled"
          size="xs"
          radius="xl"
          onClick={handleCloseIconClick}
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
          value={currentCategory}
          onChange={(event) => setCurrentCategory(event.currentTarget.value)}
          style={{ flexGrow: "1", margin: "0px 0px 8px 8px" }}
          data={props.categoryList}
        />
      </div>

      <Textarea
        onChange={(event) => setContent(event.currentTarget.value)}
        autosize
        minRows={2}
        maxRows={6}
        placeholder="Input placeholder"
        value={content}
      />
      <div style={{ margin: "8px 0px 0px 0px", display: "flex", justifyContent: "right" }}>
        <Button onClick={handleSaveSnippet} variant="light" radius="xl">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditSnippetCard;
