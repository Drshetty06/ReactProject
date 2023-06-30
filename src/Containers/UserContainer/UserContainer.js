import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionComponent from '../../Components/AccordionComponent/AccordionComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import './UserContainer.css';
import { fetchRoles } from '../../Redux/Actions/Fetch';
import { columns } from './TableColumns';

const transformData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    key: item.id,
  }));
};

const Users = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);
  const { userResources, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const transformedRoles = transformData(roles);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userChildren = userResources[0]?.children ?? [];

  const accordionData = userChildren.map((child) => ({
    header: child.title,
    content: <TableComponent data={transformedRoles} columns={columns} />,
  }));

  return (
    <div className="users-container">
      <AccordionComponent accordionData={accordionData} />
    </div>
  );
};

export default Users;
