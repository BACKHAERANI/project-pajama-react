import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../../Components/review/ReviewForm';

function PageReviewForm() {
  const { payment_detail_num } = useParams();
  return (
    <div className="grid col-span-4 auto-rows-max">
      <h1 className=" pt-8  text-xl font-bold">리뷰작성</h1>
      <h6 className=" flex justify-end m-1 text-xs text-gray-400">
        * 허가받지 않은 광고 혹은 비방, 욕설, 인신공격 등 분란의 소지가 있는
        글은 관리자에 의해 삭제될 수 있습니다.
      </h6>
      <ReviewForm payment_detail_num={payment_detail_num} />
    </div>
  );
}

export default PageReviewForm;
