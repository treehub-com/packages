import css from './style.css';
import formToggle from './trepo--form-toggle.js';
import personData from './trepo-person-data.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('trepo--form-toggle', formToggle);
window.customElements.define('trepo-person-data', personData);
