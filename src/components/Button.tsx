import React from 'react';
import styled from 'styled-components';

export const Button = styled.div`
  width: 170px;
  height: 170px;

  margin: 0;
  padding: 0;

  background-color: #000000;
  cursor: pointer;
  border-radius: 50%;

  &:hover, &:active {
    background-color: #555555;
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-size: 60px;
    transform: rotate(90deg);
  }
`;
