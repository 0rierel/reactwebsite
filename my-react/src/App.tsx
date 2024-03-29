import store from "./app/store";
import { Provider } from "react-redux";
import ErrorPage from "./pages/errorPage";
import Home from "./pages/HomePage/HomePage";
import ToDosPage from "./pages/todoPAge/ToDosPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ToDos" element={<ToDosPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
