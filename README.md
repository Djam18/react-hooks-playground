# React Hooks Playground

Learning journal: from Python/Django developer discovering React Hooks (Jan 2020) to React 19 master (Jan 2026).

React 16.13 → 19.1 | CRA → Vite 6 | JavaScript → TypeScript strict | v3.0.0

---

## Why this repo?

Coming from Python/Django, React felt weird at first. No classes needed?
Functions that "remember" state? This repo is my learning journal — each
folder is a concept I worked through, with the mistakes left in the git
history so future-me can see the journey.

---

## Hook Comparison Table

| Hook | Python analogy | When to use | Common mistake |
|------|---------------|-------------|----------------|
| `useState` | Instance variable | Simple local state | Mutating state directly |
| `useEffect` | `__init__` + `__del__` | Side effects, subscriptions | Forgetting cleanup (memory leak!) |
| `useContext` | Django `request` object | Shared state across tree | Provider hell (too many providers) |
| `useReducer` | Django model with methods | Complex state with actions | Using it for simple state |
| `useMemo` | `@cached_property` | **Actually expensive** computations | Using it for trivial calculations |
| `useCallback` | Bound method | Stable function refs for React.memo | Using it everywhere (premature) |
| `useRef` | Instance variable that doesn't trigger render | DOM refs, timers, previous values | Treating it like useState |

---

## What I learned the hard way

### useEffect cleanup is NOT optional

```js
// WRONG - memory leak! (my first Timer.js)
useEffect(() => {
  const interval = setInterval(tick, 1000);
  // forgot return!
}, []);

// RIGHT - like Python context managers
useEffect(() => {
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval); // cleanup
}, []);
```

### useMemo is for expensive computations ONLY

```js
// WRONG - useMemo on a trivial expression (I did this in MemoDemo.js)
const double = useMemo(() => count * 2, [count]);

// RIGHT - useMemo on actually expensive work
const filtered = useMemo(
  () => bigArray.filter(complexPredicate),
  [bigArray, complexPredicate]
);
```

### Custom hooks are like Python decorators

When I realized `useFetch` was just a function that called other hooks, it
clicked. Same idea as Python decorators — reusable behavior extracted into
a composable unit.

---

## Structure

```
src/
  01-useState/          Counter, Toggle, FormInput, ColorPicker
  02-useEffect/         DataFetcher, Timer, WindowResize, DocumentTitle
  03-useContext/        ThemeContext, AuthContext, LocaleContext
  04-useReducer/        TodoApp, ShoppingCart, FormWizard
  05-perf-hooks/        ExpensiveList, SearchFilter, MemoDemo
  06-custom-hooks/      useLocalStorage, useFetch, useDebounce, useMediaQuery...
  07-useRef/            FocusInput, PreviousValue, StopwatchRef, VideoPlayer
  08-roadmap-projects/  FlashCards, QuizApp, WeatherApp, GithubExplorer, PomodoroTimer
```

---

## roadmap.sh Projects

Five projects from [roadmap.sh](https://roadmap.sh) reimplemented in React:

| Project | Hooks used | Notes |
|---------|-----------|-------|
| FlashCards | useState | Simple flip mechanic, score tracking |
| QuizApp | useReducer | ANSWER / NEXT_QUESTION / TIMEOUT / RESTART |
| WeatherApp | useCallback, custom useFetch | 4th version of this same idea (Python CLI → Flask → Django → React) |
| GithubExplorer | useState, async handlers | My Python CLI → React. Full circle. |
| PomodoroTimer | useReducer, useRef, useEffect | TICK / PAUSE / COMPLETE / SWITCH_MODE |

---

## Stack

- React 16.13.1
- Create React App 3.4.1
- Plain JavaScript (TypeScript is on the roadmap)
- No external state management (just hooks)
- CSS inline everywhere (I know, I know)

---

## Running

```bash
npm install
npm start
```

---

## Chapter Map

| Folder | Added | Concept | React Era |
|--------|-------|---------|-----------|
| 01-useState | Jan 2020 | Counter, Toggle, Form, ColorPicker | 16.13 |
| 02-useEffect | Jan 2020 | DataFetcher, Timer (with cleanup) | 16.13 |
| 03-useContext | Feb 2020 | ThemeContext, LanguageContext | 16.13 |
| 04-useReducer | Feb 2020 | Todo, ShoppingCart | 16.13 |
| 05-perf-hooks | Feb 2020 | useMemo, useCallback, React.memo | 16.13 |
| 06-custom-hooks | Mar 2020 | useLocalStorage, useFetch, useDebounce | 16.13 |
| 07-useRef | Mar 2020 | DOM access, stopwatch, previousValue | 16.13 |
| 08-roadmap-projects | Mar 2020 | FlashCards, QuizApp, Weather, GithubExplorer, Pomodoro | 16.13 |
| 09-react18 | Apr 2022 | useTransition, useDeferredValue, auto batching | 18.0 |
| 10-react19 | Feb 2025 | use(), useFormStatus, useActionState, useOptimistic | 19.0 |
| 11-compiler | Oct 2025 | React Compiler auto-memo demo | 19.x |

## Running

```bash
npm install
npm run dev     # Vite dev server
npm test        # Vitest
npm run build   # TypeScript check + Vite build
```
