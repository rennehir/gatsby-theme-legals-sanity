// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) throw result.errors;
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const legalPageTemplate = require.resolve("./src/templates/legal.js");

  const legalPages = await wrapper(
    graphql(`
      {
        allSanityLegal {
          edges {
            node {
              id
              slug {
                current
              }
            }
          }
        }
      }
    `)
  );

  const legalPageList = legalPages.data.allSanityLegal.edges;

  /* ---------------------------------------------
  = Create an individual page for each Information page =
  ----------------------------------------------- */

  legalPageList.forEach(edge => {
    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `/${edge.node.slug.current}/`,
      component: legalPageTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        id: edge.node.id
      }
    });
  });
};
