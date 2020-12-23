import * as React from 'react';
import { Table } from 'envw';

const TableDemo: React.FC = () => {
  const dataSource = new Array(10).fill({}).map((item, index) => ({
    key: index,
    name: `胡彦斌${index}`,
    age: 32,
    address: '西湖区湖底公园1号',
  }));

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
  ];

  return <Table scroll={{ y: 200 }} pagination={false} dataSource={dataSource} columns={columns} />;
};

export default TableDemo;
