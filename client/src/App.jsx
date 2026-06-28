import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
