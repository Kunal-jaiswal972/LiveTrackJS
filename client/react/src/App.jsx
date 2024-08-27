import LiveUsersWidget from "./components/LiveUsersWidget";
import { LiveTrackProvider } from "./context/LiveTrackContext";

function App() {
  return (
    <LiveTrackProvider apiKey={import.meta.env.VITE_API_KEY}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-poppins">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Online Users Tracker
        </h1>
        <div className="flex flex-col items-center gap-2 font-medium text-xs text-gray-500">
          <LiveUsersWidget/>
        </div>
      </div>
    </LiveTrackProvider>
  );
}

export default App;
