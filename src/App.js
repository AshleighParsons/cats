import { ThemeProvider } from '@emotion/react';
import './App.css';
import CatsGrid from './components/CatsGrid';
import { createTheme } from '@mui/material/styles'
import { BreedContext } from "./BreedContext.js";
import { useState } from 'react';

function App() {
  const [breedContext, setBreedContext] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00ACC1",
        light: "#33BCCD",
        dark: "#007887",
      },
    },
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <div className="App">
      <BreedContext.Provider value={[breedContext, setBreedContext]}>
        <ThemeProvider theme={theme}>
          <CatsGrid />
        </ThemeProvider>
      </BreedContext.Provider>
    </div>
  );
}

export default App;
