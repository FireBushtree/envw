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
      width="100%"
      height="100%"
      frameBorder="no"
      scrolling="no"
      allowFullScreen
      src={url}
    />
  ) : null;
};

export default Iframe;
