import React from "react";
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const ThemeSwitcher = ({ toggleTheme }) => <div><Toggle onChange={toggleTheme} /></div>;

export default ThemeSwitcher;
