import { useParams } from 'react-router-dom';
import NoticeDetail from 'Components/notice/NoticeDetail';

function PageNoticeDetail() {
  const { notice_num } = useParams();

  return (
    <div>
      <NoticeDetail notice_num={notice_num} />
    </div>
  );
}

export default PageNoticeDetail;
