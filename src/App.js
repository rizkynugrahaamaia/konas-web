import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Layout/Header'
import { 
  MainPage, 
  AccessDetails,
  ParticipantDetails
} from './Pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/participant-details/:id" element={<ParticipantDetails />}/>
        <Route path="/access-details/:id" element={<AccessDetails />}/>
      </Routes>
    </>
  );
}

export default App;
