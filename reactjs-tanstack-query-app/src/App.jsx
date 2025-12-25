import './App.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-[Montserrat]">
      <Navbar />

      <main className="flex-1">
        <Home />
      </main>

      <Footer />
    </div>
  )
}

export default App
