# React Hooks Playground

Notes from a Python/Django developer learning React Hooks — Jan–Mar 2020.

React 16.13 | Create React App | JavaScript (no TypeScript yet)

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

## What's next

- TypeScript migration
- Replace CSS inline with CSS modules or styled-components
- Add tests (React Testing Library)
- react-design-patterns repo (patterns like HOC, Render Props, Compound Components)
