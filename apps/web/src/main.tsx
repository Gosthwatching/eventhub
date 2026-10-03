import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f3f5f0',
        color: '#182521',
        fontFamily: 'Arial, sans-serif',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
