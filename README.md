# LiveTrack React

This package allows you to track live users on your website and display them using a widget.

## Installation

```bash
npm install livetrack-react
```

## Getting Started

1. Go to [Live Track JS](https://live-track-js.vercel.app/) to create an account and get your API key.

## Usage

To integrate the live tracking widget into your React app:

1. **Wrap your app with the `LiveTrackProvider` and include the css file and `LiveUsersWidget` component:**

```jsx
import LiveUsersWidget from "./components/LiveUsersWidget";
import { LiveTrackProvider } from "./context/LiveTrackContext";
import "livetrack-react/style.css";


function App() {
  return (
    <LiveTrackProvider apiKey="your-api-key">
      <LiveUsersWidget />
    </LiveTrackProvider>
  );
}

export default App;
```

Replace `"your-api-key"` with the API key you generated.

2. Now, when users visit your website, you will be able to see live user activity displayed via the `LiveUsersWidget` component.

## Features

- **Real-time User Tracking**: Instantly see how many users are active on your site.
- **Simple Integration**: Add the widget with just a few lines of code.
- **Customizable**: Modify the look and feel with CSS to match your site’s design.

## Github

-  Go to [Live Track JS](https://github.com/Kunal-jaiswal972/LiveTrackJS/) to know more.
