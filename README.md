# S3 Destination Builder

A React + TypeScript + Vite application for configuring cloud storage destinations (AWS S3 and Google Cloud Storage).

## Features

- 🎨 Modern UI with Material-UI components
- 📝 Dynamic form generation based on provider configuration
- ✅ Frontend and mocked backend validation
- 🔄 Wizard-style flow
- 📱 Responsive design based on container width
- 🏗️ Scalable architecture - easily add new providers
- 🎯 Type-safe with TypeScript
- 🎨 Modular CSS with proper component organization

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - UI component library
- **React Hook Form** - Form state management
- **Yup** - Schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Yup
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

## Project Structure

```
src/
├── components/
│   ├── ProviderList/          # Provider selection screen
│   ├── ProviderForm/          # Main form component
│   ├── ProviderFormField/     # Individual field renderer
│   └── DestinationPreview/    # JSON output display
├── config/
│   └── providers.ts           # Provider configuration
├── utils/
│   └── path.ts                # Path utility functions
├── App.tsx                    # Main app component
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## Installation & Setup

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Run Tests

```bash
npm test          # Watch mode
npm test -- --run # Run once
npm run test:ui   # Run with UI
```

### Build & Preview

```bash
npm run build
npm run preview
```