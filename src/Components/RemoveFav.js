import React from "react";
import styled from "styled-components";
const FavBtn = styled.button`
  margin-top: 5px;
  padding: 5px 20px;
  cursor: pointer;
`;
const RemoveFav = () => {
  return <FavBtn>Remove</FavBtn>;
};

export default RemoveFav;
