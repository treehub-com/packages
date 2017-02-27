require('th-aside');
require('th-nav');
require('th-page');
require('th-taskbar');
const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'th-app',
      $: {
        aside: 'th-aside',
        page: 'th-page',
      },
    });

    window.onpopstate = window.onhashchange = () => {
      this.$.page.setAttribute('path', window.location.pathname);
      this.$.aside.setAttribute('path', window.location.pathname);
      this.$.aside.setAttribute('hash', window.location.hash);
    };

    this.addEventListener('click', (e) => {
      // Adapted from https://github.com/visionmedia/page.js/blob/master/page.js

      // If alt keys pressed
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (e.defaultPrevented) return;

      // Ensure link
      // Use shadow dom when available
      let el = e.path ? e.path[0] : e.target;
      while (el && 'A' !== el.nodeName) el = el.parentNode;
      if (!el || 'A' !== el.nodeName) return;

      // We will handle the link at this point
      e.preventDefault();

      // Ignore if tag has
      // 1. "download" attribute
      // 2. rel="external" attribute
      if (el.hasAttribute('download')
      || el.getAttribute('rel') === 'external') return;

      // Get link
      const link = el.getAttribute('href');

      // Ignore mailto: in the href
      if (link && link.indexOf('mailto:') > -1) return;

      // Ignore target
      if (el.target) return;

      // Ignore x-origin
      let origin = window.location.protocol + '//' + window.location.hostname;
      if (window.location.port) origin += ':' + window.location.port;
      if (link.indexOf(origin) === 0) return;

      // We have a valid link at this point

      const currentPath = window.location.pathname;
      const newPath = el.pathname;
      const currentHash = window.location.hash;
      const newHash = el.hash;

      if (currentPath === newPath && currentHash === newHash) return;

      history.pushState({}, '', newPath + ((newHash) ? `${newHash}` : ''));
      this.$.page.setAttribute('path', newPath);
      this.$.aside.setAttribute('path', newPath);
      this.$.aside.setAttribute('hash', newHash);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.page.setAttribute('path', window.location.pathname);
    this.$.aside.setAttribute('path', window.location.pathname);
    this.$.aside.setAttribute('hash', window.location.hash);
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-app', Component);
