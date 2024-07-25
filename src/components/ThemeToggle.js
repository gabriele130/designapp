import React from 'react';
import styled from 'styled-components';

const ThemeToggleContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  background: #333;
  border-radius: 5px;
  padding: 5px 10px;
  z-index: 1001;
`;

const ThemeButton = styled.button`
  background: ${props => (props.active ? '#575757' : '#111')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #575757;
  }
`;

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <ThemeToggleContainer>
      <ThemeButton active={theme === 'dark'} onClick={() => setTheme('dark')}>
        Dark
      </ThemeButton>
      <ThemeButton active={theme === 'light'} onClick={() => setTheme('light')}>
        Light
      </ThemeButton>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;
