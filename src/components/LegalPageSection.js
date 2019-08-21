/** @jsx jsx */
import { jsx } from "theme-ui";
import { getSectionId } from "../helpers";
import { InView } from "react-intersection-observer";
import { Styled } from "theme-ui";

import BlockContent from "./BlockContent";

export const LegalPageSection = ({ index, section, sectionInViewHandler }) => {
  const { heading, content } = section;
  const sectionId = getSectionId(index, heading);

  return (
    <InView
      id={sectionId}
      className="legal-page-section"
      sx={{
        padding: "30px 0",
        maxWidth: "750px"
      }}
      rootMargin="-100px 0px 0px"
      as="div"
      onChange={inView => sectionInViewHandler(index, inView)}
    >
      <Styled.h2
        className="section-title"
        sx={{
          marginBottom: "30px"
        }}
      >
        {heading}
      </Styled.h2>
      <BlockContent blocks={content} />
    </InView>
  );
};
