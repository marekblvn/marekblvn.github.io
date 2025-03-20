import styled from "styled-components";
import Start from "../start/Start";
import Time from "../time/Time";
import IconButton from "../icon-button/IconButton";

const Bar = styled.div`
  background-color: var(--base-color);
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #dbdbdb;
  height: 30px;
  width: 100%;
`;

const BarInnerDiv = styled.div`
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #fff;
  display: grid;
  align-items: center;
  grid-template-rows: 100%;
  grid-template-columns: 65px 2px auto 4px 100px;
  padding: 0 3px;
  height: 29px;
  width: calc(100% - 6px);
`;

const Divider = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: transparent #fff transparent #808080;
  width: 0px;
  height: 22px;
`;

const Settings = styled.div`
  height: 22px;
  width: 98px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors-inverted);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 8px);
  height: 22px;
  column-gap: 2px;
  padding: 0 2px;
`;

function Taskbar() {
  return (
    <Bar>
      <BarInnerDiv>
        <Start />
        <Divider />
        <Tasks></Tasks>
        <Divider />
        <Settings>
          <div
            style={{
              display: "inline-flex",
              margin: "0 3px",
              columnGap: "2px",
            }}
          >
            <IconButton icon="task-scheduler" />
            <IconButton icon="speaker" />
            <IconButton icon="help" />
          </div>
          <Time />
        </Settings>
      </BarInnerDiv>
    </Bar>
  );
}

export default Taskbar;
