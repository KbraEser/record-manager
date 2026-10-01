# Record Manager

A single-page React application for adding, listing and updating records.
Built as an interview test case.

## Features

- Form with four fields:
  - **Code**: required, 2 letters followed by 3 digits (e.g. `AB123`)
  - **Name**: required, up to 12 characters
  - **Assign Date**: required, `DD/MM/YYYY`; slashes are added automatically while typing
  - **Is Updatable?**: checkbox
- Hovering over Code and Assign Date shows the expected format as a tooltip.
- **Save** adds the record to the data grid.
- Clicking a row fills the form with that record and the button changes to **Update**.
- Records that are not updatable are shown in grey and cannot be clicked.
- **Clean** empties the form and switches the button back to **Save**.
- Important actions are logged to the browser console. Info logs (save, update, select)
  appear only in development; warnings such as validation errors always appear.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.3 | UI |
| TypeScript | 6.0 | Type safety |
| Redux Toolkit | 2.13 | State management (records and selected row) |
| React Redux | 9.3 | Connects Redux to React |
| React Hook Form | 7.89 | Form state and validation |
| Material UI | 9.4 | UI components and icons |
| MUI X Data Grid | 9.14 | Data grid |
| Vite | 8.3 | Dev server and build tool |
| Vitest + React Testing Library | 5.0 / 16.3 | Unit and component tests |
| ESLint | 10.11 | Static code analysis |

## Getting Started

**Requirements:** Node.js 20.19+ or 22.12+ (developed with Node.js 24 and npm 11)

```bash
git clone https://github.com/KbraEser/record-manager.git
cd record-manager
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs all tests once |
| `npm run test:watch` | Re-runs tests on every file change |
| `npm run lint` | Runs ESLint |

## Project Structure

The code is grouped by feature. Shared building blocks live in `common/`, and
everything that belongs to records lives in `features/records/`.

```
src/
├── common/
│   ├── components/      # Reusable FormInput and ActionButton
│   └── utils/           # Date helpers and logger
├── features/
│   └── records/
│       ├── components/  # RecordForm and RecordGrid
│       ├── store/       # Redux slice and selectors
│       ├── types.ts
│       └── validation.ts
├── store/               # Store setup and typed hooks
├── theme/               # MUI theme
└── test/                # Test setup
```

## Reusable Components

**FormInput**: a text field connected to React Hook Form. Label, tooltip, pattern,
max length, required, disabled, custom validation and input formatting are passed as props.
Used for Code, Name and Assign Date.

**ActionButton**: a button with label, click action, tooltip, icon, color, variant
and disabled state passed as props. Used for Save/Update and Clean.

## Testing

```bash
npm test
```

Tests cover date validation and formatting, the record reducers (including the rule that
locked records cannot be selected) and the form flow from Save to Update.

## Git Workflow

Initial setup was committed to `main`. After that, each feature was developed on its own
branch (`feature/...`, `refactor/...`, `test/...`, `docs/...`) and merged through a pull request.
