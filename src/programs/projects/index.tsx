import styled from "styled-components";
import WindowTools from "../../components/window-tools/WindowTools";
import BasicToolbar from "../../components/basic-toolbar/BasicToolbar";
import DirectoryToolbar from "../../components/directory-toolbar/DirectoryToolbar";
import AddressToolbar from "../../components/address-toolbar/AddressToolbar";
import { DefaultMenu } from "../../data/menu-data";
import GithubRepoListProvider from "../../providers/GithubRepoListProvider";
import Root from "./Root";
import { MouseEvent, ReactElement, useRef, useState } from "react";
import GithubRepositoryReadmeProvider from "../../providers/GithubRepositoryReadmeProvider";
import Readme from "./Readme";

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
  overflow: auto;
  scroll-behavior: smooth;
`;

function Index() {
  const addressRef = useRef<string>("Projects");
  const [currentAddress, setCurrentAddress] = useState<string>("");

  function handleChangeAddress(_: MouseEvent, newAddress: string): void {
    addressRef.current = addressRef.current + "/" + newAddress;
    setCurrentAddress(newAddress);
  }

  function renderProvidedData(data: Array<Record<string, any>>): ReactElement {
    return <Root items={data} onDoubleClickShortcut={handleChangeAddress} />;
  }

  function renderReadme(data: string): ReactElement {
    return <Readme data={data} repoName={currentAddress} />;
  }
  return (
    <Content>
      <WindowTools>
        <BasicToolbar menuItems={DefaultMenu} />
        <DirectoryToolbar />
        <AddressToolbar address={addressRef.current} />
      </WindowTools>
      <View>
        {currentAddress === "" ? (
          <GithubRepoListProvider
            onData={renderProvidedData}
            onError={(err) => console.log(err)}
            onLoadingComponent={null}
          />
        ) : (
          <GithubRepositoryReadmeProvider
            repoName={currentAddress}
            onData={renderReadme}
            onError={(err) => console.log(err)}
            onLoadingComponent={null}
          />
        )}
      </View>
    </Content>
  );
}

export default Index;
