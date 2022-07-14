import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import "./css/App.css"
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from "./components/NavBar";
import PredictionsPage from "./pages/PredictionsPage";


function App() {
  return (
      <ChakraProvider>
          <div className="App">
              <NavBar/>
              <Router>
                  <Routes>
                      <Route path="/currency_exchange_page" element={<CurrencyExchangePage/>}/>
                      <Route path="/predictions_page" element={<PredictionsPage/>}/>
                      <Route path="/" element={<HomePage/>}/>
                  </Routes>
              </Router>
          </div>
      </ChakraProvider>
  );
}

export default App;
