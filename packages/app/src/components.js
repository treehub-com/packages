import css from './style.css';
import app from './app-app.js';
import nav from './app-nav.js';
import navLogo from './app-nav-logo.js';
import taskbar from './app-taskbar.js';
import page from './app-page.js';
import aside from './app-aside.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('app-app', app);
window.customElements.define('app-nav', nav);
window.customElements.define('app-nav-logo', navLogo);
window.customElements.define('app-taskbar', taskbar);
window.customElements.define('app-page', page);
window.customElements.define('app-aside', aside);
