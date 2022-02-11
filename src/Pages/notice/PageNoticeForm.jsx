import { useParams } from 'react-router-dom';
import NoticeForm from '../../Components/notice/NoticeForm';

function PageNoticeForm() {
  const { notice_num } = useParams();

  return (
    <div>
      <NoticeForm notice_num={notice_num} />
    </div>
  );
}

export default PageNoticeForm;
