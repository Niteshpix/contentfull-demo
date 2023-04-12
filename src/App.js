import "./App.css";
import PostDetails from "./Componets/postDetails";
import Posts from "./Componets/posts";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
