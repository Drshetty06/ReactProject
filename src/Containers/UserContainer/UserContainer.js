import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionComponent from '../../Components/AccordionComponent/AccordionComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import SearchComponent from '../../Components/SearchComponent/SearchComponent';
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent';
import './UserContainer.css';
import { fetchRoles } from '../../Redux/Actions/Fetch';
import { columns } from './TableColumns';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    content: (

      <div className="user-container-content">
        <div className="search-button-container">
          <div className="search-container">
            <SearchComponent />
          </div>
          <div className="button-container">
            <ButtonComponent onClick={() => navigate('/CreateRole')}>
              Create Role
            </ButtonComponent>

          </div>
        </div>
        <TableComponent data={transformedRoles} columns={columns} />
      </div>
    ),

  }));

  return (
    <div className="users-container">
      <AccordionComponent accordionData={accordionData} />
    </div>
  );
};

export default Users;
