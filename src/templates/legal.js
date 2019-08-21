import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import LegalPageHero from "../components/LegalPageHero";
import LegalPageBody from "../components/LegalPageBody";
import { Styled } from "theme-ui";

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const LegalPageTemplate = props => {
  const [sectionsInView, setSectionsInView] = useState([]);

  const sectionInViewHandler = (sectionIndex, isInView) => {
    let newSectionsInView = [...sectionsInView];
    const indexExists = newSectionsInView.includes(sectionIndex);
    if (isInView) {
      // Intersection Observer has notified us section has come into view
      // indexExists prevents us from adding duplicates
      if (!indexExists) newSectionsInView = [...sectionsInView, sectionIndex];
    } else {
      // Intersection Observer has notified us section is now out of view
      newSectionsInView = sectionsInView.filter(
        index => index !== sectionIndex
      );
    }
    if (!arraysEqual(sectionsInView, newSectionsInView)) {
      // Only if a new section has come into, or an existing section has come
      // out of view, we update the state.
      setSectionsInView(newSectionsInView);
    }
  };

  // The 'active' section is the section closest to the top of the page that
  // are still in view (therefore, the smallest index in our array)
  const activeSection =
    sectionsInView.length > 0
      ? sectionsInView.reduce((a, b) => Math.min(a, b))
      : 0;

  const {
    data: {
      site: {
        siteMetadata: { homePath = "/", siteName = "placeholder" }
      },
      page: pageData
    }
  } = props;

  const { pageTitle, sections } = pageData;

  return (
    <Styled.root>
      <Layout siteName={siteName} title={pageTitle}>
        <LegalPageHero
          title={pageTitle}
          homePath={homePath}
          siteName={siteName}
        />
        <LegalPageBody
          activeSection={activeSection}
          sectionInViewHandler={sectionInViewHandler}
          sections={sections}
        />
      </Layout>
    </Styled.root>
  );
};

export default LegalPageTemplate;

export const pageQuery = graphql`
  query LegalPageById($id: String!) {
    site {
      siteMetadata {
        siteName
        homePath
      }
    }
    page: sanityLegal(id: { eq: $id }) {
      pageTitle: title
      sections {
        sectionHeading: heading
        content {
          children {
            text
          }
        }
      }
    }
  }
`;
