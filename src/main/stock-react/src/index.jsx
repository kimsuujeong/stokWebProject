import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Navigation from './layOut/Navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Navigation />
		<App />
	</BrowserRouter>
);

// reportWebVitals <-를 쓰면 react 속도 측정을 할 수 있다.
