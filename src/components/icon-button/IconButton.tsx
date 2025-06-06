import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button<{ $size: "small" | "medium" }>`
  width: ${({ $size }) => ($size === "small" ? "18px" : "34px")};
  height: ${({ $size }) => ($size === "small" ? "18px" : "34px")};
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: center;
  cursor: pointer;
`;

interface IconButtonProps {
  readonly icon?: string;
  readonly size?: "small" | "medium";
  readonly onClick?: MouseEventHandler;
}

function IconButton({
  icon = "empty",
  size = "small",
  onClick = () => {},
}: IconButtonProps) {
  const [iconSrc, setIconSrc] = useState(undefined);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await import(
          `../../assets/icons/${
            size === "small" ? "16x16" : "32x32"
          }/${icon}.png`
        );
        setIconSrc(res.default);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [icon, size]);
  return (
    <Button $size={size} onClick={onClick}>
      <img
        src={iconSrc}
        alt=""
        width={size === "small" ? "16px" : "32px"}
        height={size === "small" ? "16px" : "32px"}
      />
    </Button>
  );
}

export default IconButton;
