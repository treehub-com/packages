import css from './style.css';
import nav from './test-nav.js';
import taskbar from './test-taskbar.js';
import page from './test-page.js';
import aside from './test-aside.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('test-nav', nav);
window.customElements.define('test-taskbar', taskbar);
window.customElements.define('test-page', page);
window.customElements.define('test-aside', aside);
