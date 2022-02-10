import PageLogin from './Pages/acoounts/PageLogin';
import TopNav from './TopNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageClothesDetail from './Pages/clothes/PageClothesDetail';
import PageClothesForm from './Pages/clothes/PageClothesForm';
import PageClothesIndex from './Pages/clothes/PageClothesIndex';

function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/clothes/" />} />
        <Route path="/accounts/login/" element={<PageLogin />} />
        <Route path="/clothes/" element={<PageClothesIndex />} />
        <Route path="/clothes/:clothesId/" element={<PageClothesDetail />} />
        <Route path="/clothes/new/" element={<PageClothesForm />} />
        <Route path="/clothes/:clothesId/edit/" element={<PageClothesForm />} />
      </Routes>
    </div>
  );
}

export default App;
