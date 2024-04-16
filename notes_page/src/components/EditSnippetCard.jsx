import React from "react";
import { Input, Button } from "@mantine/core";
import { useState } from "react";
import { Textarea } from "@mantine/core";
import { NativeSelect } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import XIcon from "../assets/icons/XIcon";

import "../styles/EditSnippetStyles.css";

const EditSnippetCard = (props) => {
  const [title, setTitle] = useState(props.snip.title);
  const [content, setContent] = useState(props.snip.content);
  const [currentCategory, setCurrentCategory] = useState(props.snip.category);

  const handleCloseIconClick = () => {
    props.setEditFlag(false);
  };

  const handleSaveSnippet = () => {
    chrome.storage.local.get(["snipd_store"]).then((result) => {
      const snipd_store = result.snipd_store || []; 
      const updatedSnipdStore = snipd_store.map((snip) => {
         return snip.id === props.snip.id ? { ...snip, title, content, category: currentCategory } : snip;
      });
      chrome.storage.local.set({ snipd_store: updatedSnipdStore });
      props.setEditFlag(false);
   });
   
  };

  return (
    <div className="edit-snippet-card">
      <div className="close-icon-container">
        <ActionIcon
          variant="filled"
          size="xs"
          radius="xl"
          onClick={handleCloseIconClick}
          aria-label="close">
          <XIcon style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
      <div className="title-category-row">
        <Input
          style={{ flex: "3", marginRight:'8px' }}
          placeholder="Input component"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <NativeSelect
          style={{ flex: "1" }}
          value={currentCategory}
          onChange={(event) => setCurrentCategory(event.currentTarget.value)}
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
      <div className="save-button-container">
        <Button onClick={handleSaveSnippet} variant="light" radius="xl">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditSnippetCard;
