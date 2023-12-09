# All-In-One-Travel-App Documentation
 
## Introduction

### 1.1 App Name
- **All-In-One Travel App**

### 1.2 Purpose/Description
- Organize and centralize trip information for multi-destination trips and group trips.

## Features
- **Collections:**
    - users
    - trips
    - passenger information
    - articles
- **Guest Access:**
  - Home, About, and Blog pages.
  - Read-only access to blog articles.

- **User Registration:**
  - Register with email, username, and password.

- **Logged-In Users:**
  - Access to My Trips and Shared Trips pages, as well details for each trip.

- **My Trips:**
  - Quickly create trips with title, destination, start date, and optional end date.
  - Add multiple destinations.
  - Validation for trip creation.
  - View trips as cards in My Trips with title, destination, and start date.
  - Details page for each trip.
    - Edit/Update trip information.
    - Share the trip with another registered user with whom you're travelling.
    - Delete the trip.

- **Shared Trips:**
  - View trips which other users shared with you.
  - Add your passenger information to the trip.
  - Edit and delete passenger information.

- **Blog:**
  - View articles posted by registered users.
  - Registered authors can edit and delete their articles.

## Dependencies & Libraries

- **Dependencies:**
  - `@react-google-maps/api`, `bootstrap`, `react`, `react-bootstrap`, `react-dom`, `react-router-dom`.

- **Dev Dependencies:**
  - `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `vite`.

## Folder Structure

- **Client:**
  - `public`: Images and styles.
  - `src`:
    - `components`, `contexts`, `hooks`, `services`, `utils`.
    - `App` and `Main` components.
- **Server** - SoftUni practice server.

## Styling

- Main stylesheet included in `index.html`.
- CSS modules for each component.

## State Management

- Utilizes React's built-in state management with `useState` hooks.

## Routing

- Implemented using `react-router-dom` with protected routes.

## API Integration

- Integrated Google Maps API and used it to show the exact location of places of accommodation.

## Testing

- Future plan to write tests using Jest.

## Deployment

- Future plan to deploy using Firebase.
