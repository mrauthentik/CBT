import styled from '@emotion/styled';
import { IoArrowForward } from 'react-icons/io5';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  background-color: black;
`;

const ArrowIcon = styled(IoArrowForward)`
  margin-left: 5px;
  font-size: 1.2em;
`;

export const Header = () => {
  return (
    <StyledDiv>
      GET STARTED WITH US <ArrowIcon />
    </StyledDiv>
    
  );
};