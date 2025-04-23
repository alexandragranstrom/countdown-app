# Countdown App

A responsive countdown application built with Angular that allows users to create and track upcoming events. The app features dynamic text sizing that adjusts to fill the screen width while maintaining readability in both portrait and landscape modes.

## Features

- Event countdown with days, hours, minutes, and seconds
- Responsive design that works in both portrait and landscape modes
- Dynamic text sizing that fills the screen width

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19.2.8)

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd countdown-app
```

2. Install dependencies:

```bash
npm install
```

## Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building for Production

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

Execute unit tests:

```bash
npm test
```

## Key Components

- **FitTextDirective**: Handles dynamic text sizing
- **CountdownService**: Manages countdown logic and state, as well as handling the storage key (saving and loading saved data)
- **AppComponent**: Main application component

## Code Formatting

The project uses Prettier for code formatting with the following configuration:

```javascript
// prettier.config.js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
}
```

To format code:

```bash
npm run format
```

## Browser Support

The application supports all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The application is deployed at: https://nccountdownapp.netlify.app

## Future Improvements

This being my first Angular project and in regards to the time limit (had a busy week at work with a lot of overtime), I am happy with how the app turned out. But a few improvements I would prioritize before considering this app production-ready:

### 1. Code Structure and Best Practices

Given more time, I would dive deeper into Angular's recommended architecture patterns, such as modular design and routing. I began setting up routing just to explore it, but it's not fully implemented. For long-term maintainability and scalability, this would be important.

### 2. Data Persistence

The event name and end date are now saved in the browser's localStorage using a unique storage key, allowing the countdown to persist between page reloads. This implementation uses the `CountdownService` to manage the storage and retrieval of the countdown data. While this provides basic persistence, a future improvement could be to implement a more permanent backend database solution for cross-device synchronization and enhanced data management.

### 3. Testing (Especially End-to-End)

To make sure everything works as expected, I'd add automated end-to-end tests using tools like Playwright. These tests would verify that core functionality, like setting up tests for the countdown to work correctly even after reloading the page, as an example.

### 4. FitText Optimization

The text resizing works well, but it could be smoother. Right now, the font size adjusts to fill the screen width, but it can feel a bit "jumpy" when resizing the window. This could be improved by waiting a short moment before recalculating the size (debouncing), and using smoother rendering with requestAnimationFrame – found this when looking into other solutions in Angular and believe this could provide a smoother user experience.

While these are the key improvements I would prioritize, there are several other areas that could enhance the application:

- Accessibility improvements (ARIA labels, keyboard navigation)
- UI/UX polish and animations
- CI/CD pipeline implementation
- Comprehensive error handling and user feedback

Given more time, I would work on these improvements to make the app more robust and user-friendly.
