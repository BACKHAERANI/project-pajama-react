import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className="flex flex-col pr-20 ">
      <div className="text-align: text-xl right-1 mt-8 mb-3 ml-5 mr-12 ">
        마이페이지
      </div>
      <MyLink to="/mypage/rental/">대여 내역</MyLink>
      <MyLink to="/mypage/review/">대여 후기</MyLink>
      <MyLink to="/profile/">개인정보수정</MyLink>
      <MyLink to="/qna/">1:1 문의</MyLink>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link to={to} className="text-align: pl-2 py-3 box-border border">
      {children}
    </Link>
  );
}
export default SideNav;
