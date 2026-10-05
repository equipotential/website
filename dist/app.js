(() => {
  'use strict';
  const canvas = document.querySelector('#field');
  const ctx = canvas.getContext('2d');
  const caption = document.querySelector('#field-caption');
  const charge = document.querySelector('.charge-b');
  let mode = 'opposite';
  let frame;

  // Marching squares plots V = q1/r1 + q2/r2 in normalized, illustrative units.
  // The singular point charges are excluded; these are potential contours, not field lines.
  function draw() {
    if (!ctx) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#435044';
    for (let x = 18; x < width; x += 26) {
      for (let y = 18; y < height; y += 26) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const step = 5;
    const cols = Math.ceil(width / step) + 1;
    const rows = Math.ceil(height / step) + 1;
    const values = new Float64Array(cols * rows);
    const scale = Math.min(width, height);
    const sign = mode === 'opposite' ? -1 : 1;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r1 = Math.max(Math.hypot(x * step - width * .36, y * step - height * .5), 8);
        const r2 = Math.max(Math.hypot(x * step - width * .64, y * step - height * .5), 8);
        values[y * cols + x] = scale / r1 + sign * scale / r2;
      }
    }
    const levels = mode === 'opposite'
      ? [-12,-8,-5.5,-3.8,-2.6,-1.7,-1,-.5,0,.5,1,1.7,2.6,3.8,5.5,8,12]
      : [1.3,1.6,2,2.5,3,3.6,4.2,5,6,7.5,9.5,12,16];
    for (const level of levels) {
      ctx.beginPath();
      ctx.strokeStyle = level < 0 ? '#b18861' : level === 0 ? '#8b9a88' : '#869cd7';
      ctx.globalAlpha = .62;
      ctx.lineWidth = .85;
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const corners = [values[y*cols+x], values[y*cols+x+1], values[(y+1)*cols+x+1], values[(y+1)*cols+x]];
          const points = [[x*step,y*step],[(x+1)*step,y*step],[(x+1)*step,(y+1)*step],[x*step,(y+1)*step]];
          const crossings = [];
          for (let edge = 0; edge < 4; edge++) {
            const next = (edge + 1) % 4;
            if ((corners[edge] < level) !== (corners[next] < level)) {
              const t = (level - corners[edge]) / (corners[next] - corners[edge]);
              crossings.push([points[edge][0]+t*(points[next][0]-points[edge][0]),points[edge][1]+t*(points[next][1]-points[edge][1])]);
            }
          }
          if (crossings.length === 2) {
            ctx.moveTo(...crossings[0]); ctx.lineTo(...crossings[1]);
          } else if (crossings.length === 4) {
            // Resolve saddle cells using their bilinear center value.
            const center = corners.reduce((sum, value) => sum + value, 0) / 4;
            const offset = (center < level) === (corners[0] < level) ? 0 : 1;
            ctx.moveTo(...crossings[offset]); ctx.lineTo(...crossings[(offset+1)%4]);
            ctx.moveTo(...crossings[(offset+2)%4]); ctx.lineTo(...crossings[(offset+3)%4]);
          }
        }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Leave quiet corners for the labels without altering the underlying calculation.
    const fade = ctx.createLinearGradient(0, 0, 0, height);
    fade.addColorStop(0, '#17201bf5'); fade.addColorStop(.28, '#17201b10');
    fade.addColorStop(.7, '#17201b00'); fade.addColorStop(1, '#17201bea');
    ctx.fillStyle = fade; ctx.fillRect(0, 0, width, height);
  }
  function scheduleDraw() { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
  document.querySelectorAll('input[name="relationship"]').forEach(input => {
    input.addEventListener('change', () => {
      mode = input.value;
      const same = mode === 'same';
      charge.textContent = same ? '+' : '−';
      charge.classList.toggle('positive', same);
      caption.textContent = same ? 'Like charges. A different connection.' : 'Opposite charges. One shared field.';
      canvas.setAttribute('aria-label', same
        ? 'Equipotential contours for two equal positive charges. Blue curves connect points of equal electric potential.'
        : 'Equipotential contours for two opposite charges. Blue and orange curves connect points of equal electric potential.');
      scheduleDraw();
    });
  });
  if ('ResizeObserver' in window) new ResizeObserver(scheduleDraw).observe(canvas);
  else window.addEventListener('resize', scheduleDraw);
  document.querySelector('#year').textContent = new Date().getFullYear();
  const screenshots = {
    geometry: { src: './assets/tasc-geometry.png', alt: 'TASC Object Builder showing a prepared surface mesh with material regions and a three-dimensional geometry viewport.', caption: '01 / Prepare and inspect the computational mesh before running a charging analysis.' },
    fields: { src: './assets/tasc-fields.png', alt: 'TASC Field Output showing the active MFEM solver, sampling grid, slices and display controls, and CSV export.', caption: '02 / Configure field sampling, select a display, and export calculated field samples.' }
  };
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      const view = screenshots[button.dataset.view];
      document.querySelectorAll('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelector('#product-image').src = view.src;
      document.querySelector('#product-image').alt = view.alt;
      document.querySelector('#screenshot-link').href = view.src;
      document.querySelector('#product-caption').textContent = view.caption;
    });
  });
  scheduleDraw();
})();
