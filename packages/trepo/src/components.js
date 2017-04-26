import css from './style.css';
import formToggle from './trepo--form-toggle.js';
import input from './trepo--input.js';
import formControls from './trepo--form-controls.js';
import personData from './trepo-person-data.js';
import name from './trepo-name.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('trepo--form-toggle', formToggle);
window.customElements.define('trepo--input', input);
window.customElements.define('trepo--form-controls', formControls);
window.customElements.define('trepo-person-data', personData);
window.customElements.define('trepo-name', name);
