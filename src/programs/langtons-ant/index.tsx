import styled from "styled-components";

const Content = styled.div`
  height: calc(100% - 18px);
  display: flex;
  flex-direction: column;
`;

const View = styled.div`
  flex: 1;
  margin: 2px;
  height: calc(100% - 4px);
  border-width: 1px;
  border-style: solid;
  border-color: #000 #fff #fff #000;
  box-shadow: 1px 1px 0 #808080 inset, -1px -1px 0 #dbdbdb inset;
  background-color: #fff;
  user-select: none;
`;

function Index() {
  return (
    <Content>
      <View>
        <embed
          src="https://marekblvn.github.io/langtons-ant/"
          width="100%"
          height="100%"
          type="text/html"
        />
      </View>
    </Content>
  );
}

export default Index;
