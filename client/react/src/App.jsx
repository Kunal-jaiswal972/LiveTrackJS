import LiveUsersWidget from "./components/LiveUsersWidget";
import { LiveTrackProvider } from "./context/LiveTrackContext";

function App() {
  return (
    <LiveTrackProvider apiKey="b8ef420a63fb20eae2c02fd20345e7a2bbfc1f83">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-poppins">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Online Users Tracker
        </h1>
        <div className="flex flex-col items-center space-y-4 font-medium text-xs text-gray-500">
          <LiveUsersWidget />
          <LiveUsersWidget />
        </div>
      </div>
    </LiveTrackProvider>
  );
}

export default App;
