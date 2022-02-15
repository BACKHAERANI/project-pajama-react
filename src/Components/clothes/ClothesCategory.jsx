import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const STATELIST = [
  'TOP',
  'BLOUSE',
  'DRESS',
  'PANTS',
  'SKIRT',
  'OUTER',
  'ACC & CAP',
];

function ClothesCategory() {
  const [category, setCategory] = useState(STATELIST[0]);
  return (
    <div className="my-3">
      <ul className="flex gap-4">
        <li>
          <MyLink to="/clothes/">{STATELIST[0]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[1]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[2]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[3]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[4]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[5]}</MyLink>
        </li>
        <li>
          <MyLink to="/clothes/">{STATELIST[6]}</MyLink>
        </li>
      </ul>
      <hr className="my-3" />
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
