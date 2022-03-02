import { useParams } from 'react-router-dom';
import NoticeDetail from 'Components/notice/NoticeDetail';

function PageNoticeDetail() {
  const { notice_num } = useParams();

  return (
    <div>
      <div>
        <h1 className="text-xl mr-40 inline">공지사항</h1>
      </div>
      <NoticeDetail notice_num={notice_num} />
    </div>
  );
}

export default PageNoticeDetail;
