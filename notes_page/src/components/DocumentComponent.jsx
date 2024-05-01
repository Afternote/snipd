import React from 'react'
import { Document } from 'redocx'
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

const DocumentComponent = () => {
  return (
    <Document>
      <Text>My Document Title</Text>
      <Text>This is a paragraph of text.</Text>
      <Image src="https://www.example.com/image.jpg" width={400} />
    </Document>
  )
}

export default DocumentComponent