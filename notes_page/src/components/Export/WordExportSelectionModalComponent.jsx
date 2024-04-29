import React from "react";
import { Modal, Button } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";

import {
  Document,
  HeadingLevel,
  HorizontalPosition,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  VerticalAlign,
} from "docx";

import { Checkbox } from "@mantine/core";

const WordExportSelectionModalComponent = (props) => {
  return (
    <Modal opened={props.modalState} onClose={props.handleModalClose} title="Export Snippets" centered>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{margin:'16px'}}>Please Select the components that you want to include in the export</div>
        <SimpleGrid style={{ margin: "16px" }} cols={3}>
          <div>
            <Checkbox defaultChecked label="Title" />
          </div>
          <div>
            {" "}
            <Checkbox defaultChecked label="Category" />
          </div>
          <div>
            {" "}
            <Checkbox defaultChecked label="Date/Time" />
          </div>
        </SimpleGrid>
        <div style={{margin:'16px', display:'flex', justifyContent:'right'}}>
          <Button variant="light">Export</Button>
        </div>
      </div>
    </Modal>
  );
};

export default WordExportSelectionModalComponent;

// const doc = new Document({
//   sections: [
//     {
//       children: snippets.flatMap((snippet) => {
//         if (snippet.type === "image") {
//         } else {
//           const contentElements = [
//             new Paragraph({
//               text: snippet.title,
//               heading: HeadingLevel.HEADING_1,
//             }),
//             new Paragraph({
//               text: snippet.category,
//               heading: HeadingLevel.HEADING_6,
//             }),
//           ];
//           contentElements.push(
//             new Paragraph({
//               children: [new TextRun(snippet.content)],
//               spacing: { after: 400 },
//             })
//           );
//           return contentElements;
//         }
//       }),
//     },
//   ],
// });
// const blob = Packer.toBlob(doc).then((blob) => {
//   saveAs(blob, "example.docx");
// });
