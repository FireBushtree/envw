interface GverifyOptions {
  container: HTMLElement;
}

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: number, max: number) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
}

const numberArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const INIT_WIDTH = 100;
const INIT_HEIGHT = 30;

class Gverify {
  code: string;

  width: number;

  height: number;

  container: HTMLElement;

  canvas: HTMLCanvasElement | null;

  constructor(option: GverifyOptions) {
    this.width = INIT_WIDTH;
    this.height = INIT_HEIGHT;
    this.canvas = null;
    this.code = '';
    this.container = option.container;

    this.init();
    this.refresh();
  }

  init() {
    const { container } = this;

    if (!container) {
      return;
    }

    // 重置宽高
    const { offsetWidth, offsetHeight } = container;
    this.width = offsetWidth || INIT_WIDTH;
    this.height = offsetHeight || INIT_HEIGHT;

    const canvas = document.createElement('canvas');
    canvas.id = `${Math.random()}${new Date().getTime()}`;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.cursor = 'pointer';
    canvas.innerHTML = '您的浏览器版本不支持canvas';
    container.appendChild(canvas);
    canvas.onclick = () => {
      this.refresh();
    };

    this.canvas = canvas;
  }

  refresh() {
    this.code = '';
    const { canvas } = this;

    if (!canvas || !canvas.getContext) {
      return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, this.width, this.height);

    const textArray = numberArray;

    for (let i = 1; i <= 4; i += 1) {
      const text = textArray[randomNum(0, textArray.length)];
      this.code += text;
      ctx.font = `${randomNum(this.height / 2, this.height)}px SimHei`; // 随机生成字体大小
      ctx.fillStyle = randomColor(20, 100); // 随机生成字体颜色
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      const x = (this.width / 5) * i;
      const y = this.height / 2;
      const deg = randomNum(-30, 30);
      /** 设置旋转角度和坐标原点* */
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      /** 恢复旋转角度和坐标原点* */
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }

    for (let i = 0; i < 4; i += 1) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, this.width), randomNum(0, this.height));
      ctx.lineTo(randomNum(0, this.width), randomNum(0, this.height));
      ctx.stroke();
    }

    for (let i = 0; i < this.width / 4; i += 1) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(randomNum(0, this.width), randomNum(0, this.height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  validate(code: string) {
    const currentCode = code.toLowerCase();
    const originCode = this.code.toLowerCase();
    if (currentCode === originCode) {
      return true;
    }
    this.refresh();
    return false;
  }
}

export default Gverify;
