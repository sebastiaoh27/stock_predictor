import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PredictionsPage from "./components/PredictionsPage";
import CurrencyExchangePage from "./components/CurrencyExchangePage";
import "./css/App.css"
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from "./components/NavBar";


function App() {
  return (
      <ChakraProvider>
          <div className="App">
              <NavBar/>
              <Router>
                  <Routes>
                      <Route path="/currency_exchange_page" element={<CurrencyExchangePage/>}/>
                      <Route path="/" element={<PredictionsPage/>}/>
                  </Routes>
              </Router>
          </div>
      </ChakraProvider>
  );
}

export default App;
