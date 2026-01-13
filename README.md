# S3 Destination Builder

A React + TypeScript + Vite application for configuring cloud storage destinations (AWS S3 and Google Cloud Storage).

## Features

- 🎨 Modern UI with Material-UI components
- 📝 Dynamic form generation based on provider configuration
- ✅ Frontend and backend validation (mocked)
- 🔄 Wizard-style flow for better UX
- 📱 Fully responsive design (adapts to container width)
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
│   ├── ProviderList/           # Provider selection screen
│   │   ├── ProviderList.tsx
│   │   ├── ProviderList.module.css
│   │   ├── ProviderListTypes.ts
│   │   └── hooks/
│   │       └── useProviderList.ts
│   ├── ProviderForm/           # Main form component
│   │   ├── ProviderForm.tsx
│   │   ├── ProviderForm.module.css
│   │   ├── ProviderFormTypes.ts
│   │   └── hooks/
│   │       └── useProviderForm.ts
│   ├── ProviderFormField/      # Individual field renderer
│   │   ├── ProviderFormField.tsx
│   │   ├── ProviderFormField.module.css
│   │   ├── ProviderFormFieldTypes.ts
│   │   └── hooks/
│   │       └── useProviderFormField.ts
│   └── DestinationPreview/     # JSON output display
│       ├── DestinationPreview.tsx
│       ├── DestinationPreview.module.css
│       ├── DestinationPreviewTypes.ts
│       └── hooks/
│           └── useDestinationPreview.ts
├── config/
│   └── providers.ts            # Provider configuration
├── utils/
│   └── path.ts                 # Path utility functions
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point
└── index.css                   # Global styles
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
npm test          # Run tests in watch mode
npm test -- --run # Run tests once
npm run test:ui   # Run tests with UI
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

### Wizard Flow

1. **Choose Provider**: Select between AWS S3 or Google Cloud Storage
2. **Configure**: Fill in the required fields
   - Bucket Name
   - Region (AWS only)
   - Path (optional)
   - Access Key ID
   - Secret Access Key
3. **Submit**: Click "Save" to validate and generate the destination configuration
4. **View JSON**: The generated JSON configuration will appear below the form

### Validation

The application includes two types of validation:

#### Frontend Validation
- Bucket name cannot contain the letter "a"
- Other standard validations (required fields, min/max length, format)
- Errors appear immediately when fields are changed

#### Backend Validation (Mocked)
- Bucket name cannot contain the letter "b" or "error"
- Simulates server-side validation with 500ms delay
- Errors appear after form submission

### Provider Switching

You can switch between AWS S3 and Google Cloud Storage using the provider dropdown. When you switch providers:
- Provider-specific fields are reset
- Common fields retain their values
- Previous validation errors are cleared

## Adding a New Provider

The architecture is designed to make adding new providers easy. Follow these steps:

1. **Define Provider Configuration** in `src/config/providers.ts`:

```typescript
export const providers: Record<string, ProviderConfig> = {
  // ... existing providers
  azure: {
    id: 'azure',
    name: 'Azure Blob Storage',
    icon: '☁️',
    fields: [
      {
        name: 'accountName',
        label: 'Account Name',
        type: 'text',
        required: true,
        yupSchema: yup.string().required('Account name is required'),
        grid: { desktop: 6 },
      },
      // ... more fields
    ],
    buildDestination: (values) => ({
      url: `https://${values.accountName}.blob.core.windows.net/${values.container}`,
      key: values.accessKey,
      secret: values.secretKey,
    }),
  },
};
```

2. **That's it!** The new provider will automatically appear in the provider list, and all form generation, validation, and JSON building will work automatically.

## Responsive Design

- **Desktop** (> 600px): Fields are displayed in 2 columns (configurable per field)
- **Mobile** (≤ 600px): All fields are displayed in 1 column
- Responsive breakpoint at 600px (MUI's `sm` breakpoint)

## Key Features

### Dynamic Form Generation
Forms are generated dynamically based on provider configuration, eliminating code duplication.

### Type Safety
Full TypeScript support with proper types for all components, hooks, and configurations.

### Validation
- Frontend validation using Yup schemas
- Mocked backend validation to simulate server-side checks
- Clear error messages under each field

### Modern UI
- Material-UI components for consistent design
- Smooth transitions and hover effects
- Copy-to-clipboard functionality for JSON output
- Password visibility toggle

### Comprehensive Testing
- 71 unit tests covering all components, hooks, and utilities
- Vitest + React Testing Library
- 100% test coverage for critical paths
- Automated testing in CI/CD pipelines

## License

MIT

## Author

Qencode Destination Builder

---

**Note**: This is a front-end demo application. Backend validation is mocked and does not send data to any server. The generated JSON is stored only in the browser's local state.
