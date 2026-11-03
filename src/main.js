import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import './styles/globals.css';
import App from './App';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(MotionConfig, { reducedMotion: "user", children: _jsx(App, {}) }) }));
