const isProd = process.env.NODE_ENV === "production";

module.exports = ({
  sanityProjectId,
  sanityDataset,
  sanityToken,
  siteName,
  homePath = "/"
}) => ({
  siteMetadata: {
    homePath,
    siteName
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: sanityProjectId,
        dataset: sanityDataset,
        token: sanityToken,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    }
  ]
});
