import { useEffect, useState } from "react";
import styled from "styled-components";

const TimeDiv = styled.div`
  height: 21px;
  display: block;
  align-content: center;
  font-size: 11px;
  padding: 0 4px;
`;

function Time() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60_000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <TimeDiv>
      {time.getHours()}:{time.getMinutes().toString().padStart(2, "0")}
    </TimeDiv>
  );
}

export default Time;
