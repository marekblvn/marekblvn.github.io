import { marked } from "marked";
import styled from "styled-components";

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 14px;
  image-rendering: pixelated;
`;

const ButtonText = styled.div`
  font-size: 13px;
  font-family: "MS Sans Serif", sans-serif;
  font-weight: bold;
`;

const Button = styled.a`
  text-decoration: none;
  color: #000;
  cursor: default;
  user-select: none;
  width: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  box-shadow: 1px 1px 0 #dbdbdb inset, -1px -1px 0 #808080 inset;
  background-color: var(--base-color);
  padding: 4px 8px;
  &:active {
    border-color: var(--outer-border-colors-inverted);
    box-shadow: 1px 1px 0 #808080 inset, -1px -1px 0 #dbdbdb inset;
  }
`;

interface ReadmeProps {
  readonly data: string;
  readonly repoName: string;
}
function Readme({ data = "", repoName = "" }: ReadmeProps) {
  return (
    <Content>
      <Button target="_blank" href={`https://github.com/marekblvn/${repoName}`}>
        <img
          src="/src/assets/icons/16x16/html.png"
          alt=""
          width="16px"
          height="16px"
        />
        <ButtonText>Visit project page</ButtonText>
      </Button>
      <Text dangerouslySetInnerHTML={{ __html: marked(data) }} />
    </Content>
  );
}

export default Readme;
