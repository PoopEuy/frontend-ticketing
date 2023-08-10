import { BrowserRouter, Routes, Route } from "react-router-dom";
import OldApt1Push from "./components/OldApt1Push";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OldApt1Push />} />
      </Routes>
      {/* <MasterFrameList /> */}
    </BrowserRouter>
  );
}

export default App;
