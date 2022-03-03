import RentalList from 'Components/mypage/RentalList';
import SideNav from 'SideNav';

function PagerentalList() {
  return (
    <div>
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>
        <div className="col-span-4">
          <RentalList />
        </div>
      </div>
    </div>
  );
}

export default PagerentalList;
