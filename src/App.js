import './App.css';
import ContainerVisualizations from './components/containerVisualizations/ContainerVisualizations';
import Config from "./components/Setting/Config.js"
import Header from './components/header/Header';
function App() {
  return (
    <>
      <div className="containerApp disable-select" draggable="false">
        <Header/>
        <Config/>
        <ContainerVisualizations/>
      </div>
      <div className="cap"></div>
    </>
  );
}

export default App;
