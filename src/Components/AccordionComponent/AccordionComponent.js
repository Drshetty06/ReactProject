import React, { useState } from 'react';
import { Collapse } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './AccordionComponent.css';

const { Panel } = Collapse;

const AccordionComponent = ({ accordionData }) => {
  const [accordionActiveKey, setAccordionActiveKey] = useState('1');

  const handleAccordionChange = (activeKey) => {
    setAccordionActiveKey(activeKey);
  };

  const renderHeader = (header, isActive) => (
    <div className={`accordion-header${isActive ? ' active' : ''}`}>
      {header}
      <CaretDownOutlined className="accordion-icon" rotate={isActive ? 180 : 0} />
    </div>
  );

  if (!accordionData || accordionData.length === 0) {
    return null;
  }

  return (
    <Collapse
      activeKey={accordionActiveKey}
      onChange={handleAccordionChange}
      expandIcon={() => null}
    >
      {accordionData.map((accordion) => (
        <Panel
          header={renderHeader(accordion.header, accordion.key === accordionActiveKey)}
          key={accordion.key}
        >
          {accordion.content}
        </Panel>
      ))}
    </Collapse>
  );
};

export default AccordionComponent;
