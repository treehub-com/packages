import css from './style.css';
import nav from './tree-nav.js';
import page from './tree-page.js';
import trees from './tree-trees.js';
import person from './tree-person.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
window.customElements.define('tree-nav', nav);
window.customElements.define('tree-page', page);
window.customElements.define('tree-trees', trees);
window.customElements.define('tree-person', person);
