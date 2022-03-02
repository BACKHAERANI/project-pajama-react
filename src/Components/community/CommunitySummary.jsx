import { Link } from 'react-router-dom';

function CommunitySummary({ community, index }) {
  return (
    <>
      <tbody className="border-b border-gray-150">
        <tr>
          <td className="p-4 pl-6">{index + 1}</td>
          <td>
            <Link to={`/community/${community.community_num}/`}>
              {community.title}
            </Link>
          </td>
          <td className="ml-20">{community?.user_id?.user_nickname}</td>
          <td className="text-right pr-5">
            {community.registration_date.slice(0, 10)}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default CommunitySummary;
