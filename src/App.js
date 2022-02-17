import PageLogin from 'Pages/accounts/PageLogin';
import TopNav from 'TopNav';
import { useAuth } from 'Base/Context/AuthContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageClothesDetail from 'Pages/clothes/PageClothesDetail';
import PageClothesForm from 'Pages/clothes/PageClothesForm';
import PageClothesIndex from 'Pages/clothes/PageClothesIndex';

import PageMain from 'Pages/main/PageMain';
import 'App.css';
import PageSignup from 'Pages/accounts/PageSignup';
import PageNoticeList from 'Pages/notice/PageNoticeList';
import PageProfileCheck from 'Pages/mypage/PageProfileCheck';
import PageProfileDetail from 'Pages/mypage/PageProfileDetail';
import PageProfileForm from 'Pages/mypage/PageProfileForm';
import PageNoticeDetail from 'Pages/notice/PageNoticeDetail';
import PageNoticeForm from 'Pages/notice/PageNoticeForm';
import PageQnaIndex from 'Pages/qna/PageQnaIndex';
import PageQnaForm from 'Pages/qna/PageQnaForm';
import PageQnaDetail from 'Pages/qna/PageQnaDetail';
import PageReviewIndex from 'Pages/review/PageReviewIndex';
import PageReviewDetail from 'Pages/review/PageReviewDetail';
import PageReviewForm from 'Pages/review/PageReviewForm';
import PageCommunityIndex from 'Pages/community/PageCommunityIndex';
import PageCommunityDetail from 'Pages/community/PageCommunityDetail';
import PageCommunityForm from 'Pages/community/PageCommunityForm';

