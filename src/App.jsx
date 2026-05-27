import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import "./styles/light.css";
import "./styles/components.css";

function App() {
  

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
