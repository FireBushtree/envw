import * as React from 'react';
import { Flip } from 'number-flip';

const formatVal = (num: number) => {
  const val = parseInt(num * 100 + '');
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
  let { zero } = props;
  (zero === undefined || zero === null) && (zero = true);

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

    let val = value + '';
    const isFloat = val.includes('.');

    if (isFloat) {
      option.to = formatVal(value);
      option.separator = '.';
      option.seperateOnly = 2;
    }

    new Flip(option);

    if (zero) {
      timer = setInterval(async () => {
        const container = ref.current;
        container && (container.innerHTML = '');
        new Flip(option);
      }, 5000);
    }

    return () => clearTimer();
  }, [value]);

  return (
    <div className={props.className} style={props.style}>
      {typeof props.value === 'number' ? <div ref={ref}></div> : 0}
    </div>
  );
};

export default NumberFlip
