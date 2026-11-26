import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { UIRoles } from './components/theme';

const uiRolesContainer = document.createElement('div');
document.body.appendChild(uiRolesContainer);
ReactDOM.render(React.createElement(UIRoles), uiRolesContainer);
