module.exports = {
  siteMetadata: {
    title: `Wolt CY`,
    description: `An extensive FAQ page for Wolt Cyprus' partners.`,
    author: `@evan-kapantais`,
    siteUrl: `https://wolt-faq-cy.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [370, 560, 1200],
          backgroundColor: `transparent`,
        },
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `wolt-client`,
        short_name: `wolt`,
        start_url: `/`,
        background_color: `#00c2e8`,
        theme_color: `#00c2e8`,
        display: `minimal-ui`,
        icon: `src/images/wolt-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://wolt-server-cy.herokuapp.com`,
        collectionTypes: ["section", "news-item"],
        singleTypes: [
          "version",
          "banner-text",
          "banner-image",
          "decorative-image",
          "topics-order",
        ],
        queryLimit: 1000,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
