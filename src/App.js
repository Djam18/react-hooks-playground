import React from 'react';
import './App.css';
import { ThemeProvider } from './03-useContext/ThemeContext';
import { AuthProvider } from './03-useContext/AuthContext';
import { LocaleProvider } from './03-useContext/LocaleContext';
import Counter from './01-useState/Counter';
import Toggle from './01-useState/Toggle';
import FormInput from './01-useState/FormInput';
import ColorPicker from './01-useState/ColorPicker';
import DataFetcher from './02-useEffect/DataFetcher';
import Timer from './02-useEffect/Timer';
import WindowResize from './02-useEffect/WindowResize';
import DocumentTitle from './02-useEffect/DocumentTitle';
import ContextDemo from './03-useContext/ContextDemo';

// provider hell - j'empile 3 providers... il doit y avoir mieux
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>React Hooks Playground</h1>
            <p>Learning React Hooks — Notes from a Python/Django Dev</p>

            <h2>01 - useState</h2>
            <Counter />
            <Toggle />
            <FormInput />
            <ColorPicker />

            <h2>02 - useEffect</h2>
            <DataFetcher />
            <Timer />
            <WindowResize />
            <DocumentTitle />

            <h2>03 - useContext</h2>
            <ContextDemo />
          </div>
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
