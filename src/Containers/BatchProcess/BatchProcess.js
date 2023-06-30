import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AccordionComponent from '../../Components/AccordionComponent/AccordionComponent';
import TabsComponent from '../../Components/TabsComponent/TabsComponent';

const BatchProcess = () => {
  const dispatch = useDispatch();

  const accordionData = [
    {
      key: '1',
      header: 'NACH',
      content: <TabsComponent tabs={['NACH Mandates', 'NACH Present', 'NACH Receipt','NACH Status']} />,
    },
    {
      key: '2',
      header: 'Account Adjustment',
      content: <TabsComponent tabs={['NACH Mandates', 'NACH Present', 'NACH Receipt','NACH Status']} />,
    },
  ];



  return (
    <div>
      <AccordionComponent accordionData={accordionData} />
    </div>
  );
};

export default BatchProcess;
