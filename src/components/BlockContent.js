/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import SanityPortableText from "@sanity/block-content-to-react";

const serializers = {
  types: {
    block: ({ node, children }) => {
      switch (node.style) {
        case "h1":
          return <Styled.h1>{children}</Styled.h1>;
        case "h2":
          return <Styled.h2>{children}</Styled.h2>;
        case "h3":
          return <Styled.h3>{children}</Styled.h3>;
        case "h4":
          return <Styled.h4>{children}</Styled.h4>;
        case "h5":
          return <Styled.h5>{children}</Styled.h5>;
        case "h6":
          return <Styled.h6>{children}</Styled.h6>;

        case "normal":
          return <Styled.p>{children}</Styled.p>;

        default:
          return null;
      }
    }
  },
  marks: {
    strong: props => <Styled.strong>{props.children}</Styled.strong>,
    em: props => <Styled.em>{props.children}</Styled.em>
  }
};

const BlockContent = ({ blocks }) => {
  return <SanityPortableText blocks={blocks} serializers={serializers} />;
};

export default BlockContent;
