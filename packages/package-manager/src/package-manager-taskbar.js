class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.page = '/package-manager/';
    });
  }

  connectedCallback() {
    this.innerHTML = 'PACKAGES';
    this.updatePackages();
  }

  async updatePackages() {
    const res = await fetch('https://packages.treehub.com/packages.json');
    if (!res.ok) {
      return;
    }
    const json = await res.json();

    const promises = [];
    for (const key of Object.keys(window.packages)) {
      // Onlu update non-linked packages
      if (window.packages[key].version) {
        if (json[key].latest > window.packages[key].version) {
          promises.push(this.updatePackage({name: key}));
        }
      }
    }

    // If there are no updates, return
    if (promises.length === 0) {
      return;
    }

    await Promise.all(promises);

    this.setAttribute('updated', true);
  }

  async updatePackage({name}) {
    console.log(`updating ${name}`);
    const res = await fetch('/_/package/install', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name}),
    });
    if (res.ok) {
      console.log(`updated ${name}`);
    } else {
      console.error(`could not update ${name}`);
    }
  }
}

export default Component;
