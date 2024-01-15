import React from "react";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  // ToggleButtonGroup,
  // ToggleButton,
  // Divider,
} from "./BlogStyle";
import BlogCards from "../Cards/BlogCards";
import { blogs } from "../../data/constants";

const Blogs = ({ blogModal, setblogModal }) => {
  const [toggle, setToggle] = useState("all");
  return (
    <Container id="blogs">
      <Wrapper>
        <Title>Blogs</Title>
        <Desc>
          feel free to read more about my Tech Blogs.
        </Desc>
        {/* <ToggleButtonGroup>
          {toggle === "all" ? (
            <ToggleButton active value="all" onClick={() => setToggle("all")}>
              All
            </ToggleButton>
          ) : (
            <ToggleButton value="all" onClick={() => setToggle("all")}>
              All
            </ToggleButton>
          )}
          <Divider />
          {toggle === "web app" ? (
            <ToggleButton
              active
              value="web app"
              onClick={() => setToggle("web app")}
            >
              WEB APP'S
            </ToggleButton>
          ) : (
            <ToggleButton value="web app" onClick={() => setToggle("web app")}>
              WEB APP'S
            </ToggleButton>
          )}
          <Divider />
        </ToggleButtonGroup> */}
        <CardContainer>
          {toggle === "all" &&
            blogs.map((project) => (
              <BlogCards
                project={project}
                blogModal={blogModal}
                setblogModal={setblogModal}
              />
            ))}
          {blogs
            .filter((item) => item.category === toggle)
            .map((project) => (
              <BlogCards
                project={project}
                blogModal={blogModal}
                setblogModal={setblogModal}
              />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Blogs;
