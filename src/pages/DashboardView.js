import React, { useContext } from 'react';
import UsersListItem from '../components/UsersListItem';
import { UsersListContext } from '../providers/UsersListProvider';
import selfcheckout from '../res/selfcheckout.gif';

const DashboardView = () => {
  const users = useContext(UsersListContext);
  return (
    <div className="user-list-page">
      <img src={selfcheckout} alt="" />
    </div>
  );
};

export default DashboardView;
