import "./App.css";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "./components/RightSidebar/RightSidebar.jsx";
function App() {
  return (
    <div className="app-shell">
      <LeftSidebar userId="a-partovii" />
      <RightSidebar userId="a-partovii" />
    </div>
    
  );
}

export default App;
