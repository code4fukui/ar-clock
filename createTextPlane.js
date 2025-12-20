import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";

export const createTextPlane = (s, w, h, dpi = 200) => {
  const canvas = document.createElement("canvas");
  canvas.width = dpi * (w / 0.0254);
  canvas.height = canvas.width / w * h;

  const ctx = canvas.getContext("2d");

  // three.js 用テクスチャ
  const texture = new THREE.CanvasTexture(canvas);

  /* ===== Plane に貼る ===== */
  const geometry = new THREE.PlaneGeometry(w, h);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,   // ← 奥行き無視
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.setText = (s) => {
    // 背景
    //ctx.fillStyle = "#f22";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // テキスト
    ctx.fillStyle = "#0a0";
    ctx.font = "bold 100px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s, canvas.width / 2, canvas.height / 2);

    texture.needsUpdate = true;
  };
  plane.setText(s);
  return plane;
};
