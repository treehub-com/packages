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
      this._navigate(window.location.pathname,
        this._stripHash(window.location.hash));
    };

    Object.defineProperties(window, {
        'aside': {
          get: () => {
            const hash = window.location.hash;
            if (hash.length > 0 && hash[0] === '#') {
              return hash.slice(1);
            }
            return hash;
          },
          set: (aside) => {
            this._navigate(window.location.pathname, aside);
          },
        },
        'page': {
          get: () => {
            return window.location.pathname;
          },
          set: (location) => {
            const url = new URL(location, window.location);
            this._navigate(url.pathname, this._stripHash(url.hash));
          },
        },
    });

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

      this._navigate(el.pathname, this._stripHash(el.hash));
    });
  }

  connectedCallback() {
    super.connectedCallback();
    // We don't call _navigate to avoid the new/old comparison
    this.$.page.setAttribute('page', window.location.pathname);
    this.$.aside.setAttribute('page', window.location.pathname);
    this.$.aside.setAttribute('aside', this._stripHash(window.location.hash));
  }

  _navigate(page, aside) {
    const currentPage = window.location.pathname;
    const currentAside = window.location.hash;

    if (currentPage === page && currentAside === aside) return;

    history.pushState({}, '', page + ((aside) ? `#${aside}` : ''));
    this.$.page.setAttribute('page', page);
    this.$.aside.setAttribute('page', page);
    this.$.aside.setAttribute('aside', aside);
  }

  _stripHash(str) {
    if (str.length > 0 && str[0] === '#') {
      return str.slice(1);
    }
    return str;
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-app', Component);
