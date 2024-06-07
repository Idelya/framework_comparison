import type { GatsbyConfig } from "gatsby"
require("dotenv").config({
  path: `.env`,
});

const path = require("path");

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-ssg-app`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images'),
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}

export default config
