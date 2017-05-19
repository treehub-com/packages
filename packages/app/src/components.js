import css from './style.css';
import app from './app-app.js';
import nav from './app-nav.js';
import logo from './app-logo.js';
import space from './app-space.js';
import taskbar from './app-taskbar.js';
import page from './app-page.js';
import aside from './app-aside.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('app-app', app);
window.customElements.define('app-nav', nav);
window.customElements.define('app-logo', logo);
window.customElements.define('app-space', space);
window.customElements.define('app-taskbar', taskbar);
window.customElements.define('app-page', page);
window.customElements.define('app-aside', aside);
