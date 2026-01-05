# Expense Tracker

A modern, minimalist Expense Tracker application built with React and Vite, featuring a premium Amoled Black & White aesthetic. This application uses Google Sheets as a backend database, allowing for free and flexible data management.

## Features

- **Transaction Management**: Add, view, delete, and clear transactions.
- **Data Visualization**: Visual charts powered by `recharts` to analyze expenses.
- **Multi-Currency Support**: Dynamic currency selection for global usage.
- **Dark/Light Mode**: sleek "Amoled" dark mode and clean light mode.
- **Google Sheets Backend**: Seamless integration with Google Sheets via Apps Script for data persistence.
- **Responsive Design**: Mobile-friendly interface optimized for all devices.

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Custom CSS with CSS Variables (Theming)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Routing**: React Router DOM
- **Backend**: Google Apps Script + Google Sheets

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Account (for the backend)

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/rapoii/Expense-Tracker.git
    cd Expense-Tracker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env # If .env.example exists, otherwise create new
    ```
    Add your Google Apps Script Web App URL:
    ```env
    VITE_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
    ```

## Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

Build for production:
```bash
npm run build
```
Preview the build:
```bash
npm run preview
```

## License

MIT
