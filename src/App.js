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
import TodoApp from './04-useReducer/TodoApp';
import ShoppingCart from './04-useReducer/ShoppingCart';
import FormWizard from './04-useReducer/FormWizard';
import ExpensiveList from './05-perf-hooks/ExpensiveList';
import SearchFilter from './05-perf-hooks/SearchFilter';
import MemoDemo from './05-perf-hooks/MemoDemo';
import FocusInput from './07-useRef/FocusInput';
import PreviousValue from './07-useRef/PreviousValue';
import StopwatchRef from './07-useRef/StopwatchRef';
import VideoPlayer from './07-useRef/VideoPlayer';
import FlashCards from './08-roadmap-projects/FlashCards';
import Quiz from './08-roadmap-projects/QuizApp/Quiz';
import Weather from './08-roadmap-projects/WeatherApp/Weather';
import Explorer from './08-roadmap-projects/GithubExplorer/Explorer';
import Pomodoro from './08-roadmap-projects/PomodoroTimer/Pomodoro';

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

            <h2>04 - useReducer</h2>
            <TodoApp />
            <ShoppingCart />
            <FormWizard />

            <h2>05 - perf hooks (useMemo, useCallback)</h2>
            <ExpensiveList />
            <SearchFilter />
            <MemoDemo />

            <h2>07 - useRef</h2>
            <FocusInput />
            <PreviousValue />
            <StopwatchRef />
            <VideoPlayer />

            <h2>08 - roadmap.sh Projects</h2>
            <FlashCards />
            <Quiz />
            <Weather />
            <Explorer />
            <Pomodoro />
          </div>
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
