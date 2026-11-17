(function () {
  "use strict";

  var VERTEX_SHADER = `
    attribute vec3 position;
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
  `;

  var FRAGMENT_SHADER = `
    #define TWO_PI 6.2831853072
    #define PI 3.14159265359

    precision highp float;
    uniform vec2 resolution;
    uniform float time;

    float random (in float x) {
        return fract(sin(x)*1e4);
    }
    float random (vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }

    void main(void) {
      vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

      vec2 fMosaicScal = vec2(4.0, 2.0);
      vec2 vScreenSize = vec2(256,256);
      uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
      uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

      float t = time*0.06+random(uv.x)*0.4;
      float lineWidth = 0.0008;

      vec3 color = vec3(0.0);
      for(int j = 0; j < 3; j++){
        for(int i=0; i < 5; i++){
          color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
        }
      }

      gl_FragColor = vec4(color[2],color[1],color[0],1.0);
    }
  `;

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed");
    }
    return shader;
  }

  function init() {
    var container = document.getElementById("shaderHolder");
    if (!container) return;

    var canvas = document.createElement("canvas");
    container.appendChild(canvas);

    var gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }) || canvas.getContext("experimental-webgl");
    if (!gl) {
      container.style.background =
        "radial-gradient(ellipse at center, #101012 0%, #000 70%)";
      return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "program link failed");
    }
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
      gl.STATIC_DRAW
    );
    var positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    var uResolution = gl.getUniformLocation(program, "resolution");
    var uTime = gl.getUniformLocation(program, "time");

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var time = 1.0;
    var running = false;
    var onScreen = true;

    function resize() {
      var rect = container.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(rect.width * dpr));
      var h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    }

    function render() {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    var frame = function () {
      time += 0.05;
      render();
      if (running) requestAnimationFrame(frame);
    };

    function play() {
      if (running || reduced || !onScreen || document.hidden) return;
      running = true;
      requestAnimationFrame(frame);
    }

    function pause() {
      running = false;
    }

    resize();
    render();
    if (!reduced) play();

    window.addEventListener("resize", function () {
      resize();
      render();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0] ? entries[0].isIntersecting : true;
        if (onScreen) play();
        else pause();
      }).observe(container);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause();
      else play();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
