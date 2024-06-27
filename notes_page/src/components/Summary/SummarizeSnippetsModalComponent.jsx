import React from "react";
import { Modal, Button } from "@mantine/core";
import { useState, useEffect } from "react"; 
import { NativeSelect } from "@mantine/core";
import IconGemini from "../../assets/geminiIcon.png";
import { fetchDataFromChromeStorageByCategory } from "../../utils/snipUtils";
import CACHE_KEYS from "../../utils/cacheKeys";
import GeminiSummaryComponent from "./GeminiSummaryComponent";

const SummarizeSnippetsModalComponent = (props) => {
  const [value, setValue] = useState("Default");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    return () => {
      setValue("Default");
      setSummary("");
      setSummarizing(false);
    };
  }, []);

  /**
   * Handles the click event for the "Summarize" button.
   * Sends a POST request to the Gemini API with the selected category's data.
   * Updates the summary state with the response from the API.
   * @returns {Promise<void>} 
   */
  const handleSummarizeClick = async () => {
    try {
      // Reset the summary and loading states
      setSummarizing(true);
      setSummary(""); 
      setLoading(true);

      // Fetch data from Chrome Storage by category
      const data= await fetchDataFromChromeStorageByCategory(CACHE_KEYS.SNIPD_STORE, value);
      const dataWithoutImagesOrLinks = data.filter((item) => item.type !== "image" && item.type !== "link");
      // Send a POST request to the Gemini API
      const response = await fetch(
        "http://ec2-13-200-252-204.ap-south-1.compute.amazonaws.com:4040/gemini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWithoutImagesOrLinks),
        }
      );

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      // Parse the response JSON
      const responseJson = await response.text();
      if (!responseJson) {
        throw new Error("Empty response from the API");
      }
      const apiResponse = JSON.parse(responseJson);
      if (!apiResponse || !apiResponse.Candidates || !apiResponse.Candidates[0] || !apiResponse.Candidates[0].Content || !apiResponse.Candidates[0].Content.Parts || !apiResponse.Candidates[0].Content.Parts[0]) {
        throw new Error("Invalid response format from the API");
      }

      // Update the summary state with the response content
      setSummary(apiResponse.Candidates[0].Content.Parts[0]);
    } catch (error) {
      // Log any errors that occur
      console.error("Error:", error);
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSummarizing(false);
    props.handleModalClose();
  };

  return (
    <div>
      <Modal
        opened={props.modalState}
        onClose={handleModalClose}
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
                  alt="Gemini Icon"
                />
                Summarize
              </Button>
            </div>
          </div>
        )}
        {summarizing && <GeminiSummaryComponent summary={summary} loading={loading} />}
      </Modal>
    </div>
  );
};

export default SummarizeSnippetsModalComponent;
