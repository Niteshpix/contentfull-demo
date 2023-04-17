import * as contentful from "contentful";
const contentfulmanagement = require("contentful-management");

export const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const admin = contentfulmanagement.createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_ENV_ID,
});
