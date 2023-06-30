import React, { useState } from 'react';
import { Tabs } from 'antd';
import './TabsComponent.css';

const { TabPane } = Tabs;

const TabsComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="tabs-container">
      <Tabs activeKey={activeTab} onChange={handleTabClick} tabBarGutter={20}>
        {tabs.map((tab, index) => (
          <TabPane tab={tab} key={String(index)}>
            Content for {tab}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsComponent;
