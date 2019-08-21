import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import LegalPageHero from "../components/LegalPageHero";
import ListBody from "../components/ListBody";
import { Styled } from "theme-ui";

const LegalPagesListTemplate = ({ data }) => {
  const {
    site: {
      siteMetadata: { homePath, siteName }
    },
    pages
  } = data;

  const { nodes: pagesData } = pages;

  return (
    <Styled.root>
      <Layout siteName={siteName} title="PLACEHOLDER Legal texts">
        <LegalPageHero
          title="PLACEHOLDER Legal texts"
          homePath={homePath}
          siteName={siteName}
          isListView
        />
        <ListBody pages={pagesData} />
      </Layout>
    </Styled.root>
  );
};

export default LegalPagesListTemplate;

export const pageQuery = graphql`
  query LegalPages {
    site {
      siteMetadata {
        siteName
        homePath
      }
    }
    pages: allSanityLegal {
      nodes {
        id
        pageTitle: title
        description: _rawDescription
        slug {
          current
        }
      }
    }
  }
`;
