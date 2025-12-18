import "./App.css";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "./components/RightSidebar/RightSidebar.jsx";
import Feed from "./components/Feed/Feed.jsx";

function App() {
  return (
    <div className="app-shell">
      <LeftSidebar userId="a-partovii" />
      <Feed userId="a-partovii" />
      <RightSidebar userId="a-partovii" />
    </div>
  );
}

export default App;
