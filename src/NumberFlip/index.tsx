import * as React from 'react';
import { Flip } from 'number-flip';

const formatVal = (num: number) => {
  const val = parseInt(`${num * 100}`, 10);
  return val;
};

export interface NumberFlipProps {
  value: number;
  style?: React.CSSProperties;
  className?: string;
  zero?: boolean;
  duration?: number;
}

const NumberFlip: React.FC<NumberFlipProps> = (props) => {
  const { zero } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  let timer: any = null;
  const { value } = props;

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  React.useEffect(() => {
    if (value === null || value === undefined) {
      return;
    }

    if (ref.current) {
      ref.current.innerHTML = '';
    }

    const option = {
      node: ref.current,
      direct: false,
      from: 0,
      to: value,
      duration: props.duration || 0.8,
      separator: '',
      seperateOnly: 0,
    };

    const val = `${value}`;
    const isFloat = val.includes('.');

    if (isFloat) {
      option.to = formatVal(value);
      option.separator = '.';
      option.seperateOnly = 2;
    }

    // eslint-disable-next-line no-new
    new Flip(option);

    if (zero) {
      timer = setInterval(async () => {
        const container = ref.current;
        container.innerHTML = '';

        // eslint-disable-next-line no-new
        new Flip(option);
      }, 5000);
    }

    return () =>
      clearTimer();
  }, [value]);

  const { className, style } = props;
  return (
    <div className={className} style={style}>
      {typeof value === 'number' ? <div ref={ref} /> : 0}
    </div>
  );
};

NumberFlip.defaultProps = {
  zero: true,
};

export default NumberFlip;
