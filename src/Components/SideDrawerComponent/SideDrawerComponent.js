import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserResources } from '../../Redux/Actions/Users';
import routes from './../../Routes/routes';

const { Sider } = Layout;

const SideDrawerComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userResources, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserResources('123456'));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="drawer">
      <Sider width={250} className="side-drawer">
        <div className="menu-container">
          <Menu mode="inline" className="compartments" selectedKeys={[location.pathname]}>
            {userResources.map((item) => {
              const route = routes.find((routeItem) => routeItem.title === item.title);
              if (route) {
                return (
                  <Menu.Item key={item.key} onClick={() => handleNavigation(route.path)}>
                    <span className="compartment-name">{item.title}</span>
                  </Menu.Item>
                );
              }
              return null;
            })}
          </Menu>
        </div>
      </Sider>
    </div>
  );
};

export default SideDrawerComponent;
