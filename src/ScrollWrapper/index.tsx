import * as React from 'react';
import './index.less';

export interface ScrollWrapperProps {
  height: string;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = (props) => {
  let timer: any = null;
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const [showCopyEl, setShowCopyEl] = React.useState(true);
  const { children, height } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    clearTimer();
    const { current: wrapper } = wrapperRef;
    const { current: content } = contentRef;

    if (!wrapper || !content) {
      return;
    }

    if (content.clientHeight === 0) {
      return;
    }

    if (wrapper.clientHeight >= content.clientHeight) {
      setShowCopyEl(false);
      return;
    }

    setShowCopyEl(true);

    timer = setInterval(() => {
      if (wrapper.scrollTop >= content.scrollHeight) {
        wrapper.scrollTop = 0;
      } else {
        wrapper.scrollTop++;
      }
    }, 20);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimer();
    };
  });

  return (
    <div ref={wrapperRef} style={{ height }} className="scrollWrapper">
      <div ref={contentRef}>{children}</div>
      {showCopyEl && <div>{children}</div>}
    </div>
  );
};

export default ScrollWrapper
