# Countdown App

A modern, responsive countdown application built with Angular that allows users to create and track upcoming events. The app features dynamic text sizing that adjusts to fill the screen width while maintaining readability in both portrait and landscape modes.

## Features

- Event countdown with days, hours, minutes, and seconds
- Responsive design that works in both portrait and landscape modes
- Dynamic text sizing that fills the screen width
- Persistent storage of event details between page reloads
- Clean, modern UI following Figma design specifications

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
- **CountdownService**: Manages countdown logic and state
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

The application is deployed at: [your-deployment-url]

## Future Improvements

This being my first Angular project and in regards to the time limit (had a busy week at work with a lot of overtime), I am happy with how the app turned out. But a few improvements I would prioritise before considering this app production-ready:

### 1. Code Structure and Best Practices

Given more time, I would dive deeper into Angular's recommended architecture patterns, such as modular design and routing. I began setting up routing just to explore it, but it's not fully implemented. For long-term maintainability and scalability, this would be important.

### 2. Data Persistence

Right now, the event name and end date are not saved between page reloads—they're reset on refresh. A next step would be to store this information in the browser's localStorage, but since my number one option would be to set up a more permanent backend database, I decided to leave this for this assignment. This would make the app useful and reliable, especially if accessed across sessions or devices.

### 3. Testing (Especially End-to-End)

To make sure everything works as expected, I'd add automated end-to-end tests using tools like Playwright. These tests would verify that core functionality, like setting up tests for the countdown to work correctly even after reloading the page, as an example.

### 4. FitText Optimization

The text resizing works well, but it could be smoother. Right now, the font size adjusts to fill the screen width, but it can feel a bit "jumpy" when resizing the window. This could be improved by waiting a short moment before recalculating the size (debouncing), and using smoother rendering with requestAnimationFrame – found this when looking into other solutions in Angular and believe this could provide a smoother user experience.

### Additional Considerations

These are just my top things I would prioritize for this assignment, but there are so many other things I could do, for example:

- Accessibility
- UI polish
- Setting up a CI/CD pipeline
- Error handling

The list is long, but as I was a bit short on time this week, I felt this would be a good start.
