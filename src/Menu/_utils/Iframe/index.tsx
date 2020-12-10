import * as React from 'react';
import classnames from 'classnames';
import './index.less';

interface IframeProps {
  url: string;
  showCancel: boolean;
  isFixed: boolean;
  onBack: () => any;
}

const Iframe: React.FC<IframeProps> = (props) => {
  const { url, isFixed, onBack, showCancel } = props;
  const [showIframe, setShowIframe] = React.useState(true);
  React.useEffect(() => {
    setShowIframe(false);
    setTimeout(() => {
      setShowIframe(true);
    });
  }, [url]);

  return showIframe ? (
    <div
      className={classnames('qw-menu-iframe', {
        'is-fixed': isFixed,
      })}
    >
      {isFixed && showCancel && (
        <div onClick={() => onBack()} className="qw-menu-iframe-cancel">
          退出全屏
        </div>
      )}

      <iframe
        title="content"
        width="100%"
        height="100%"
        frameBorder="no"
        scrolling="no"
        allowFullScreen
        src={url}
      />
    </div>
  ) : null;
};

export default Iframe;
