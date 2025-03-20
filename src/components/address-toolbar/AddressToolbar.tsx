import styled from "styled-components";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 48px auto;
  grid-template-rows: 1fr;
  height: 24px;
  align-items: center;
  width: calc(100%);
  padding-right: 3px;
`;

const LocationWrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors-inverted);
  height: 22px;
  width: 100%;
  background-color: #fff;
`;

const Location = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors-inverted);
  width: calc(100% - 2px);
  height: 20px;
  display: grid;
  grid-template-columns: auto 20px;
  align-items: center;
`;

const Label = styled.span`
  font-size: 12px;
  margin-left: 2px;
`;

const Address = styled.div`
  font-size: 11px;
  color: #000;
  padding-left: 4px;
`;

const DropdownButton = styled.div`
  width: 18px;
  height: 18px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--outer-border-colors);
  background-color: var(--base-color);
`;

const DropdownButtonInner = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: var(--inner-border-colors);
  height: calc(100% - 2px);
  width: calc(100% - 2px);
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(70%)
    drop-shadow(1px 1px #fff);
  image-rendering: pixelated;
`;

interface AddressToolbarProps {
  readonly address?: string;
}

function AddressToolbar({ address = "" }: AddressToolbarProps) {
  return (
    <Bar>
      <Label>Address</Label>
      <LocationWrapper>
        <Location>
          <Address>{address}</Address>
          <DropdownButton>
            <DropdownButtonInner>
              <ArrowIcon src="/src/assets/svg/arrow-down.svg" alt="" />
            </DropdownButtonInner>
          </DropdownButton>
        </Location>
      </LocationWrapper>
    </Bar>
  );
}

export default AddressToolbar;
