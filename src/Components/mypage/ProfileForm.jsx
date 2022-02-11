import { useApiAxios } from '../../Base/api/base';
import useFieldValues from '../../Base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INIT_FILED_VALUES = {
  password: '',
  password2: '',
  user_nickname: '',
  user_tel: '',
  user_genre: '',
};

function ProfileForm() {
  const Navigate = useNavigate();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FILED_VALUES);

  const [{ loading, error, errorMessages }, get_profile] = useApiAxios(
    {
      url: 'user/api/user/',
      method: 'POST',
    },
    { manual: true },
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    get_profile({ data: fieldValues }).then((response) => {
      const { password, password2, user_nickname, user_tel, user_genre } =
        response.data;

      console.log('프로필 수정이 완료되었습니다.');
      Navigate('/mypage/');
    });
  };

  return (
    <div>
      <h1>ProfileForm</h1>
    </div>
  );
}

export default ProfileForm;
