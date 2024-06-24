import React from "react";
import { Text, Checkbox, SimpleGrid, Modal, Button } from "@mantine/core";
import { useState } from "react";
import { NativeSelect } from "@mantine/core";
import IconGemini from "../../assets/geminiIcon.png";
import { Skeleton } from "@mantine/core";
import { fetchDataFromChromeStorageByCategory } from "../../utils/snipUtils";
import CACHE_KEYS from "../../utils/cacheKeys";
import GeminiSummaryComponent from "./GeminiSummaryComponent";

const SummarizeSnippetsModalComponent = (props) => {
  const [value, setValue] = useState("Default");
  const [currentCategory, setCurrentCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false); // [summarizing, setSummarizing]

  const handleSummarizeClick = async () => {
    try {
      const data = await fetchDataFromChromeStorageByCategory(CACHE_KEYS.SNIPD_STORE, value);
      console.log(value);
      console.log(JSON.stringify(data));
      setSummarizing(true)
      setLoading(true);

      const response = await fetch('http://ec2-13-200-252-204.ap-south-1.compute.amazonaws.com:4040/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseJson = await response.text();
      const apiResponse = JSON.parse(responseJson);
      console.log(apiResponse.message);
      console.log(apiResponse.Candidates[0].Content.Parts[0]);
      setSummary(apiResponse.Candidates[0].Content.Parts[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Modal
        opened={props.modalState}
        onClose={props.handleModalClose}
        title="Summarize Snippets with Gemini"
        centered>
        {!summarizing && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NativeSelect
              size="xs"
              label="Select a Category"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              data={props.categoryList}
            />
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "right" }}>
              <Button variant="light" onClick={handleSummarizeClick}>
                <img
                  src={IconGemini}
                  style={{ margin: "8px", color: "white", width: "24px", height: "24px" }}
                />
                Summarize
              </Button>
            </div>
          </div>
        )}
        {summarizing && (
          <GeminiSummaryComponent summary ={summary} loading={loading}/>
        )}

        

        
      </Modal>
    </div>
  );
};

export default SummarizeSnippetsModalComponent;
