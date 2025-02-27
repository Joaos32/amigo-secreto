import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Historico from "./pages/Historico";
import Layout from "./components/Layout"; // Layout padrão do site

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
