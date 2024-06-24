import React from "react";
import { Skeleton, Text } from "@mantine/core";
const GeminiSummaryComponent = (props) => {
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
        </div>
      )}
    </div>
  );
};

export default GeminiSummaryComponent;
