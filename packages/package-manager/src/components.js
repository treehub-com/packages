import css from './style.css';
import taskbar from './package-manager-taskbar.js';
import page from './package-manager-page.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('package-manager-taskbar', taskbar);
window.customElements.define('package-manager-page', page);
