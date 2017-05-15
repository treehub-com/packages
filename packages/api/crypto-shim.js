const crypto = (function() {
  if (typeof window !== 'undefined' && window.crypto) {
    return {randomBytes: (size) => {
      return window.crypto.getRandomValues(new Uint8Array(size));
    }};
  } else {
    const shimmedCrypto = require('crypto');
    return {randomBytes: (size) => {
      return shimmedCrypto.randomBytes(size);
    }};
  }
})();
