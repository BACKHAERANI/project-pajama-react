import { useParams } from 'react-router-dom';
import NoticeDetail from 'Components/notice/NoticeDetail';

function PageNoticeDetail() {
  const { notice_num } = useParams();

  return (
    <div>
      <div>
        <h1 className="pt-8 pb-5 text-xl font-bold">공지사항</h1>
      </div>
      <NoticeDetail notice_num={notice_num} />
    </div>
  );
}

export default PageNoticeDetail;
