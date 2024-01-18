import React, { useEffect, useRef } from 'react';

const Waves = () => {
  const wavesRef = useRef(null);

  useEffect(() => {
    const options = {
      fps: true,
      waves: 3,
      width: 200,
    };

    wavesRef.current = new WavesInstance('#holder', options);
    wavesRef.current.animate();

    return () => {
      // 컴포넌트 언마운트 시 Waves 객체 정리
      wavesRef.current.destroy();
    };
  }, []); // 최초 렌더링 시에만 실행

  return (
    <div id="holder">
      {/* Waves 컨테이너 역할을 하는 요소 */}
    </div>
  );
};

// Waves 객체를 클래스로 정의하여 리액트 컴포넌트에서 사용할 수 있도록 함
class WavesInstance {
  constructor(holder, options) {
    this.pi = Math.PI; // 변경 전: this.pi = Math.PI
    this.pi2 = 2 * Math.PI;

    this.options = this.extend(options || {}, {
      resize: false,
      rotation: 45,
      waves: 5,
      width: 100,
      hue: [11, 14],
      amplitude: 0.5,
      background: true,
      preload: true,
      speed: [0.004, 0.008],
      debug: false,
      fps: false,
    });

    this.waves = [];
    this.holder = document.querySelector(holder);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.holder.appendChild(this.canvas);
    this.hue = this.options.hue[0];
    this.hueFw = true;
    this.stats = new Stats();

    this.resize = this.resize.bind(this);  // 바인딩 추가
    this.updateColor = this.updateColor.bind(this);  // 바인딩 추가
    this.init(this.options.preload);

    if (this.options.resize) {
      window.addEventListener('resize', () => {
        this.resize();
      }, false);
    }
  }

  init(preload) {
    for (let i = 0; i < this.options.waves; i++) {
      this.waves[i] = new Wave(this);
    }

    if (preload) {
      this.preload();
    }
  }

  preload() {
    for (let i = 0; i < this.options.waves; i++) {
      this.updateColor();
      for (let j = 0; j < this.options.width; j++) {
        this.waves[i].update();
      }
    }
  }

  render() {
    this.updateColor();
    this.clear();

    if (this.options.debug) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#f00';
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, this.pi2);
      this.ctx.stroke();
    }

    if (this.options.background) {
      this.background();
    }

    this.waves.forEach((wave) => {
      wave.update();
      wave.draw();
    });
  }

  animate() {
    this.render();

    if (this.options.fps) {
      this.stats.log();
      this.ctx.font = '12px Arial';
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(this.stats.fps() + ' FPS', 10, 22);
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  background() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#000');
    gradient.addColorStop(1, this.color);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  resize() {
    const width = this.holder.offsetWidth;
    const height = this.holder.offsetHeight;
    this.scale = window.devicePixelRatio || 1;
    this.width = width * this.scale;
    this.height = height * this.scale;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  updateColor() {
    this.hue += (this.hueFw) ? 0.01 : -0.01;

    if (this.hue > this.options.hue[1] && this.hueFw) {
      this.hue = this.options.hue[1];
      this.Waves = false;
    } else if (this.hue < this.options.hue[0] && !this.hueFw) {
      this.hue = this.options.hue[0];
      this.Waves = true;
    }

    const a = Math.floor(127 * Math.sin(0.3 * this.hue + 0) + 128);
    const b = Math.floor(127 * Math.sin(0.3 * this.hue + 2) + 128);
    const c = Math.floor(127 * Math.sin(0.3 * this.hue + 4) + 128);

    this.color = 'rgba(' + a + ',' + b + ',' + c + ', 0.1)';
  }

  destroy() {
    // Waves 객체 정리 로직 추가 (필요에 따라 추가 작성)
  }

  extend(options, defaults) {
    for (let key in options) {
      if (defaults.hasOwnProperty(key)) {
        defaults[key] = options[key];
      }
    }
    return defaults;
  }
}

function Wave(Waves) {
  this.Wave = this;
  const speed = Waves.options.speed;

  this.Wave = Waves;
  this.Lines = [];

  this.angle = [
    rnd(this.pi2),
    rnd(this.pi2),
    rnd(this.pi2),
    rnd(this.pi2)
  ];

  this.speed = [
    rnd(speed[0], speed[1]) * rnd_sign(),
    rnd(speed[0], speed[1]) * rnd_sign(),
    rnd(speed[0], speed[1]) * rnd_sign(),
    rnd(speed[0], speed[1]) * rnd_sign(),
  ];
}

Wave.prototype.update = function () {
  const Lines = this.Lines;
  const color = this.Wave.color;

  Lines.push(new Line(this, color));

  if (Lines.length > this.Wave.options.width) {
    Lines.shift();
  }
};

Wave.prototype.draw = function () {
  const Waves = this.Wave;

  const ctx = Waves.ctx;
  const radius = Waves.radius;
  const radius3 = radius / 3;
  const x = Waves.centerX;
  const y = Waves.centerY;
  const rotation = dtr(Waves.options.rotation);
  const amplitude = Waves.options.amplitude;
  const debug = Waves.options.debug;

  const Lines = this.Lines;

  each(Lines, function (line, i) {
    if (debug && i > 0) return;

    const angle = line.angle;

    const x1 = x - radius * Math.cos(angle[0] * amplitude + rotation);
    const y1 = y - radius * Math.sin(angle[0] * amplitude + rotation);
    const x2 = x + radius * Math.cos(angle[3] * amplitude + rotation);
    const y2 = y + radius * Math.sin(angle[3] * amplitude + rotation);
    const cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2);
    const cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2);
    const cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2);
    const cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2);

    ctx.strokeStyle = (debug) ? '#fff' : line.color;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    ctx.stroke();

    if (debug) {
      ctx.strokeStyle = '#fff';
      ctx.globalAlpha = 0.3;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(cpx1, cpy1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(cpx2, cpy2);
      ctx.stroke();

      ctx.globalAlpha = 1;
    }
  });
};

function Line(Wave, color) {
  this.Line = this;

  const angle = Wave.angle;
  const speed = Wave.speed;

  this.Line.angle = [
    Math.sin(angle[0] += speed[0]),
    Math.sin(angle[1] += speed[1]),
    Math.sin(angle[2] += speed[2]),
    Math.sin(angle[3] += speed[3])
  ];

  this.Line.color = color;
}

function Stats() {
  this.data = [];
}

Stats.prototype.time = function () {
  return (performance || Date)
    .now();
};

Stats.prototype.log = function () {
  if (!this.last) {
    this.last = this.time();
    return 0;
  }

  this.new = this.time();
  this.delta = this.new - this.last;
  this.last = this.new;

  this.data.push(this.delta);
  if (this.data.length > 10)
    this.data.shift();
};

Stats.prototype.fps = function () {
  let fps = 0;
  each(this.data, function (data, i) {
    fps += data;
  });

  return Math.round(1000 / (fps / this.data.length));
};

function each(items, callback) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i], i);
  }
}

function dtr(deg) {
  return deg * this.pi / 180;
}

function rtd(rad) {
  return rad * 180 / this.pi;
}

function diagonal_angle(w, h) {
  const a = Math.atan2(h, w) * 1.27325;
  return a;
}

function rnd(a, b) {
  if (arguments.length === 1)
    return Math.random() * a;
  return a + Math.random() * (b - a);
}

function rnd_sign() {
  return (Math.random() > 0.5) ? 1 : -1;
}

export default Waves;
