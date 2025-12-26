# InnoTech Finance

A modern, feature-rich mobile finance application built with React Native and Expo. Manage multiple currency wallets, track transactions, and convert funds seamlessly.

## 🚀 Features

- **Multi-Currency Wallets**: Support for CAD and NGN wallets with real-time balance tracking
- **Transaction Management**: View and search through transaction history
- **Currency Conversion**: Convert funds between different currencies with live exchange rates
- **Secure Balance Visibility**: Toggle balance visibility for privacy
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Bottom Sheet Modals**: Interactive modals for wallet details and actions
- **Image Slider**: Optimized card-based image slider for promotions
- **Type-Safe**: Full TypeScript support with strict type checking

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Expo CLI (installed globally or via npx)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo (~54.0.30)
- **Routing**: Expo Router (file-based routing)
- **Language**: TypeScript (~5.9.2)
- **State Management**: React Hooks
- **Navigation**: React Navigation
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Testing**: Jest, React Native Testing Library

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TheWiki2306/Innotech-finance.git
   cd innotech-finance
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Git hooks (Husky):
   ```bash
   npm run prepare
   ```

## 🏃 Running the Project

### Start the development server:

```bash
npm start
```

### Run on specific platforms:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Clear cache and restart:

```bash
npx expo start --clear
```

## 📜 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start on web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 📁 Project Structure

```
innotech-finance/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── send.tsx       # Send money screen
│   │   ├── accounts.tsx   # Accounts screen
│   │   └── profile.tsx    # Profile screen
│   ├── (screens)/         # Stack navigation screens
│   │   └── conversion.tsx # Currency conversion screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components (Card, Button, BottomSheet, etc.)
│   ├── wallet.tsx        # Wallet component
│   └── transactionSection.tsx
├── constants/            # App constants
│   ├── colors.ts         # Color palette
│   └── data.ts           # Mock data
├── hooks/                # Custom React hooks
│   └── use-user-profile.ts
├── lib/                  # Utility libraries
│   └── api.ts            # API simulation
├── types/                # TypeScript type definitions
├── assets/               # Images, icons, fonts
└── scripts/              # Build scripts
```

## 🎨 Key Components

### Wallet Component

- Displays multiple currency wallets (CAD, NGN)
- Independent balance visibility toggle for each wallet
- Bottom sheet modal with transaction history and search

### Conversion Screen

- Real-time currency conversion
- Bidirectional conversion (CAD ↔ NGN)
- Live exchange rate display
- Amount formatting with thousand separators

### Bottom Sheet

- Reusable modal component
- Customizable title with icon support
- Footer support for action buttons
- Smooth animations

### Card Slide

- Optimized image slider
- Auto-play functionality
- Pagination indicators
- Full-width or card-based layouts

## 🔧 Configuration

### TypeScript Path Aliases

The project uses path aliases for cleaner imports:

- `@/*` - Root directory
- `@/components/*` - Components
- `@/hooks/*` - Custom hooks
- `@/constants/*` - Constants
- `@/assets/*` - Assets
- `@/app/*` - App pages
- `@/types/*` - Type definitions
- `@/lib/*` - Libraries

### Code Quality

- **ESLint**: Configured with Expo preset and custom rules
- **Prettier**: Code formatting with consistent style
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files only

## 🧪 Testing

Run tests with:

```bash
npm test
```

View coverage:

```bash
npm run test:coverage
```

## 📱 Features in Detail

### Wallet Management

- View balances for multiple currencies
- Hide/show balance independently per wallet
- View detailed transaction history
- Search transactions
- Fund and send money actions

### Currency Conversion

- Convert between CAD and NGN
- Real-time exchange rate calculation
- Fee information display
- Swap conversion direction
- Formatted amount display

### Transaction History

- Filterable transaction list
- Search functionality
- Categorized by transaction type
- Date and amount display
- Visual indicators for income/expense

## 🎯 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Format code with Prettier before committing
- Use path aliases for imports
- Write descriptive component and function names

### Component Structure

- Keep components focused and reusable
- Extract styles to StyleSheet at the bottom
- Use TypeScript interfaces for props
- Document complex logic with comments

### Git Workflow

- Pre-commit hooks automatically run linting and formatting
- Ensure all tests pass before pushing
- Write meaningful commit messages

## 📄 License

This project is private and proprietary.
