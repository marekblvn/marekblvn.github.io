import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  readonly label?: string;
  readonly children?: ReactNode;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly padding: string;
  readonly width: string;
  readonly height: string;
  readonly icon?: string;
  readonly disabled: boolean;
}

const InnerButtonDiv = styled.div<{ padding: string; disabled: boolean }>`
  border-width: 1px;
  border-style: solid;
  border-color: #dbdbdb #808080 #808080 #dbdbdb;
  padding: ${(props) => props.padding || "2px 12px"};
  font-family: "MS Sans Serif", sans-serif;
  font-weight: normal;
  color: #000;
  height: calc(100% - 6px);
  width: calc(100% - 26px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button<{ width: string; height: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  min-width: 24px;
  padding: 0;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  background-color: #bfbfbf;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "16px"};
  &:active:not(:disabled) {
    border-color: #000000 #ffffff #ffffff #000000;
  }
  &:active:not(:disabled) ${InnerButtonDiv} {
    border-color: #808080 #dbdbdb #dbdbdb #808080;
  }
  &:disabled ${InnerButtonDiv} {
    color: #808080;
    text-shadow: 1px 1px #ffffff;
  }
`;

export default function Button({
  label = undefined,
  children = null,
  onClick = () => {},
  padding = "2px 12px",
  width = "auto",
  height = "auto",
  icon = undefined,
  disabled = false,
}: ButtonProps) {
  function renderContent(): ReactNode {
    if (children) {
      return children;
    } else if (label) {
      return (
        <div
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            columnGap: "4px",
            padding: icon ? "auto" : "1px 0",
          }}
        >
          {icon && (
            <img
              src={icon}
              alt=""
              height={height || "auto"}
              width={width || "auto"}
              loading="lazy"
              style={{
                imageRendering: "pixelated",
              }}
            />
          )}
          {label}
        </div>
      );
    } else {
      return <div>&nbsp;</div>;
    }
  }

  return (
    <StyledButton
      width={width}
      height={height}
      onClick={onClick}
      disabled={disabled}
    >
      <InnerButtonDiv padding={padding} disabled={disabled}>
        {renderContent()}
      </InnerButtonDiv>
    </StyledButton>
  );
}
