# LiveTrack

## Prerequisites

- **React**: Ensure you have a React application setup.
- **Tailwind CSS**: Install and configure Tailwind CSS in your project.

## Getting Started

### Create a React App using Vite

Follow these steps to set up your React application:

1. Create a new React app with Vite:

   ```bash
   npm create vite@latest my-app --template react
   cd my-app
   ```

2. Install Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

   Configure Tailwind in your project by updating the `tailwind.config.js` and adding the Tailwind directives to your CSS file.

3. Install LiveTrack React:
   ```bash
   npm install livetrack
   ```

## Usage

### Wrap Your App with `LiveTrackProvider`

To integrate LiveTrack into your React app, wrap your application with the `LiveTrackProvider` and include the `LiveUsersWidget` component:

```jsx
import { LiveTrackProvider } from "livetrack";
import LiveUsersWidget from "./components"

function App() {
  return (
    <LiveTrackProvider apiKey="your-api-key">
      <LiveUsersWidget message="Viewing this page"/>
    </LiveTrackProvider>
  );
}

export default App;
```

Replace `"your-api-key"` with the API key you will generate in the dashboard.

### Create a Custom Widget Using the Hook

You can use the `useLiveUsers` hook to create a custom widget. Here's an example:

Install Lucide React:
```bash
npm install lucide-react
```

```jsx
import useLiveUsers from "livetrack";
import { BadgeCheck, LoaderCircle } from "lucide-react";

export const LiveUsersWidget = ({ message }) => {
  const { liveUsers, error, isLoading } = useLiveUsers();

  return (
    <div className="fixed bottom-4 left-4 inline-flex items-center p-4 px-5 bg-white text-sm font-medium font-poppins border rounded-full shadow-lg h-20 max-w-xs space-x-2 z-[9999]">
      <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center">
        <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-pulse">
          {isLoading ? <LoaderCircle /> : error ? "??" : liveUsers}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center">
        {!isLoading && !error && (
          <>
            <div className="text-lg font-semibold text-black">
              {`${liveUsers} people`}
            </div>
            <div className="text-gray-500 text-xs">{message}</div>
            <div className="flex items-center justify-center gap-1 text-blue-500 text-xs">
              <span>
                Verified by <b className="font-mono">Live</b>
              </span>
              <BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
            </div>
          </>
        )}

        {!isLoading && error && (
          <div className="font-semibold text-red-500 text-xs">{error}</div>
        )}
      </div>
    </div>
  );
};
```

## API Key

You can generate your API key from the [Live Track Dashboard](url)LiveTrack dashboard. Visit the provided link to create an account and generate your key. Replace `"your-api-key"` in the examples above with the key from your dashboard.

## After successful setup

Now, when users visit your website, they will be able to see live user activity displayed via the `LiveUsersWidget` component.

![Live Track Widget](https://imgur.com/Nceyps1.png)

## Tech Stack

- **Node.js**
- **Express**
- **React**
- **Redis**
- **MongoDB**
- **Socket.io**
- **ShadCN UI**
- **Tailwind CSS**

## Features

1. **Real-time User Tracking**: Instantly see live user activity.
2. **Responsive Design**: Optimized for all screen sizes.
3. **Simple Integration**: Add live user tracking with minimal setup.
4. **API Key Management**: Dashboard for managing API keys and usage.
5. **Analytics Integration**: Integrates with analytics tools.
6. **Scalable Architecture**: Uses WebSockets and Redis for performance.
7. **Lightweight Package**: Minimal impact on app performance.
8. **Plug-and-Play**: Easy to set up and use.
9. **Tailwind Support**: Compatible with Tailwind CSS for styling.

## GitHub

Visit the [LiveTrack Github Repository](https://github.com/Kunal-jaiswal972/LiveTrack/) for more details, bug reports, and contributions.
