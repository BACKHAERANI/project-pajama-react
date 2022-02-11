import PageLogin from './Pages/acoounts/PageLogin';
import TopNav from './TopNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageClothesDetail from './Pages/clothes/PageClothesDetail';
import PageClothesForm from './Pages/clothes/PageClothesForm';
import PageClothesIndex from './Pages/clothes/PageClothesIndex';

import PageMain from './Pages/main/PageMain';
import './App.css';
import PageSignup from './Pages/acoounts/PageSignup';
import PageNoticeList from './Pages/notice/PageNoticeList';
import PageProfileCheck from './Pages/mypage/PageProfileCheck';
import PageProfileDetail from './Pages/mypage/PageProfileDetail';
import PageProfileForm from './Pages/mypage/PageProfileForm';
import PageNoticeDetail from './Pages/notice/PageNoticeDetail';
import PageNoticeForm from './Pages/notice/PageNoticeForm';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/accounts/login/" element={<PageLogin />} />
        <Route path="/accounts/signup/" element={<PageSignup />} />
        <Route path="/clothes/" element={<PageClothesIndex />} />
        <Route path="/clothes/:clothesId/" element={<PageClothesDetail />} />
        <Route path="/clothes/new/" element={<PageClothesForm />} />
        <Route path="/clothes/:clothesId/edit/" element={<PageClothesForm />} />
        <Route path="/notice/" element={<PageNoticeList />} />
        <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />
        <Route path="/notice/new/" element={<PageNoticeForm />} />
        <Route path="/notice/:notice_num/edit" element={<PageNoticeForm />} />
        <Route path="/mypage/profile/check/" element={<PageProfileCheck />} />
        <Route path="/mypage/profile/detail/" element={<PageProfileDetail />} />
        <Route path="/mypage/profile/edit/" element={<PageProfileForm />} />
      </Routes>

      <hr className="mt-5" />
      <h6 className="text-xs mt-4 mb-7 text-gray-500">@PaJaMa compamy.</h6>
    </div>
  );
}

export default App;
