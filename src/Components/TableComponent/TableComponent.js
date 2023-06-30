import React from 'react';
import { Table } from 'antd';

const TableComponent = ({ data, columns }) => {
  const hasData = data && data.length > 0;

  return (
    <div>
      {hasData ? (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
          size="middle"
          style={{ backgroundColor: '#f0f2f5' }}
        />
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
};

export default TableComponent;
