import { useAuth } from '../../Base/Context/AuthContext';
import { NavLink } from 'react-router-dom';

function ClothesCategory() {
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="my-3">
      <ul className="flex gap-4">
        <li>
          <MyLink to="/clothes/TOP">TOP</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/BLOUSE">BLOUSE</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/DRESS">DRESS</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/PANTS">PANTS</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/SKIRT">SKIRT</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/OUTER">OUTER</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/ACC & CAP">ACC & CAP</MyLink>
        </li>
      </ul>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName + ' ' + (isActive ? 'border-b-4 border-red-400' : '')
      }
    >
      {children}
    </NavLink>
  );
}
const baseClassName =
  'px-4 pt-3 pb-2 font-semibold hover:bg-red-200 hover:text-red-500 hover:text-white';

export default ClothesCategory;
