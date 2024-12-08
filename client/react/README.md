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
import { LiveTrackProvider, LiveUsersWidget } from "livetrack-react";
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

Replace `"your-api-key"` with the API key provided in dashboard.

2. Now, when users visit your website, they will be able to see live user activity displayed via the `LiveUsersWidget` component.
   ![Live Track Widget](https://imgur.com/Nceyps1.png)

3. You can also use the "useLiveUsers" hook to make a customizable widget of your choice.

```jsx
import { useLiveUsers } from "livetrack-react";

export const widget =()=> {
  return (
    const {liveUsers, isLoading, error} = useLiveUsers();

    //your custom widget goes here...
  );
}
```

4. You can track the activities on your sites through the [dashboard](https://live-track-js.vercel.app/)

## Features

- **Real-time User Tracking**: Instantly see how many users are active on your site.
- **Simple Integration**: Add the widget with just a few lines of code.
- **Customizable**: Modify thw widget to your design.

## Github

- Go to [Live Track JS](https://github.com/Kunal-jaiswal972/LiveTrackJS/) to know more.
