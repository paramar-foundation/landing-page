"use client";

import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";

import { pdfjs, Document, Page } from "react-pdf";

import { Footer, Main, NavigationBar, PageSection } from "../../components";

import styles from "./files.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export default function ContactPage({ params }: { params: { name: string } }) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection isLastSection>
        <Document
          file="./cover-letter.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className={styles["document-viewer"]}
        >
          <Page key={`page_${1}`} pageNumber={1} width={1000} />
        </Document>
      </PageSection>
      <Footer />
    </Main>
  );
}
