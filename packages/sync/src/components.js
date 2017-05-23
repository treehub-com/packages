import css from './components/style.css';
import taskbar from './components/sync-taskbar.js';
import page from './components/sync-page.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('sync-taskbar', taskbar);
window.customElements.define('sync-page', page);
