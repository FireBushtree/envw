import React, { useEffect, useRef } from 'react';
import { Table as AntTable } from 'antd';
import { TableProps as AntTableProps } from 'antd/lib/table';
import classnames from 'classnames';
import './index.less';

export interface TableProps<T> extends AntTableProps<T> {}

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const { className, ...rest } = props;
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = wrapRef;
    if (!current) {
      return;
    }

    // 1. 填充一个一样的tbody
    const tbody = current.querySelector('.ant-table-tbody');
    const newTbody = tbody.cloneNode(true);
    tbody.parentElement.appendChild(newTbody);

    // 2. 元素滚动
  }, []);

  return (
    <div ref={wrapRef} className={classnames('qw-table-wrap')}>
      <AntTable className={classnames('qw-table', className)} {...rest} />
    </div>
  );
}

export default Table;
