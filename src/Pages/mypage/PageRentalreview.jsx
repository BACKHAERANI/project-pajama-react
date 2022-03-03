import Rentalreview from 'Components/mypage/Rentalreview';
import SideNav from 'SideNav';

function PageRentalreview() {
  return (
    <div>
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>
        <div className="col-span-4">
          <Rentalreview />
        </div>
      </div>
    </div>
  );
}

export default PageRentalreview;
