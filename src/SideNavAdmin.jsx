import { Link } from 'react-router-dom';

function SideNavAdmin() {
  return (
    <div className="flex flex-col pr-20 ">
      <div className="text-align: text-xl font-semibold right-1 mt-8 mb-3">
        관리자페이지
      </div>
      <MyLink to="/admin/">개인회원관리</MyLink>
      <MyLink to="/admin/dropout/">탈퇴회원관리</MyLink>
      <MyLink to="/admin/qna/">1:1 문의관리</MyLink>
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

export default SideNavAdmin;
