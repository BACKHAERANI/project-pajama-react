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
import PageReviewForm from 'Pages/review/PageReviewForm';
import PageCartList from 'Pages/cart/PageCartList';
import PageCommunityIndex from 'Pages/community/PageCommunityIndex';
import PageCommunityDetail from 'Pages/community/PageCommunityDetail';
import PageCommunityForm from 'Pages/community/PageCommunityForm';
import PagePayment from 'Pages/payment/PagePayment';
import PageUserIndex from 'Pages/adminuser/PageUserIndex';
import PageAdminQna from 'Pages/adminuser/PageAdminQna';
import PagePaymentDetail from 'Pages/payment/PagePaymentDetail';
import PageUserDropOut from 'Pages/adminuser/PageUserDropOut';
import PageUserDetail from 'Pages/adminuser/PageUserDetail';
import PagerentalList from 'Pages/mypage/PagerentalList';
import PageRentalreview from 'Pages/mypage/PageRentalreview';
import PageAdminUserDetail from 'Pages/adminuser/PageAdminUserDetail';

import NotFound from 'Base/css/NotFound';

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
          <Route path="/admin/" element={<PageUserIndex />} />
          <Route path="/admin/dropout/" element={<PageUserDropOut />} />
          <Route path="/admin/edit/:user_id/" element={<PageUserDetail />} />
          <Route path="/admin/:user_id/" element={<PageAdminUserDetail />} />
          <Route path="/admin/qna/" element={<PageAdminQna />} />
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

          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />
          <Route path="/notice/new/" element={<PageNoticeForm />} />
          <Route path="/notice/:notice_num/edit" element={<PageNoticeForm />} />

          <Route path="/profile/" element={<PageProfileCheck />} />
          <Route path="/profile/:user_id/" element={<PageProfileDetail />} />
          <Route path="/profile/:user_id/edit/" element={<PageProfileForm />} />

          <Route path="/qna/" element={<PageQnaIndex />} />
          <Route path="/qna/:qna_num/" element={<PageQnaDetail />} />
          <Route path="/qna/new/" element={<PageQnaForm />} />
          <Route path="/qna/:qna_num/edit/" element={<PageQnaForm />} />
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route
            path="/review/:payment_detail_num/new/"
            element={<PageReviewForm />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
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

          <Route path="/cart/" element={<PageCartList />} />
          <Route path="/payment/" element={<PagePayment />} />
          <Route
            path="/payment/:payment_num/"
            element={<PagePaymentDetail />}
          />

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

          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />

          <Route path="/profile/" element={<PageProfileCheck />} />
          <Route path="/profile/:user_id/" element={<PageProfileDetail />} />
          <Route path="/profile/:user_id/edit/" element={<PageProfileForm />} />
          <Route path="/mypage/rental/" element={<PagerentalList />} />
          <Route path="/mypage/review/" element={<PageRentalreview />} />

          <Route path="/qna/" element={<PageQnaIndex />} />
          <Route path="/qna/:qna_num/" element={<PageQnaDetail />} />
          <Route path="/qna/new/" element={<PageQnaForm />} />
          <Route path="/qna/:qna_num/edit/" element={<PageQnaForm />} />
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route
            path="/review/:payment_detail_num/new/"
            element={<PageReviewForm />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
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

          <Route path="/clothes/" element={<PageClothesIndex />} />
          <Route
            path="/clothes/:clothes_num/"
            element={<PageClothesDetail />}
          />

          <Route path="/community/" element={<PageCommunityIndex />} />

          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:notice_num/" element={<PageNoticeDetail />} />

          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}
export default App;
