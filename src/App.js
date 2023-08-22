import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./components/home";
import ListPage from "./components/ListPage";
// import TableTest from "./components/child/TableTest";
import ResponPage from "./components/ResponsePage";

// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<ListPage />} />
        <Route path="/ListPage" element={<ListPage />} />
        <Route path="/ResponPage" element={<ResponPage />} />
      </Routes>
      {/* <MasterFrameList /> */}
    </BrowserRouter>
  );
}

export default App;
