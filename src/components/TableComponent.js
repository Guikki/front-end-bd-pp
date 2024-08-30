import React from 'react';
import { Table, Pagination } from 'antd';

const TableComponent = ({ data, columns, pagination, onPaginationChange }) => (
  <>
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record, index) => index}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
    <Pagination
      current={pagination.current}
      pageSize={pagination.pageSize}
      total={data.length}
      onChange={onPaginationChange}
      showSizeChanger
      onShowSizeChange={onPaginationChange}
      style={{ marginTop: '16px' }}
    />
  </>
);

export default TableComponent;
