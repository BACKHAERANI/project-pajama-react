import AdminUserDetail from 'Components/adminuser/AdminUserDetail';
import { useParams } from 'react-router-dom';
import SideNavAdmin from 'SideNavAdmin';

function PageAdminUserDetail() {
  const { user_id } = useParams();

  return (
    <>
      <div className="grid grid-cols-5">
        <div>
          <SideNavAdmin />
        </div>

        <div className="grid col-span-4 auto-rows-max">
          <h1 className="pt-10 text-xl font-bold">회원정보확인💡</h1>

          <div>
            <AdminUserDetail user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageAdminUserDetail;
