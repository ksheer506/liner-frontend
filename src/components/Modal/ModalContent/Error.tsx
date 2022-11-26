import { LinerButton } from "components/Buttons";
import styled from "styled-components";
import { ReactComponent as IcClose } from "../../../assets/images/ic_close.svg";
import useModal from "../hooks/useModal";

export const Error = () => {
  const { closeModal } = useModal();

  return (
    <Box>
      <Header>
        <Title>Something went wrong</Title>
        <button onClick={closeModal}>
          <Close />
        </button>
      </Header>

      <ContenBox>
        <LinerButton text="OK" onClick={closeModal} />
      </ContenBox>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

const Header = styled.header``;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const Close = styled(IcClose)`
  position: absolute;
  width: 24px;
  height: 24px;
  padding: 5px;
  top: 24px;
  right: 24px;
`;

const ContenBox = styled.section`
  display: flex;
  justify-content: end;

  width: 100%;
`;
