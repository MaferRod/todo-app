// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import Modal from 'react-modal';



// Set the app element for React Modal
Modal.setAppElement('#root');

// Get the root DOM element where your app is mounted
const container = document.getElementById('root');

// Ensure the element exists before creating the root
if (container) {
  // Create a root using createRoot
  const root = createRoot(container);

  // Render the App component inside the root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found.');
}