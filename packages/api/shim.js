if (typeof window === 'undefined') {
  const shimmedCrypto = require('crypto');
  var crypto = {
    randomBytes: (size) => shimmedCrypto.randomBytes(size),
  };
} else {
  var crypto = {
    randomBytes: (size) => window.crypto.getRandomValues(new Uint8Array(size)),
  };
  var process = {};
}
