# Technical Documentation

## Project Architecture

This Expense Tracker is a Single Page Application (SPA) built with React and Vite. It decouples the frontend from the backend by using a Google Apps Script (GAS) Web App as an API layer, which reads from and writes to a Google Sheet.

### Flow
`Frontend (React)` <-> `Google Apps Script (API)` <-> `Google Sheets (Database)`

## Folder Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (Navbar, Cards, etc.)
├── config/          # Configuration files (API URLs, feature flags)
├── context/         # React Context (ThemeContext, etc.)
├── data/            # Static data or constants
├── pages/           # Page components (Home, Dashboard, Settings, etc.)
├── services/        # API service layer (api.js)
├── utils/           # Helper functions (formatters, etc.)
├── App.jsx          # Main App component with Routing
└── index.css        # Global styles and Theming system
```

## Backend Integration

The backend is a Google Apps Script deployed as a Web App.

### API Service (`src/services/api.js`)
Handles all HTTP requests to the Google Apps Script endpoint.
- **GET**: Fetches all transactions.
- **POST**: Adds a new transaction.
- **DELETE (via Query Params)**: Deletes a specific transaction.
- **CLEAR (via Query Params)**: Clears all data.

### Configuration
The API URL is stored in `src/config/config.js` and loaded from the environment variable `VITE_API_URL`.

```javascript
export const CONFIG = {
    API_URL: import.meta.env.VITE_API_URL || '',
    USE_BACKEND: true,
};
```

## Styling System

The application uses a custom CSS variable-based styling system (`src/index.css`) to support high-contrast Dark (Amoled) and Light modes.

- **Variables**: Defined in `:root` and `[data-theme="..."]` blocks.
- **Themes**: Switched by toggling the `data-theme` attribute on the `document.documentElement`.

## Key Dependencies

- **lucide-react**: For lightweight, consistent icons.
- **recharts**: For rendering the expense breakdown charts.
- **date-fns**: For manipulating and formatting dates.
- **react-router-dom**: For client-side routing.
