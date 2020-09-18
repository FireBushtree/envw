interface GverifyOptions {
  containerId: string,
}

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: number, max: number) {
  var r = randomNum(min, max);
  var g = randomNum(min, max);
  var b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const numberArray = ['0', '1', '2', '3', '4','5','6','7','8','9']
const INIT_WIDTH = 100
const INIT_HEIGHT = 30

class Gverify {
  code: string
  width: number
  height: number
  containerId: string
  canvas: HTMLCanvasElement | null

  constructor(option: GverifyOptions) {
    this.width = INIT_WIDTH
    this.height = INIT_HEIGHT
    this.canvas = null
    this.code = ''
    this.containerId = option.containerId

    this.init()
    this.refresh()
  }

  init() {
    const container = document.getElementById(this.containerId)

    if (!container) {
      return
    }

    // 重置宽高
    const { offsetWidth, offsetHeight } = container
    this.width = offsetWidth || INIT_WIDTH
    this.height = offsetHeight || INIT_HEIGHT

    const canvas = document.createElement('canvas')
    canvas.id = this.containerId
    canvas.width = this.width
    canvas.height = this.height
    canvas.style.cursor = 'pointer';
    canvas.innerHTML = '您的浏览器版本不支持canvas';
    container.appendChild(canvas);
    canvas.onclick = () => {
      this.refresh()
    }

    this.canvas = canvas
  }

  refresh() {
    this.code = ''
    const { canvas } = this

    if (!canvas || !canvas.getContext) {
      return
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.textBaseline = 'middle'
    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, this.width, this.height);

    const textArray = numberArray

    for (var i = 1; i <= 4; i++) {
      const text = textArray[randomNum(0, textArray.length)];
      this.code += text;
      ctx.font =
        randomNum(this.height / 2, this.height) + 'px SimHei'; //随机生成字体大小
      ctx.fillStyle = randomColor(20, 100); //随机生成字体颜色
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      var x = (this.width / 5) * i;
      var y = this.height / 2;
      var deg = randomNum(-30, 30);
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }

    for (var i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(
        randomNum(0, this.width),
        randomNum(0, this.height),
      );
      ctx.lineTo(
        randomNum(0, this.width),
        randomNum(0, this.height),
      );
      ctx.stroke();
    }

    for (var i = 0; i < this.width / 4; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        randomNum(0, this.width),
        randomNum(0, this.height),
        1,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    }
  }

  validate(code: string) {
    var code = code.toLowerCase();
    var originCode = this.code.toLowerCase();
    if (code == originCode) {
      return true;
    } else {
      this.refresh();
      return false;
    }
  }
}

export default Gverify
