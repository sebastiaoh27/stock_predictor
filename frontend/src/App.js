import ResponsiveAppBar from './components/ResponsiveAppBar'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PredictionsPage from "./components/PredictionsPage";
import CurrencyExchangePage from "./components/CurrencyExchangePage";
import "./css/App.css"


function App() {
  return (
      <div className="App">
          <Router>
              <ResponsiveAppBar/>
              <Routes>
                  <Route path="/currency_exchange_page" element={<CurrencyExchangePage/>}/>
                  <Route path="/" element={<PredictionsPage/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
