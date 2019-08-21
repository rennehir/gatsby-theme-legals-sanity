/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Link } from "gatsby";

import BlockContent from "./BlockContent";

const LegalPageBody = ({ pages }) => (
  <section>
    <div
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row", "row"],
        maxWidth: "1240px",
        margin: "0 auto",
        padding: ["0", "0", "100px 20px", "100px 20px"],
        position: "relative"
      }}
    >
      <div
        sx={{
          flex: "1",
          margin: ["0px", "0px", "30px", "50px"],
          padding: ["60px 20px", "60px 20px", "0 0 400px", "0 0 400px"]
        }}
      >
        {pages.map(page => (
          <div
            sx={{
              my: 5
            }}
          >
            <Styled.h2>
              <Link
                to={page.slug.current}
                sx={{
                  color: "text"
                }}
              >
                {page.pageTitle}
              </Link>
            </Styled.h2>
            <BlockContent blocks={page.description} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LegalPageBody;
