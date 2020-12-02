import React, { useContext } from 'react';
import UsersListItem from '../components/UsersListItem';
import { UsersListContext } from '../providers/UsersListProvider';

const DashboardView = () => {
  const users = useContext(UsersListContext);
  return (
    <div className="user-list-page">
      <p>Test</p>
    </div>
  );
};

export default DashboardView;
