import { BrowserRouter, Routes, Route } from "react-router-dom";
import OldApt1Push from "./components/OldApt1Push";
import CreateDataAptNew from "./components/CreateDataAptNew";
import CreateDataAptOld from "./components/CreateDataAptOld";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OldApt1Push />} />
        <Route path="/createDataAptNew" element={<CreateDataAptNew />} />
        <Route path="/createDataAptOld" element={<CreateDataAptOld />} />
      </Routes>
      {/* <MasterFrameList /> */}
    </BrowserRouter>
  );
}

export default App;
