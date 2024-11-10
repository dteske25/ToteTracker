import { Route, Routes, BrowserRouter } from "react-router-dom";
import ToteList from "./components/ToteList";
import ToteForm from "./components/ToteForm";
import ToteDetails from "./components/ToteDetails";
import { useTotes } from "./hooks/useTotes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

function AppContent() {
  const { totes } = useTotes();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ToteList totes={totes} />} />
          <Route path="/add" element={<ToteForm />} />
          <Route path="/tote/:id" element={<ToteDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
