import {NavLink} from 'react-router-dom';
import React from 'react';

interface Props {
  id: string;
  title: string;
}

const SideBarElement: React.FC<Props> = ({id, title}) => {
  return (
    <NavLink className={'custom-link fs-3'} to={'/quotes/' + id}>
      {title}
    </NavLink>

  );
};

export default SideBarElement;