'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { LayoutGroup, motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

const initialState = {
  isPaused: true,
  selectedColor: COLORS[0],
  secondsElapsed: 0,
};

function CircularColorsDemo() {
  const [{ isPaused, selectedColor, secondsElapsed }, dispatch] =
    React.useReducer(reducer, initialState);
  const id = React.useId();
  React.useEffect(() => {
    if (isPaused) return;

    function handleSetColorEverySecond() {
      dispatch({ type: 'increment-seconds' });
      dispatch({ type: 'change-color' });
    }

    const intervalId = window.setInterval(handleSetColorEverySecond, 1000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId={`${id}-outline`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{secondsElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => dispatch({ type: 'toggle-paused' })}>
              {isPaused ? <Play /> : <Pause />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={() => dispatch({ type: 'reset' })}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'change-color':
      return {
        ...state,
        selectedColor: COLORS[state.secondsElapsed % COLORS.length],
      };
    case 'toggle-paused': {
      return { ...state, isPaused: !state.isPaused };
    }
    case 'increment-seconds': {
      return { ...state, secondsElapsed: state.secondsElapsed + 1 };
    }
    case 'reset': {
      return { ...initialState };
    }
  }
}

export default CircularColorsDemo;
