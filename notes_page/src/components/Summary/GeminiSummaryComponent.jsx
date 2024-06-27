import React, { useState } from "react";
import { Skeleton, Text, Button, ActionIcon } from "@mantine/core";

const GeminiSummaryComponent = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(props.summary);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div>
      {props.loading && (
        <div>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
      )}

      {!props.loading && (
        <div>
          <Text>{props.summary}</Text>
          <div style={{display:'flex', justifyContent:'right'}}>
            <Button
              variant="light"
              style={{ margin: "16px 0px 16px 16px" }}
              onClick={handleCopyClick}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiSummaryComponent;