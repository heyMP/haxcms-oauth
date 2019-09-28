function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Template = {
  render: function render() {
    return "".concat(this.css(), "\n            ").concat(this.html());
  },
  defaultVertexShader: function defaultVertexShader() {
    return "attribute vec2 position;\n              \n              void main() {\n                gl_Position = vec4(position, 0.0, 1.0);\n              }";
  },
  map: function map(scope) {
    return {
      canvas: scope.querySelector('canvas')
    };
  },
  html: function html(node) {
    return "<canvas></canvas>";
  },
  css: function css() {
    return "<style>\n      :host {\n        position: relative;\n        display: inline-block;\n        width: 250px;\n        height: 250px;\n      }\n      :host > canvas {\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        border-radius: inherit;\n       }\n    </style>";
  }
};

var CAMERA = 'camera';
var IMAGE = 'image';
var VIDEO = 'video';
var REPEAT = 0x2901;
var CLAMP_TO_EDGE = 0x812f;
var MIRRORED_REPEAT = 0x8370;
var NEAREST = 0x2600;
var LINEAR = 0x2601;
var NEAREST_MIPMAP_NEAREST = 0x2700;
var LINEAR_MIPMAP_NEAREST = 0x2701;
var NEAREST_MIPMAP_LINEAR = 0x2702;
var LINEAR_MIPMAP_LINEAR = 0x2703;
var MAG_OPTIONS = {
  NEAREST: NEAREST,
  LINEAR: LINEAR
};

var MIN_OPTIONS = _objectSpread({}, MAG_OPTIONS, {
  NEAREST_MIPMAP_NEAREST: NEAREST_MIPMAP_NEAREST,
  LINEAR_MIPMAP_NEAREST: LINEAR_MIPMAP_NEAREST,
  NEAREST_MIPMAP_LINEAR: NEAREST_MIPMAP_LINEAR,
  LINEAR_MIPMAP_LINEAR: LINEAR_MIPMAP_LINEAR
});

var WRAP_OPTIONS = {
  REPEAT: REPEAT,
  MIRRORED_REPEAT: MIRRORED_REPEAT,
  CLAMP_TO_EDGE: CLAMP_TO_EDGE
};
var PIXEL = new Uint8Array([0, 0, 0, 255]);
var IMG_REG = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

var isImage = function isImage(s) {
  return IMG_REG.test(s);
};

var VID_REG = /(\.mp4|\.3gp|\.webm|\.ogv)$/i;

var isVideo = function isVideo(s) {
  return VID_REG.test(s);
};

var floorPowerOfTwo = function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
};

var isPow2 = function isPow2(value) {
  return !(value & value - 1) && !!value;
};

var Texture =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Texture, _HTMLElement);

  _createClass(Texture, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['mag-filter', 'min-filter', 'name', 'src', 'wrap-s', 'wrap-t'];
    }
  }]);

  function Texture() {
    var _this;

    _classCallCheck(this, Texture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texture).call(this));
    _this._imageOnload = _this._imageOnload.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Texture, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {// DELETE TEXTURE
    }
  }, {
    key: "init",
    value: function init(gl, program, index) {
      this._gl = gl;
      this._program = program;
      this._index = index;
      this._glTexture = this._gl.createTexture();

      this._gl.bindTexture(this._gl.TEXTURE_2D, this._glTexture);

      this._setTexture();

      this._location = this._gl.getUniformLocation(this._program, this.name);
      if (!this.src && !this.webcam) return;

      if (this.webcam) {
        this._setupCamera();
      } else if (isVideo(this.src)) {
        this._setupVideo();
      } else if (isImage(this.src)) {
        this._setupImage();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var gl = this._gl,
          texture = this._glTexture,
          index = this._index;
      if (!gl || !texture || typeof index !== 'number') return;
      gl.activeTexture(gl["TEXTURE".concat(index)]);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(this._location, index);

      if (this.shouldUpdate) {
        this._updateTexture();
      }
    }
  }, {
    key: "_setTexture",
    value: function _setTexture(texture) {
      var gl = this._gl;
      if (!gl) return;
      var level = 0;
      var internalFormat = gl.RGBA;
      var width = 1;
      var height = 1;
      var border = 0;
      var srcFormat = gl.RGBA;
      var srcType = gl.UNSIGNED_BYTE;

      if (texture) {
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, texture);
      } else {
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, PIXEL);
      }
    }
  }, {
    key: "_setupImage",
    value: function _setupImage() {
      var _this2 = this;

      this.type = IMAGE;
      this._source = new Image();
      this._source.crossOrigin = 'anonymous';
      this._source.onload = this._imageOnload;

      this._source.onerror = function () {
        console.warn("failed loading src: ".concat(_this2.src));
      };

      this._source.src = this.src;
    }
  }, {
    key: "_imageOnload",
    value: function _imageOnload() {
      var gl = this._gl,
          img = this._source;

      if (!gl || !img || !(img instanceof HTMLImageElement || img instanceof HTMLCanvasElement || img instanceof ImageBitmap)) {
        return;
      }

      var isPowerOf2 = isPow2(img.width) && isPow2(img.height);
      var needsPowerOfTwo = this.wrapS !== CLAMP_TO_EDGE || this.wrapT !== CLAMP_TO_EDGE || this.minFilter !== NEAREST && this.minFilter !== LINEAR;

      if (needsPowerOfTwo && isPowerOf2 === false) {
        this.pow2canvas = this.pow2canvas || document.createElement('canvas');
        this.pow2canvas.width = floorPowerOfTwo(img.width);
        this.pow2canvas.height = floorPowerOfTwo(img.height);
        var ctx = this.pow2canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, this.pow2canvas.width, this.pow2canvas.height);
        console.warn("Image is not power of two ".concat(img.width, " x ").concat(img.height, ". Resized to ").concat(this.pow2canvas.width, " x ").concat(this.pow2canvas.height, ";"));
        this._source = this.pow2canvas;
        isPowerOf2 = true;
      }

      this._updateTexture();

      if (isPowerOf2 && this.minFilter !== NEAREST && this.minFilter !== LINEAR) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    }
  }, {
    key: "_setupVideo",
    value: function _setupVideo() {
      var gl = this._gl;
      if (!gl) return;
      this.type = VIDEO;
      this._source = document.createElement('video');
      this._source.autoplay = true;
      this._source.muted = true;
      this._source.loop = true;
      this._source.playsInline = true;
      this._source.crossOrigin = 'anonymous';
      this._source.src = this.src;
      var wrapper = document.createElement('div');
      wrapper.style.width = wrapper.style.height = '1px';
      wrapper.style.overflow = 'hidden';
      wrapper.style.position = 'absolute';
      wrapper.style.opacity = '0';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.zIndex = '-1000';
      wrapper.appendChild(this._source);
      document.body.appendChild(wrapper);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      this._source.play();
    }
  }, {
    key: "_setupCamera",
    value: function _setupCamera() {
      var _this3 = this;

      var gl = this._gl;
      if (!gl) return;
      this.type = CAMERA;
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      var start = function start(stream) {
        _this3._source = document.createElement('video');
        _this3._source.width = 320;
        _this3._source.height = 240;
        _this3._source.autoplay = true;
        _this3._source.srcObject = stream;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      };

      var init = function init() {
        navigator.mediaDevices.getUserMedia({
          video: true
        }).then(start).catch(function (e) {
          return console.log(e.name + ': ' + e.message);
        });
      };

      var initLegacy = function initLegacy() {
        getUserMedia({
          video: true
        }, start, function (e) {
          return e;
        });
      };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        init();
      } else if (getUserMedia) {
        initLegacy();
      }
    }
  }, {
    key: "_updateTexture",
    value: function _updateTexture() {
      var gl = this._gl,
          texture = this._glTexture,
          source = this._source;
      if (!gl || !texture || !source) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);

      this._setTexture(source);
    }
  }, {
    key: "flipY",
    get: function get() {
      return true;
    }
  }, {
    key: "magFilter",
    get: function get() {
      return MAG_OPTIONS[this.getAttribute('mag-filter')] || LINEAR;
    }
  }, {
    key: "minFilter",
    get: function get() {
      return MIN_OPTIONS[this.getAttribute('min-filter')] || LINEAR_MIPMAP_LINEAR;
    }
  }, {
    key: "name",
    get: function get() {
      return this.getAttribute('name');
    },
    set: function set(val) {
      this.setAttribute('name', val);
    }
  }, {
    key: "shouldUpdate",
    get: function get() {
      return (this.type === CAMERA || this.type === VIDEO) && this._source instanceof HTMLVideoElement && this._source.readyState === this._source.HAVE_ENOUGH_DATA;
    }
  }, {
    key: "src",
    get: function get() {
      return this.getAttribute('src');
    },
    set: function set(val) {
      this.setAttribute('src', val);
    }
  }, {
    key: "webcam",
    get: function get() {
      return this.hasAttribute('webcam');
    },
    set: function set(cam) {
      if (cam) {
        this.setAttribute('webcam', '');
      } else {
        this.removeAttribute('webcam');
      }
    }
  }, {
    key: "wrapS",
    get: function get() {
      return WRAP_OPTIONS[this.getAttribute('wrap-s')] || REPEAT;
    }
  }, {
    key: "wrapT",
    get: function get() {
      return WRAP_OPTIONS[this.getAttribute('wrap-t')] || REPEAT;
    }
  }]);

  return Texture;
}(_wrapNativeSuper(HTMLElement));

if (!customElements.get('sd-texture')) {
  customElements.define('sd-texture', Texture);
}

var SHADERTOY_IO = /\(\s*out\s+vec4\s+(\S+)\s*,\s*in\s+vec2\s+(\S+)\s*\)/;
var UNNAMED_TEXTURE_PREFIX = 'u_texture_';

var ShaderDoodle =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ShaderDoodle, _HTMLElement);

  function ShaderDoodle() {
    var _this;

    _classCallCheck(this, ShaderDoodle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShaderDoodle).call(this));
    _this.unnamedTextureIndex = 0;
    _this.shadow = _this.attachShadow({
      mode: 'open'
    });
    return _this;
  }

  _createClass(ShaderDoodle, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.mounted = true;
      setTimeout(function () {
        try {
          _this2.init();
        } catch (e) {
          console.error(e && e.message || 'Error in shader-doodle.');
        }
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.mounted = false;
      this.canvas.removeEventListener('mousedown', this.mouseDown);
      this.canvas.removeEventListener('mousemove', this.mouseMove);
      this.canvas.removeEventListener('mouseup', this.mouseUp);
      cancelAnimationFrame(this.animationFrame);
    }
  }, {
    key: "findShaders",
    value: function findShaders() {
      var shdrs = {};

      for (var c = 0; c < this.children.length; c++) {
        switch (this.children[c].getAttribute('type')) {
          case 'x-shader/x-fragment':
            shdrs.fragmentShader = this.children[c].text;
            break;

          case 'x-shader/x-vertex':
            shdrs.vertexShader = this.children[c].text;
            break;
        }
      }

      return shdrs;
    }
  }, {
    key: "findTextures",
    value: function findTextures() {
      var textures = [];

      for (var c = 0; c < this.children.length; c++) {
        if (this.children[c] instanceof Texture) {
          textures.push(this.children[c]);
        }
      }

      return textures;
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      var shaders = this.findShaders();
      this.useST = this.hasAttribute('shadertoy');
      var fs = shaders.fragmentShader;
      var vs = shaders.vertexShader ? shaders.vertexShader : Template.defaultVertexShader();
      this.uniforms = {
        resolution: {
          name: this.useST ? 'iResolution' : 'u_resolution',
          type: 'vec2',
          value: [0, 0]
        },
        time: {
          name: this.useST ? 'iTime' : 'u_time',
          type: 'float',
          value: 0
        },
        delta: {
          name: this.useST ? 'iTimeDelta' : 'u_delta',
          type: 'float',
          value: 0
        },
        date: {
          name: this.useST ? 'iDate' : 'u_date',
          type: 'vec4',
          value: [0, 0, 0, 0]
        },
        frame: {
          name: this.useST ? 'iFrame' : 'u_frame',
          type: 'int',
          value: 0
        },
        mouse: {
          name: this.useST ? 'iMouse' : 'u_mouse',
          type: this.useST ? 'vec4' : 'vec2',
          value: this.useST ? [0, 0, 0, 0] : [0, 0]
        }
      };
      this.shadow.innerHTML = Template.render();
      this.canvas = Template.map(this.shadow).canvas;
      var gl = this.gl = this.canvas.getContext('webgl');
      this.updateRect(); // format/replace special shadertoy io

      if (this.useST) {
        var io = fs.match(SHADERTOY_IO);
        fs = fs.replace('mainImage', 'main');
        fs = fs.replace(SHADERTOY_IO, '()');
        fs = (io ? "#define ".concat(io[1], " gl_FragColor\n#define ").concat(io[2], " gl_FragCoord.xy\n") : '') + fs;
      }

      var uniformString = Object.values(this.uniforms).reduce(function (acc, uniform) {
        return acc + "uniform ".concat(uniform.type, " ").concat(uniform.name, ";\n");
      }, '');
      fs = uniformString + fs;
      fs = 'precision highp float;\n' + fs;
      gl.clearColor(0, 0, 0, 0);
      this.vertexShader = this.makeShader(gl.VERTEX_SHADER, vs);
      this.fragmentShader = this.makeShader(gl.FRAGMENT_SHADER, fs);
      this.program = this.makeProgram(this.vertexShader, this.fragmentShader); // prettier-ignore

      this.vertices = new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]);
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
      gl.useProgram(this.program);
      this.program.position = gl.getAttribLocation(this.program, 'position');
      this.textures = this.findTextures();
      this.textures.forEach(function (t, i) {
        // set texture name to 'u_texture_XX' if no name set
        if (!t.name) {
          t.name = "".concat(UNNAMED_TEXTURE_PREFIX).concat(_this3.unnamedTextureIndex++);
        }

        t.init(gl, _this3.program, i);
      });
      gl.enableVertexAttribArray(this.program.position);
      gl.vertexAttribPointer(this.program.position, 2, gl.FLOAT, false, 0, 0); // get all uniform locations from shaders

      Object.values(this.uniforms).forEach(function (uniform) {
        uniform.location = gl.getUniformLocation(_this3.program, uniform.name);
      });

      this._bind('mouseDown', 'mouseMove', 'mouseUp', 'render');

      this.canvas.addEventListener('mousedown', this.mouseDown);
      this.canvas.addEventListener('mousemove', this.mouseMove);
      this.canvas.addEventListener('mouseup', this.mouseUp);
      this.render();
    }
  }, {
    key: "render",
    value: function render(timestamp) {
      if (!this || !this.mounted || !this.gl) return;
      var gl = this.gl;
      this.textures.forEach(function (t) {
        t.update();
      });
      this.updateTimeUniforms(timestamp);
      this.updateRect();
      gl.clear(gl.COLOR_BUFFER_BIT);
      Object.values(this.uniforms).forEach(function (_ref) {
        var type = _ref.type,
            location = _ref.location,
            value = _ref.value;
        var method = type.match(/vec/) ? "".concat(type[type.length - 1], "fv") : "1".concat(type[0]);
        gl["uniform".concat(method)](location, value);
      });
      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 2);
      this.ticking = false;
      this.animationFrame = requestAnimationFrame(this.render);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      if (this.useST) {
        this.mousedown = true;
        var _this$rect = this.rect,
            top = _this$rect.top,
            left = _this$rect.left,
            height = _this$rect.height;
        this.uniforms.mouse.value[2] = e.clientX - Math.floor(left);
        this.uniforms.mouse.value[3] = Math.floor(height) - (e.clientY - Math.floor(top));
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      if (!this.ticking && (!this.useST || this.mousedown)) {
        var _this$rect2 = this.rect,
            top = _this$rect2.top,
            left = _this$rect2.left,
            height = _this$rect2.height;
        this.uniforms.mouse.value[0] = e.clientX - Math.floor(left);
        this.uniforms.mouse.value[1] = Math.floor(height) - (e.clientY - Math.floor(top));
        this.ticking = true;
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      if (this.useST) {
        this.mousedown = false;
        this.uniforms.mouse.value[2] = 0;
        this.uniforms.mouse.value[3] = 0;
      }
    }
  }, {
    key: "updateTimeUniforms",
    value: function updateTimeUniforms(timestamp) {
      var delta = this.lastTime ? (timestamp - this.lastTime) / 1000 : 0;
      this.lastTime = timestamp;
      this.uniforms.time.value += delta;
      this.uniforms.delta.value = delta;
      this.uniforms.frame.value++;
      var d = new Date();
      this.uniforms.date.value[0] = d.getFullYear();
      this.uniforms.date.value[1] = d.getMonth() + 1;
      this.uniforms.date.value[2] = d.getDate();
      this.uniforms.date.value[3] = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001;
    }
  }, {
    key: "updateRect",
    value: function updateRect() {
      this.rect = this.canvas.getBoundingClientRect();
      var _this$rect3 = this.rect,
          width = _this$rect3.width,
          height = _this$rect3.height;
      var widthChanged = this.canvas.width !== width;
      var heightChanged = this.canvas.height !== height;

      if (widthChanged) {
        this.canvas.width = this.uniforms.resolution.value[0] = width;
      }

      if (heightChanged) {
        this.canvas.height = this.uniforms.resolution.value[1] = height;
      }

      if (widthChanged || heightChanged) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }, {
    key: "makeShader",
    value: function makeShader(type, string) {
      var gl = this.gl;
      var shader = gl.createShader(type);
      gl.shaderSource(shader, string);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.warn(compilationLog, '\nin shader:\n', string);
      }

      return shader;
    }
  }, {
    key: "makeProgram",
    value: function makeProgram() {
      var gl = this.gl;
      var program = gl.createProgram();

      for (var _len = arguments.length, shaders = new Array(_len), _key = 0; _key < _len; _key++) {
        shaders[_key] = arguments[_key];
      }

      shaders.forEach(function (shader) {
        gl.attachShader(program, shader);
      });
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var linkLog = gl.getProgramInfoLog(this.program);
        console.warn(linkLog);
      }

      return program;
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this4 = this;

      for (var _len2 = arguments.length, methods = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        methods[_key2] = arguments[_key2];
      }

      methods.forEach(function (method) {
        return _this4[method] = _this4[method].bind(_this4);
      });
    }
  }]);

  return ShaderDoodle;
}(_wrapNativeSuper(HTMLElement));

if (!customElements.get('shader-doodle')) {
  customElements.define('shader-doodle', ShaderDoodle);
}
