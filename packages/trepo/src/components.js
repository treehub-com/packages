import css from './style.css';
import formToggle from './trepo--form-toggle.js';
import input from './trepo--input.js';
import date from './trepo--date.js';
import place from './trepo--place.js';
import formControls from './trepo--form-controls.js';
import personData from './trepo-person-data.js';
import name from './trepo-name.js';
import death from './trepo-death.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('trepo--form-toggle', formToggle);
window.customElements.define('trepo--input', input);
window.customElements.define('trepo--date', date);
window.customElements.define('trepo--place', place);
window.customElements.define('trepo--form-controls', formControls);
window.customElements.define('trepo-person-data', personData);
window.customElements.define('trepo-name', name);
window.customElements.define('trepo-death', death);
