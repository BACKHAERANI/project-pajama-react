import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className="grid pr-14 pt-5 ">
      <div className="pt-4 pb-5 font-bold text-2xl ">마이페이지</div>
      <MyLink to="/clothes/">대여 내역</MyLink>
      <MyLink to="/review/">대여 후기</MyLink>
      <MyLink to="/profile/">개인정보수정</MyLink>
      <MyLink to="/qna/">1:1 문의</MyLink>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="pl-2 py-3 text-sm box-border border border-gray-150"
    >
      <div className="ml-2">{children}</div>
    </Link>
  );
}

export default SideNav;
