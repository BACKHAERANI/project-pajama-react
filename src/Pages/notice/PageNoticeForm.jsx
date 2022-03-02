import { useParams } from 'react-router-dom';
import NoticeForm from 'Components/notice/NoticeForm';

function PageNoticeForm() {
  const { notice_num } = useParams();

  return (
    <div className="grid col-span-4 auto-rows-max">
      <h1 className=" pt-8  text-xl font-bold">공지사항</h1>
      <h6 className=" flex justify-end m-2 text-xs text-gray-400"> </h6>
      <NoticeForm notice_num={notice_num} />
    </div>
  );
}

export default PageNoticeForm;
