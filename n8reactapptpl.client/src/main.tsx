import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from "recoil"
import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx'
// CSS
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>,
)
