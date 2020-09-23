import * as React from 'react';
import './index.less';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/Table';

export interface WindTableProps extends TableProps<any> {
  autoScroll?: boolean;
  reachBottom?: (event: Event) => any;
}

const WindTable: React.FC<WindTableProps> = (props) => {
  const { dataSource } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  let timer: any = null;
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  React.useEffect(() => {
    if (!props.autoScroll) {
      return;
    }

    const { current } = ref;
    const wrapper = current?.querySelector('.ant-table-body');
    const table = wrapper?.querySelector('table');
    const tbody = table?.querySelector('tbody');

    if (!tbody || !table || !wrapper) {
      return;
    }

    if (!props.scroll?.y || tbody.scrollHeight <= props.scroll?.y) {
      return;
    }

    // 创建一个tbody的拷贝, 为了滑动时的流畅性
    // 去除上一次创建的拷贝
    const copyEl = table?.querySelector('.ant-table-tbody.copy');
    copyEl?.remove();

    // 创建新的dom
    const tbodyEl = document.createElement('tbody');
    tbodyEl.classList.add('ant-table-tbody');
    tbodyEl.classList.add('copy');
    tbodyEl.innerHTML = tbody.innerHTML;
    table?.appendChild(tbodyEl);

    // 设置滚动定时器
    clearTimer();
    timer = setInterval(() => {
      if (wrapper.scrollTop >= tbody.scrollHeight) {
        wrapper.scrollTop = 0;
      } else {
        wrapper.scrollTop++;
      }
    }, 20);

    return () => {
      clearTimer();
    };
  }, [dataSource]);

  React.useEffect(() => {
    const { current } = ref;
    const wrapper = current?.querySelector('.ant-table-body');
    const table = wrapper?.querySelector('table');
    const tbody = table?.querySelector('tbody');
    if (!tbody || !table || !wrapper) {
      return;
    }

    if (wrapper.hasOwnProperty('eventFlag')) {
      return;
    }

    // 添加滚动监听事件
    wrapper.addEventListener('scroll', (e) => {
      const { reachBottom } = props;
      if (wrapper.scrollTop + wrapper.clientHeight === tbody.scrollHeight) {
        reachBottom && reachBottom(e);
      }
    });

    Object.defineProperty(wrapper, 'eventFlag', {
      value: true,
    });
  }, [dataSource]);

  return (
    <div ref={ref}>
      <Table className="table" {...props} />
    </div>
  );
};

WindTable.defaultProps = {
  locale: {
    emptyText: <div style={{ color: '#00dbfb', height: 100, lineHeight: '100px' }}>暂无数据</div>,
  },
};

export default WindTable;
