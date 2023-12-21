import type { IDocument } from "../types";

export const breakpoints = {
  xl: 1440,
  lg: 1024,
  md: 744,
  sm: 480,
};

export const ambassadors = [
  "violeta-arus",
  "silvina-reyes",
  "carlota-corzo",
  "emily-zembo",
  "yu-fu",
];

export const professionals = ["camila-gonzalez"];

// {
//   name: "articles-of-incorporation",
//   displayName: "Articles of Incorporation (EN)",
// },
// {
//   name: "brochure",
//   displayName: "Brochure (EN)",
// },
// {
//   name: "cover-letter",
//   displayName: "Cover Letter (EN)",
// },
// {
//   name: "folleto",
//   displayName: "Folleto (ES)",
// },

export const documentsData = [
  {
    name: "certificate-of-incorporation",
    displayName: "Certificate of Incorporation (EN)",
  },
  {
    name: "tax-number",
    displayName: "TAX Number (EN)",
  },
] as IDocument[];