function App() {
  const [auth, _, login] = useAuth();

  if (auth.isLoggedIn && auth.is_superuser) {
    return (
      <div className="App">
        <TopNav />
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/accounts/login/" element={<PageLogin />} />
          <Route path="/accounts/signup/" element={<PageSignup />} />

          <Route path="/clothes/" element={<PageClothesIndex />} />
          <Route
            path="/clothes/:clothes_num/"
            element={<PageClothesDetail />}
          />
          <Route path="/clothes/new/" element={<PageClothesForm />} />
          <Route
            path="/clothes/:clothes_num/edit/"
            element={<PageClothesForm />}
          />

          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />
          <Route path="/notice/new/" element={<PageNoticeForm />} />
          <Route path="/notice/:notice_num/edit" element={<PageNoticeForm />} />

          <Route path="/mypage/profile/check/" element={<PageProfileCheck />} />
          <Route
            path="/mypage/profile/detail/"
            element={<PageProfileDetail />}
          />
          <Route path="/mypage/profile/edit/" element={<PageProfileForm />} />

          <Route path="/qna/" element={<PageQnaIndex />} />
          <Route path="/qna/:qna_num/" element={<PageQnaDetail />} />
          <Route path="/qna/new/" element={<PageQnaForm />} />
          <Route path="/qna/:qna_num/edit/" element={<PageQnaForm />} />
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:review_num/" element={<PageReviewDetail />} />
          <Route path="/review/new/" element={<PageReviewForm />} />
          <Route
            path="/review/:review_num/edit/"
            element={<PageReviewForm />}
          />
          <Route path="/community/" element={<PageCommunityIndex />} />
          <Route
            path="/community/:community_num/"
            element={<PageCommunityDetail />}
          />
          <Route path="/community/new/" element={<PageCommunityForm />} />
          <Route
            path="/community/:community_num/edit/"
            element={<PageCommunityForm />}
          />
        </Routes>

        <hr className="mt-5" />
        <h6 className="text-xs mt-4 mb-7 text-gray-500">@PaJaMa compamy.</h6>
      </div>
    );
  } else if (auth.isLoggedIn && !auth.is_superuser) {
    return (
      <div className="App">
        <TopNav />
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/accounts/login/" element={<PageLogin />} />
          <Route path="/accounts/signup/" element={<PageSignup />} />

          <Route path="/clothes/" element={<PageClothesIndex />} />
          <Route
            path="/clothes/:clothes_num/"
            element={<PageClothesDetail />}
          />
          <Route path="/clothes/new/" element={<PageClothesForm />} />
          <Route
            path="/clothes/:clothes_num/edit/"
            element={<PageClothesForm />}
          />

          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />
          {/* <Route path="/notice/new/" element={<PageNoticeForm />} />
        <Route path="/notice/:notice_num/edit" element={<PageNoticeForm />} /> */}

          <Route path="/mypage/profile/check/" element={<PageProfileCheck />} />
          <Route
            path="/mypage/profile/detail/"
            element={<PageProfileDetail />}
          />
          <Route path="/mypage/profile/edit/" element={<PageProfileForm />} />

          <Route path="/qna/" element={<PageQnaIndex />} />
          <Route path="/qna/:qna_num/" element={<PageQnaDetail />} />
          <Route path="/qna/new/" element={<PageQnaForm />} />
          <Route path="/qna/:qna_num/edit/" element={<PageQnaForm />} />
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:review_num/" element={<PageReviewDetail />} />
          <Route path="/review/new/" element={<PageReviewForm />} />
          <Route
            path="/review/:review_num/edit/"
            element={<PageReviewForm />}
          />
          <Route path="/community/" element={<PageCommunityIndex />} />
          <Route
            path="/community/:community_num/"
            element={<PageCommunityDetail />}
          />
          <Route path="/community/new/" element={<PageCommunityForm />} />
          <Route
            path="/community/:community_num/edit/"
            element={<PageCommunityForm />}
          />
        </Routes>

        <hr className="mt-5" />
        <h6 className="text-xs mt-4 mb-7 text-gray-500">@PaJaMa compamy.</h6>
      </div>
    );
  } else {
    return (
      <div className="App">
        <TopNav />
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/accounts/login/" element={<PageLogin />} />
          <Route path="/accounts/signup/" element={<PageSignup />} />

          {/* <Route path="/clothes/" element={<PageClothesIndex />} />
        <Route path="/clothes/:clothes_num/" element={<PageClothesDetail />} />
        <Route path="/clothes/new/" element={<PageClothesForm />} />
        <Route path="/clothes/:clothes_num/edit/" element={<PageClothesForm />} />

        <Route path="/notice/" element={<PageNoticeList />} />
        <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />
        {/* <Route path="/notice/new/" element={<PageNoticeForm />} />
        <Route path="/notice/:notice_num/edit" element={<PageNoticeForm />} /> */}

          <Route path="/mypage/profile/check/" element={<PageProfileCheck />} />
          <Route
            path="/mypage/profile/detail/"
            element={<PageProfileDetail />}
          />
          <Route path="/mypage/profile/edit/" element={<PageProfileForm />} />

          <Route path="/qna/" element={<PageQnaIndex />} />
          <Route path="/qna/:qna_num/" element={<PageQnaDetail />} />
          <Route path="/qna/new/" element={<PageQnaForm />} />
          <Route path="/qna/:qna_num/edit/" element={<PageQnaForm />} />
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:review_num/" element={<PageReviewDetail />} />
          <Route path="/review/new/" element={<PageReviewForm />} />
          <Route
            path="/review/:review_num/edit/"
            element={<PageReviewForm />}
          />
          <Route path="/community/" element={<PageCommunityIndex />} />
          <Route
            path="/community/:community_num/"
            element={<PageCommunityDetail />}
          />
          <Route path="/community/new/" element={<PageCommunityForm />} />
          <Route
            path="/community/:community_num/edit/"
            element={<PageCommunityForm />}
          />
        </Routes>

        <hr className="mt-5" />
        <h6 className="text-xs mt-4 mb-7 text-gray-500">@PaJaMa compamy.</h6>
      </div>
    );
  }
}

export default App;
