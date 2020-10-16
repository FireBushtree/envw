import * as React from 'react';

interface IframeProps {
  url: string;
}

const Iframe: React.FC<IframeProps> = (props) => {
  const { url } = props;
  const [showIframe, setShowIframe] = React.useState(true);
  React.useEffect(() => {
    setShowIframe(false);
    setTimeout(() => {
      setShowIframe(true);
    });
  }, [url]);

  return showIframe ? (
    <iframe
      title="content"
      style={{ width: '100%', height: 'calc(100% - 48px)', border: 'none' }}
      src={url}
    />
  ) : null;
};

export default Iframe;
